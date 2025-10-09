import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invoices } from "@/data/mockData";
import { DollarSign, FileText, Clock, CheckCircle, AlertCircle, Download } from "lucide-react";

export default function Billing() {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === "Paid");
  const overdueInvoices = invoices.filter(inv => inv.status === "Overdue");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Invoicing</h1>
          <p className="text-muted-foreground">Automated billing cycles and payment tracking</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-l-success">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</p>
          <p className="text-xs text-muted-foreground mt-1">Current period</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Paid Invoices</span>
          </div>
          <p className="text-2xl font-bold">{paidInvoices.length}</p>
          <p className="text-xs text-success mt-1">${(paidInvoices.reduce((s, i) => s + i.amount, 0) / 1000).toFixed(1)}K collected</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-warning">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Pending</span>
          </div>
          <p className="text-2xl font-bold">{invoices.filter(i => i.status === "Pending").length}</p>
          <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-critical">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-critical" />
            <span className="text-sm font-medium text-muted-foreground">Overdue</span>
          </div>
          <p className="text-2xl font-bold">{overdueInvoices.length}</p>
          <p className="text-xs text-critical mt-1">${(overdueInvoices.reduce((s, i) => s + i.amount, 0) / 1000).toFixed(1)}K outstanding</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Invoice Management</h3>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-input rounded-lg text-sm bg-background">
              <option>All Statuses</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
            <Button variant="outline" size="sm">Generate New Invoice</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Period</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono text-sm">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">{invoice.customer}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{invoice.period}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold">${invoice.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-sm">{invoice.dueDate}</td>
                  <td className="py-4 px-4">
                    <Badge variant={
                      invoice.status === "Paid" ? "success" :
                      invoice.status === "Overdue" ? "critical" :
                      "warning"
                    }>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      {invoice.status !== "Paid" && (
                        <Button variant="ghost" size="sm">Send Reminder</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Automated Billing Cycles</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
              <div>
                <p className="text-sm font-medium">Next Billing Run</p>
                <p className="text-xs text-muted-foreground">Jan 25, 2024</p>
              </div>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium">Auto-generated</p>
                <p className="text-xs text-muted-foreground">127 invoices/month</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium">Tax Compliance</p>
                <p className="text-xs text-success">Active & verified</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Bank Transfer</span>
              <span className="font-bold">67%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Credit Card</span>
              <span className="font-bold">28%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Other</span>
              <span className="font-bold">5%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Payment Reminders</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div>
                <p className="text-sm font-medium">Scheduled Today</p>
                <p className="text-xs text-muted-foreground">3 reminders</p>
              </div>
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Sent This Week</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Response Rate</span>
              <span className="font-bold text-success">85%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
