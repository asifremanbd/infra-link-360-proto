import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { defaultsRisk, dunningActions, extendedCustomers } from "@/data/extendedMockData";
import { formatBDDate } from "@/lib/dateUtils";
import { AlertTriangle, AlertCircle, CheckCircle, Mail, Phone } from "lucide-react";

export default function Defaults() {
  const riskCounts = {
    low: defaultsRisk.filter(r => r.bucket === "Low").length,
    medium: defaultsRisk.filter(r => r.bucket === "Medium").length,
    high: defaultsRisk.filter(r => r.bucket === "High").length,
  };

  const getRiskColor = (bucket: string) => {
    switch (bucket) {
      case "High": return "critical";
      case "Medium": return "warning";
      default: return "default";
    }
  };

  const getStageInfo = (stage: string) => {
    switch (stage) {
      case "soft1": return { label: "Soft 1", variant: "default" as const };
      case "soft2": return { label: "Soft 2", variant: "warning" as const };
      case "hard": return { label: "Hard", variant: "critical" as const };
      default: return { label: stage, variant: "default" as const };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Payment Default Management</h1>
        <p className="text-muted-foreground">Risk scoring, dunning workflows, and collections management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Low Risk</span>
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{riskCounts.low}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Medium Risk</span>
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">{riskCounts.medium}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-critical/10 to-transparent border-critical/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">High Risk</span>
            <AlertCircle className="w-5 h-5 text-critical" />
          </div>
          <p className="text-3xl font-bold text-foreground">{riskCounts.high}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/10 to-transparent border-info/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Active Dunning</span>
            <Mail className="w-5 h-5 text-info" />
          </div>
          <p className="text-3xl font-bold text-foreground">{dunningActions.length}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Risk Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultsRisk.map((risk) => {
            const customer = extendedCustomers.find(c => c.id === risk.customerId);
            return (
              <Card 
                key={risk.id} 
                className={`p-4 border-2 ${
                  risk.bucket === "High" 
                    ? "border-critical/30 bg-critical/5" 
                    : risk.bucket === "Medium"
                    ? "border-warning/30 bg-warning/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{customer?.name}</h4>
                    <p className="text-xs text-muted-foreground">{customer?.code}</p>
                  </div>
                  <Badge variant={getRiskColor(risk.bucket)}>{risk.bucket}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Risk Score:</span>
                    <span className="font-bold">{risk.riskScore}/100</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        risk.riskScore >= 80 ? 'bg-critical' : 
                        risk.riskScore >= 60 ? 'bg-warning' : 
                        'bg-success'
                      }`}
                      style={{ width: `${risk.riskScore}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">{risk.reason}</p>
                  <p className="text-xs text-muted-foreground">Updated: {formatBDDate(risk.updatedAt)}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Dunning Timeline</h3>
        <div className="space-y-3">
          {dunningActions.map((action) => {
            const customer = extendedCustomers.find(c => c.id === action.customerId);
            const stageInfo = getStageInfo(action.stage);
            
            return (
              <div
                key={action.id}
                className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:bg-muted/30 transition-all"
              >
                <div className="flex-shrink-0 mt-1">
                  {action.stage === "hard" ? (
                    <AlertCircle className="w-5 h-5 text-critical" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold">{customer?.name}</p>
                      <p className="text-sm text-muted-foreground">{action.action}</p>
                    </div>
                    <Badge variant={stageInfo.variant}>{stageInfo.label}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{formatBDDate(action.actionAt, true)}</span>
                    <span>By: {action.byUser}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-critical/5 to-transparent border-critical/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-critical" />
          Legal Escalation Queue
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Accounts flagged for legal action due to prolonged non-payment
        </p>
        <div className="space-y-2">
          {defaultsRisk
            .filter(r => r.bucket === "High")
            .map(risk => {
              const customer = extendedCustomers.find(c => c.id === risk.customerId);
              return (
                <div key={risk.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-critical/30">
                  <div>
                    <p className="font-medium">{customer?.name}</p>
                    <p className="text-sm text-muted-foreground">{risk.reason}</p>
                  </div>
                  <Button variant="destructive" size="sm">Escalate to Legal</Button>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}
