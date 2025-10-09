import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { networkTopology, slaEvents } from "@/data/mockData";
import { Network, Server, Cable, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

export default function NOC() {
  const getStatusIcon = (status: string) => {
    if (status === "Operational") return <CheckCircle className="w-5 h-5 text-success" />;
    if (status === "Warning") return <AlertTriangle className="w-5 h-5 text-warning" />;
    return <AlertCircle className="w-5 h-5 text-critical" />;
  };

  const getTypeIcon = (type: string) => {
    if (type === "router") return <Network className="w-5 h-5" />;
    if (type === "switch") return <Server className="w-5 h-5" />;
    return <Cable className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Network Operations Center</h1>
        <p className="text-muted-foreground">Multi-layer topology monitoring and SLA management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Operational</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">5</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Warning</span>
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">1</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-critical/10 to-transparent border-critical/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Critical</span>
            <AlertCircle className="w-5 h-5 text-critical" />
          </div>
          <p className="text-3xl font-bold text-foreground">0</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">SLA Compliance</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">98.5%</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Network Topology View</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {networkTopology.map((node) => (
            <Card 
              key={node.id} 
              className={`p-4 border-2 ${
                node.status === "Warning" 
                  ? "border-warning/30 bg-warning/5" 
                  : "border-border hover:border-primary/50"
              } transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    {getTypeIcon(node.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{node.name}</h4>
                    <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                  </div>
                </div>
                {getStatusIcon(node.status)}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{node.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Load:</span>
                  <span className="font-medium">{node.load}%</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        node.load > 80 ? 'bg-critical' : 
                        node.load > 60 ? 'bg-warning' : 
                        'bg-success'
                      }`}
                      style={{ width: `${node.load}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">SLA Events & Alarms</h3>
        <div className="space-y-3">
          {slaEvents.map((event) => {
            const isRecent = event.time.includes("min");
            return (
              <div
                key={event.id}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 ${
                  event.severity === "critical"
                    ? "border-critical/30 bg-critical/5"
                    : event.severity === "warning"
                    ? "border-warning/30 bg-warning/5"
                    : "border-border bg-muted/30"
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {event.severity === "critical" && <AlertCircle className="w-5 h-5 text-critical" />}
                  {event.severity === "warning" && <AlertTriangle className="w-5 h-5 text-warning" />}
                  {event.severity === "info" && <CheckCircle className="w-5 h-5 text-info" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-foreground">{event.message}</p>
                    <Badge 
                      variant={
                        event.severity === "critical" ? "critical" : 
                        event.severity === "warning" ? "warning" : 
                        "default"
                      }
                      className="whitespace-nowrap"
                    >
                      {event.module}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{event.time}</span>
                    {isRecent && (
                      <Badge variant="destructive" className="text-xs">New</Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
