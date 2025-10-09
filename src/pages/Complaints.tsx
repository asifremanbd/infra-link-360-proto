import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { complaints, extendedCustomers } from "@/data/extendedMockData";
import { formatBDDate, getDaysOverdue } from "@/lib/dateUtils";
import { MessageSquare, Phone, Mail, AlertCircle, Clock, CheckCircle } from "lucide-react";

export default function Complaints() {
  const statusCounts = {
    open: complaints.filter(c => c.status === "Open").length,
    inProgress: complaints.filter(c => c.status === "In Progress").length,
    resolved: complaints.filter(c => c.status === "Resolved").length,
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Resolved": return "default";
      case "In Progress": return "warning";
      case "Acknowledged": return "secondary";
      default: return "critical";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Critical": return "critical";
      case "High": return "warning";
      case "Medium": return "secondary";
      default: return "default";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Call Center": return <Phone className="w-4 h-4" />;
      case "Email": return <Mail className="w-4 h-4" />;
      case "Web Portal": return <MessageSquare className="w-4 h-4" />;
      case "NOC Alert": return <AlertCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const calculateSLAStatus = (slaTarget: string, status: string) => {
    if (status === "Resolved") return { label: "Met", variant: "default" as const };
    
    const hoursRemaining = (new Date(slaTarget).getTime() - new Date().getTime()) / (1000 * 60 * 60);
    
    if (hoursRemaining < 0) return { label: "Breached", variant: "critical" as const };
    if (hoursRemaining < 2) return { label: "At Risk", variant: "warning" as const };
    return { label: "On Track", variant: "default" as const };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Complaint Management</h1>
        <p className="text-muted-foreground">Omni-channel intake, SLA tracking, and RCA correlation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-critical/10 to-transparent border-critical/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Open</span>
            <AlertCircle className="w-5 h-5 text-critical" />
          </div>
          <p className="text-3xl font-bold text-foreground">{statusCounts.open}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">In Progress</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">{statusCounts.inProgress}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Resolved (24h)</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{statusCounts.resolved}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">FCR %</span>
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">87.5%</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Active Complaints</h3>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Complaint
          </Button>
        </div>
        
        <div className="space-y-4">
          {complaints.map((complaint) => {
            const customer = extendedCustomers.find(c => c.id === complaint.customerId);
            const slaStatus = calculateSLAStatus(complaint.slaTargetAt, complaint.status);
            
            return (
              <Card 
                key={complaint.id} 
                className={`p-4 border-2 ${
                  complaint.priority === "Critical" 
                    ? "border-critical/30 bg-critical/5" 
                    : complaint.priority === "High"
                    ? "border-warning/30 bg-warning/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getChannelIcon(complaint.channel)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-semibold mb-1">{customer?.name}</p>
                        <p className="text-sm text-muted-foreground">{complaint.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={getPriorityVariant(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                        <Badge variant={getStatusVariant(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Channel:</span>
                        <p className="font-medium">{complaint.channel}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Opened:</span>
                        <p className="font-medium">{formatBDDate(complaint.openedAt, true)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SLA Target:</span>
                        <p className="font-medium">{formatBDDate(complaint.slaTargetAt, true)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SLA Status:</span>
                        <Badge variant={slaStatus.variant} className="mt-1">
                          {slaStatus.label}
                        </Badge>
                      </div>
                    </div>
                    
                    {complaint.rcaTag && (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="text-muted-foreground">RCA:</span> {complaint.rcaTag}
                        </span>
                        {complaint.linkedNocEventId && (
                          <Badge variant="secondary" className="ml-auto">
                            NOC-{complaint.linkedNocEventId}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">Update</Button>
                    <Button variant="outline" size="sm">Resolve</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Channel Distribution</h3>
          <div className="space-y-3">
            {["Call Center", "Email", "Web Portal", "NOC Alert"].map(channel => {
              const count = complaints.filter(c => c.channel === channel).length;
              const percentage = (count / complaints.length) * 100;
              
              return (
                <div key={channel}>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="flex items-center gap-2">
                      {getChannelIcon(channel)}
                      {channel}
                    </span>
                    <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">SLA Performance</h3>
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">SLA Met</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">92%</p>
            </div>
            
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Average Response Time</span>
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">1.2 hrs</p>
            </div>
            
            <div className="p-4 bg-info/10 rounded-lg border border-info/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">MTTR</span>
                <Clock className="w-5 h-5 text-info" />
              </div>
              <p className="text-2xl font-bold text-foreground">4.5 hrs</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
