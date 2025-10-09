import StatCard from "@/components/dashboard/StatCard";
import AlertsList from "@/components/dashboard/AlertsList";
import { kpiMetrics, bandwidthData } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { Activity, Users, DollarSign, TrendingUp, Network, AlertCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Executive Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of InfraLink 360 operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${(kpiMetrics.totalRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Active Customers"
          value={kpiMetrics.activeCustomers}
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Avg Bandwidth Utilization"
          value={`${kpiMetrics.avgBandwidthUtil}%`}
          icon={Activity}
          trend={{ value: 5.3, isPositive: false }}
          variant="warning"
        />
        <StatCard
          title="Network Uptime"
          value={`${kpiMetrics.networkUptime}%`}
          icon={Network}
          trend={{ value: 0.02, isPositive: true }}
          variant="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Real-Time Bandwidth Utilization</h3>
              <p className="text-sm text-muted-foreground">Last 24 hours across all submarine cables</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1"></div>
              <span className="text-sm text-muted-foreground">Utilization</span>
              <div className="w-3 h-3 rounded-full bg-critical ml-4"></div>
              <span className="text-sm text-muted-foreground">Threshold (80%)</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bandwidthData}>
              <defs>
                <linearGradient id="utilizationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="utilization" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
                fill="url(#utilizationGradient)" 
              />
              <Line 
                type="monotone" 
                dataKey="threshold" 
                stroke="hsl(var(--critical))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">SLA Compliance</span>
                <span className="text-lg font-bold text-success">{kpiMetrics.slaCompliance}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Open Tickets</span>
                <span className="text-lg font-bold text-foreground">{kpiMetrics.openTickets}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending Invoices</span>
                <span className="text-lg font-bold text-warning">{kpiMetrics.pendingInvoices}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Critical Alerts</span>
                <span className="text-lg font-bold text-critical">{kpiMetrics.criticalAlerts}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Predictive Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Forecasting 87% utilization by June. Consider capacity expansion.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsList />
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors text-left">
              <Activity className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm font-medium">View Network Status</p>
            </button>
            <button className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors text-left">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm font-medium">Customer Reports</p>
            </button>
            <button className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors text-left">
              <DollarSign className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm font-medium">Generate Invoice</p>
            </button>
            <button className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors text-left">
              <AlertCircle className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm font-medium">SLA Monitoring</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
