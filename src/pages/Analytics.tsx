import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { revenueByRegion, kpiMetrics, bandwidthForecast } from "@/data/mockData";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Download, FileText, BarChart3 } from "lucide-react";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reporting</h1>
          <p className="text-muted-foreground">Executive insights and data-driven intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            PDF Report
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent">
          <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-foreground">${(kpiMetrics.totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-success mt-2">↑ 12.5% vs last month</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent">
          <p className="text-sm text-muted-foreground mb-2">SLA Compliance</p>
          <p className="text-3xl font-bold text-foreground">{kpiMetrics.slaCompliance}%</p>
          <p className="text-sm text-success mt-2">↑ 0.3% improvement</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent">
          <p className="text-sm text-muted-foreground mb-2">Avg Utilization</p>
          <p className="text-3xl font-bold text-foreground">{kpiMetrics.avgBandwidthUtil}%</p>
          <p className="text-sm text-warning mt-2">Monitor closely</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-chart-2/10 to-transparent">
          <p className="text-sm text-muted-foreground mb-2">Network Uptime</p>
          <p className="text-3xl font-bold text-foreground">{kpiMetrics.networkUptime}%</p>
          <p className="text-sm text-success mt-2">Exceeding target</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Revenue by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Legend />
              <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue ($)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="customers" fill="hsl(var(--chart-2))" name="Customers" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Market Share by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueByRegion}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ region, percent }) => `${region.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="hsl(var(--chart-1))"
                dataKey="revenue"
              >
                {revenueByRegion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">6-Month Bandwidth Forecast</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1"></div>
              <span className="text-sm text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-2"></div>
              <span className="text-sm text-muted-foreground">Forecast</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bandwidthForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-1))", r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--chart-2))", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Growth Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Revenue Growth</p>
              <p className="text-xs text-muted-foreground">+12.5% MoM increase</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Customer Acquisition</p>
              <p className="text-xs text-muted-foreground">+8.2% new signups</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Bandwidth Demand</p>
              <p className="text-xs text-muted-foreground">Increasing 5.3%/month</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-warning" />
            </div>
            <h3 className="font-semibold">Key Recommendations</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm font-medium mb-1">Capacity Planning</p>
              <p className="text-xs text-muted-foreground">Review cable expansion by Q2</p>
            </div>
            <div className="p-3 bg-info/10 border border-info/20 rounded-lg">
              <p className="text-sm font-medium mb-1">Revenue Optimization</p>
              <p className="text-xs text-muted-foreground">Focus on enterprise tier growth</p>
            </div>
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm font-medium mb-1">SLA Performance</p>
              <p className="text-xs text-muted-foreground">Maintain current excellence</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-chart-2" />
            </div>
            <h3 className="font-semibold">Report Templates</h3>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              Executive Summary
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Financial Report
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Network Performance
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Customer Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
