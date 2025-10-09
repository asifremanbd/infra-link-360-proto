import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { bandwidthData, bandwidthForecast } from "@/data/mockData";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity, TrendingUp, AlertCircle, Cable } from "lucide-react";

const cables = [
  { id: "CAB-001", name: "Atlantic Cable A", status: "Operational", utilization: 85, capacity: "40 Tbps", location: "NYC-London" },
  { id: "CAB-002", name: "Pacific Cable B", status: "Warning", utilization: 91, capacity: "60 Tbps", location: "LA-Tokyo" },
  { id: "CAB-003", name: "Mediterranean Link", status: "Operational", utilization: 67, capacity: "30 Tbps", location: "Rome-Cairo" },
  { id: "CAB-004", name: "South Atlantic", status: "Operational", utilization: 54, capacity: "25 Tbps", location: "Brazil-SA" },
];

export default function Bandwidth() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Bandwidth & Submarine Cable Management</h1>
        <p className="text-muted-foreground">Real-time traffic monitoring and capacity forecasting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Capacity</span>
          </div>
          <p className="text-2xl font-bold">155 Tbps</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-chart-2">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-chart-2" />
            <span className="text-sm font-medium text-muted-foreground">Avg Utilization</span>
          </div>
          <p className="text-2xl font-bold">74.3%</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-warning">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Alerts (80%+)</span>
          </div>
          <p className="text-2xl font-bold">2 Cables</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-success">
          <div className="flex items-center gap-3 mb-2">
            <Cable className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-muted-foreground">Active Cables</span>
          </div>
          <p className="text-2xl font-bold">4 Links</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">24-Hour Traffic Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bandwidthData}>
              <defs>
                <linearGradient id="bandwidthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }} />
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
                fill="url(#bandwidthGradient)" 
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

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">6-Month Capacity Forecast</h3>
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
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Prediction:</strong> Expected to reach 87% utilization by June. Consider capacity expansion planning.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Submarine Cable Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cable ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Capacity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Utilization</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {cables.map((cable) => (
                <tr key={cable.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm">{cable.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium">{cable.name}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{cable.location}</td>
                  <td className="py-4 px-4 text-sm">{cable.capacity}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${
                            cable.utilization > 80 ? 'bg-critical' : 
                            cable.utilization > 60 ? 'bg-warning' : 
                            'bg-success'
                          }`}
                          style={{ width: `${cable.utilization}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{cable.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={cable.utilization > 80 ? "warning" : "success"}>
                      {cable.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
