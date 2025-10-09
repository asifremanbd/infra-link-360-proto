import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { customers } from "@/data/mockData";
import { Users, Building2, TrendingUp, MapPin, Download } from "lucide-react";

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Customer Database</h1>
          <p className="text-muted-foreground">Hierarchical customer management and subscription tracking</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Customers</span>
          </div>
          <p className="text-2xl font-bold">{customers.length}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-success">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-muted-foreground">Enterprise Tier</span>
          </div>
          <p className="text-2xl font-bold">{customers.filter(c => c.tier === "Enterprise").length}</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-chart-2">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-chart-2" />
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold">
            ${(customers.reduce((sum, c) => sum + c.revenue, 0) / 1000).toFixed(0)}K
          </p>
        </Card>
        <Card className="p-6 border-l-4 border-l-warning">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Regions</span>
          </div>
          <p className="text-2xl font-bold">3</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Customer Directory</h3>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-input rounded-lg text-sm bg-background">
              <option>All Tiers</option>
              <option>Enterprise</option>
              <option>Premium</option>
              <option>Standard</option>
            </select>
            <select className="px-3 py-2 border border-input rounded-lg text-sm bg-background">
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia Pacific</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tier</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Region</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Monthly Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm">{customer.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={
                      customer.tier === "Enterprise" ? "default" :
                      customer.tier === "Premium" ? "secondary" :
                      "outline"
                    }>
                      {customer.tier}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{customer.region}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold">${(customer.revenue / 1000).toFixed(1)}K</span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={customer.status === "Active" ? "success" : "warning"}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Customer Lifecycle</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">New Signups (30d)</span>
              <span className="font-bold text-success">+12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Active Subscriptions</span>
              <span className="font-bold">{customers.filter(c => c.status === "Active").length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Pending Approvals</span>
              <span className="font-bold text-warning">{customers.filter(c => c.status === "Pending").length}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Top Customers by Revenue</h3>
          <div className="space-y-3">
            {customers.sort((a, b) => b.revenue - a.revenue).slice(0, 3).map((customer, index) => (
              <div key={customer.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? "bg-warning text-warning-foreground" :
                  index === 1 ? "bg-muted" :
                  "bg-muted"
                }`}>
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">${(customer.revenue / 1000).toFixed(1)}K/mo</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">KYC Compliance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
              <span className="text-sm">Verified</span>
              <span className="font-bold text-success">95%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <span className="text-sm">Pending Review</span>
              <span className="font-bold text-warning">3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Documents Expiring</span>
              <span className="font-bold">2</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
