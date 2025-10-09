import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { glAccounts, glJournals, taxConfig } from "@/data/extendedMockData";
import { formatBDT } from "@/lib/bdtUtils";
import { formatBDDate } from "@/lib/dateUtils";
import { DollarSign, FileText, Lock, Download, TrendingUp, AlertCircle } from "lucide-react";

export default function Finance() {
  const revenueAccount = glAccounts.find(a => a.code === "4000");
  const arAccount = glAccounts.find(a => a.code === "1100");
  const vatAccount = glAccounts.find(a => a.code === "6200");
  const whtAccount = glAccounts.find(a => a.code === "6300");

  // Mock GL balances
  const glBalances = {
    "1000": 5420000,
    "1100": 850000,
    "2000": 320000,
    "3000": 12500000,
    "4000": 4950000,
    "5000": 1850000,
    "6100": 980000,
    "6200": 742500,
    "6300": 247500,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Finance & Accounting</h1>
        <p className="text-muted-foreground">General Ledger, Tax Center, and Compliance Reporting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Revenue (MTD)</span>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(glBalances["4000"])}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">AR Balance</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(glBalances["1100"])}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">VAT Payable</span>
            <AlertCircle className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(glBalances["6200"])}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/10 to-transparent border-info/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">WHT Payable</span>
            <FileText className="w-5 h-5 text-info" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(glBalances["6300"])}</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">General Ledger</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Trial Balance
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Code</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Account Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
              </tr>
            </thead>
            <tbody>
              {glAccounts.map((account) => {
                const balance = glBalances[account.code as keyof typeof glBalances] || 0;
                
                return (
                  <tr key={account.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-mono font-medium">{account.code}</td>
                    <td className="py-3 px-4 text-sm">{account.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="secondary" className="capitalize">{account.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-semibold">{formatBDT(balance)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Journal Entries</h3>
          <div className="space-y-3">
            {glJournals.map((journal) => (
              <div
                key={journal.id}
                className="p-4 rounded-lg border-2 border-border hover:bg-muted/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium mb-1">{journal.memo}</p>
                    <p className="text-sm text-muted-foreground">By: {journal.postedBy}</p>
                  </div>
                  {journal.locked && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatBDDate(journal.postedAt, true)}</span>
                  <Badge variant={journal.locked ? "secondary" : "default"}>
                    {journal.locked ? "Locked" : "Open"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <FileText className="w-4 h-4 mr-2" />
            New Journal Entry
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tax Center (NBR)</h3>
            <Badge variant="default" className="bg-success/10 text-success border-success/20">
              Compliant
            </Badge>
          </div>
          
          <div className="space-y-4">
            {taxConfig.map((tax) => (
              <div key={tax.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{tax.name}</span>
                  <Badge variant="secondary">{tax.type}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Rate:</span>
                    <p className="font-semibold">{tax.ratePct}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Effective:</span>
                    <p className="font-medium">{formatBDDate(tax.effectiveFrom)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export VAT-6.3 Report
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            <span>P&L Statement</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            <span>Balance Sheet</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            <span>Cash Flow</span>
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-warning/5 to-transparent border-warning/20">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-warning" />
          <h3 className="text-lg font-semibold">Period Close</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Close the current accounting period to lock all transactions and prepare financial statements.
        </p>
        <div className="flex gap-3">
          <Button variant="default">Close Period</Button>
          <Button variant="outline">Preview Impact</Button>
        </div>
      </Card>
    </div>
  );
}
