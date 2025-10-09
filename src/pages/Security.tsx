import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { auditLog, complianceScores } from "@/data/extendedMockData";
import { formatBDDate } from "@/lib/dateUtils";
import { Shield, Lock, AlertTriangle, CheckCircle, FileText, Activity } from "lucide-react";

export default function Security() {
  const complianceAvg = complianceScores.reduce((sum, c) => sum + c.score, 0) / complianceScores.length;
  const criticalLogs = auditLog.filter(l => l.action === "role_change" || l.action === "period_close").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Security & Compliance</h1>
        <p className="text-muted-foreground">RBAC, audit trails, and regulatory compliance management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Compliance Avg</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{complianceAvg.toFixed(1)}%</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Active Users</span>
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">24</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Critical Events</span>
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">{criticalLogs}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/10 to-transparent border-info/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">MFA Enabled</span>
            <Lock className="w-5 h-5 text-info" />
          </div>
          <p className="text-3xl font-bold text-foreground">87%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Compliance Scorecards</h3>
          <div className="space-y-4">
            {complianceScores.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-2 ${
                  item.status === "Compliant" 
                    ? "border-success/30 bg-success/5" 
                    : "border-warning/30 bg-warning/5"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold mb-1">{item.framework}</p>
                    <p className="text-sm text-muted-foreground">
                      Last audit: {formatBDDate(item.lastAudit)}
                    </p>
                  </div>
                  <Badge variant={item.status === "Compliant" ? "default" : "warning"}>
                    {item.status}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Compliance Score</span>
                    <span className="font-bold">{item.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        item.score >= 95 ? 'bg-success' : 
                        item.score >= 85 ? 'bg-warning' : 
                        'bg-critical'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium mb-1">Enforce MFA</p>
                <p className="text-sm text-muted-foreground">Require two-factor authentication</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium mb-1">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium mb-1">IP Whitelisting</p>
                <p className="text-sm text-muted-foreground">Restrict access by IP range</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium mb-1">Audit Logging</p>
                <p className="text-sm text-muted-foreground">Track all system activities</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <Button variant="default" className="w-full mt-4">
            <Lock className="w-4 h-4 mr-2" />
            Backup & Recovery
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Audit Log
          </h3>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Entity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm">{formatBDDate(log.at, true)}</td>
                  <td className="py-3 px-4 text-sm font-medium">{log.user}</td>
                  <td className="py-3 px-4 text-sm">
                    <Badge variant="secondary">{log.role}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Badge variant={
                      log.action === "role_change" || log.action === "period_close" 
                        ? "warning" 
                        : "default"
                    }>
                      {log.action}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono">{log.entity}</td>
                  <td className="py-3 px-4 text-sm font-mono">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Regulatory Documentation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            <span>BTRC Compliance Report</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            <span>ICT Act Documentation</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            <span>Data Privacy Policy</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
