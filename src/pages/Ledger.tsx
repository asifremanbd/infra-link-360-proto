import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ledgerEntries, suspenseEntries, extendedCustomers } from "@/data/extendedMockData";
import { formatBDT } from "@/lib/bdtUtils";
import { formatBDDate } from "@/lib/dateUtils";
import { Download, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function Ledger() {
  const totalAR = ledgerEntries.filter(e => e.type === "AR" && !e.reconciled)
    .reduce((sum, e) => sum + e.debitBdt - e.creditBdt, 0);
  
  const totalSuspense = suspenseEntries.filter(e => !e.resolved)
    .reduce((sum, e) => sum + e.amountBdt, 0);
  
  const unreconciledCount = ledgerEntries.filter(e => !e.reconciled).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Customer Ledger Management</h1>
        <p className="text-muted-foreground">AR/AP tracking, reconciliation, and suspense account management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total AR Balance</span>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(totalAR)}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Suspense Account</span>
            <AlertCircle className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(totalSuspense)}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/10 to-transparent border-info/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Unreconciled Items</span>
            <AlertCircle className="w-5 h-5 text-info" />
          </div>
          <p className="text-3xl font-bold text-foreground">{unreconciledCount}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">DSO (Days)</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">32</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Ledger Entries</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reference</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Debit</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Credit</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry) => {
                const customer = extendedCustomers.find(c => c.id === entry.customerId);
                return (
                  <tr key={entry.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">{formatBDDate(entry.postedAt, true)}</td>
                    <td className="py-3 px-4 text-sm font-medium">{customer?.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant={entry.type === "AR" ? "default" : "secondary"}>{entry.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm font-mono">{entry.ref}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium">
                      {entry.debitBdt > 0 ? formatBDT(entry.debitBdt) : "-"}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-medium">
                      {entry.creditBdt > 0 ? formatBDT(entry.creditBdt) : "-"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {entry.reconciled ? (
                        <Badge variant="default" className="bg-success/10 text-success border-success/20">
                          Reconciled
                        </Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Suspense Account</h3>
        <div className="space-y-3">
          {suspenseEntries.map((entry) => (
            <div
              key={entry.id}
              className={`p-4 rounded-lg border-2 ${
                entry.resolved 
                  ? "border-success/30 bg-success/5" 
                  : "border-warning/30 bg-warning/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-lg">{formatBDT(entry.amountBdt)}</p>
                    <Badge variant={entry.resolved ? "default" : "warning"}>
                      {entry.resolved ? "Resolved" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{entry.source}</p>
                  <p className="text-xs text-muted-foreground">Noted: {formatBDDate(entry.notedAt, true)}</p>
                  {entry.resolutionNote && (
                    <p className="text-sm mt-2 text-success">✓ {entry.resolutionNote}</p>
                  )}
                </div>
                {!entry.resolved && (
                  <Button variant="outline" size="sm">Resolve</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
