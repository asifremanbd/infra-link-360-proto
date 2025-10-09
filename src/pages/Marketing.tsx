import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { leads, opportunities, campaigns } from "@/data/extendedMockData";
import { formatBDT } from "@/lib/bdtUtils";
import { formatBDDate } from "@/lib/dateUtils";
import { TrendingUp, Target, DollarSign, Users, Mail, Linkedin, Calendar } from "lucide-react";

export default function Marketing() {
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.stage === "Qualified" || l.stage === "Proposal").length;
  const totalPipeline = opportunities.reduce((sum, o) => sum + (leads.find(l => l.id === o.leadId)?.estValueBdt || 0), 0);
  const avgConversionRate = campaigns.reduce((sum, c) => sum + (c.conversions / c.leadsGen) * 100, 0) / campaigns.length;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Closing": return "success";
      case "Negotiation": return "warning";
      case "Proposal": return "info";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Marketing & Sales</h1>
        <p className="text-muted-foreground">Lead management, pipeline tracking, and campaign ROI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Leads</span>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalLeads}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Qualified</span>
            <Target className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{qualifiedLeads}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Pipeline Value</span>
            <DollarSign className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(totalPipeline)}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/10 to-transparent border-info/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Conversion Rate</span>
            <TrendingUp className="w-5 h-5 text-info" />
          </div>
          <p className="text-3xl font-bold text-foreground">{avgConversionRate.toFixed(1)}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Active Leads</h3>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              New Lead
            </Button>
          </div>
          
          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-lg border-2 border-border hover:bg-muted/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold mb-1">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.region}</p>
                  </div>
                  <Badge variant={getStageColor(lead.stage)}>{lead.stage}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Source:</span>
                    <p className="font-medium">{lead.source}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Value:</span>
                    <p className="font-semibold">{formatBDT(lead.estValueBdt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Created: {formatBDDate(lead.createdAt)}
                  </span>
                  <Button variant="outline" size="sm">Convert</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Opportunities</h3>
          <div className="space-y-3">
            {opportunities.map((opp) => {
              const lead = leads.find(l => l.id === opp.leadId);
              
              return (
                <div
                  key={opp.id}
                  className="p-4 rounded-lg border-2 border-border hover:bg-muted/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold mb-1">{lead?.name}</p>
                      <p className="text-sm text-muted-foreground">{opp.product}</p>
                    </div>
                    <Badge variant={getStageColor(opp.status)}>{opp.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Bandwidth:</span>
                      <p className="font-medium">{(opp.bandwidthMbps / 1000).toFixed(0)} Gbps</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Value:</span>
                      <p className="font-semibold">{formatBDT(lead?.estValueBdt || 0)}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-medium">{opp.probabilityPct}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-success transition-all"
                        style={{ width: `${opp.probabilityPct}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Close: {formatBDDate(opp.closeDate)}
                    </span>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Campaign Performance</h3>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="p-4 border-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {campaign.channel === "Email" && <Mail className="w-5 h-5 text-primary" />}
                  {campaign.channel === "LinkedIn" && <Linkedin className="w-5 h-5 text-primary" />}
                  {campaign.channel === "Event" && <Calendar className="w-5 h-5 text-primary" />}
                  <div>
                    <p className="font-semibold">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">{campaign.channel}</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-success/10 text-success border-success/20">
                  ROI: {campaign.roiPct}%
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">Budget</span>
                  <p className="font-semibold">{formatBDT(campaign.budgetBdt)}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Spent</span>
                  <p className="font-semibold">{formatBDT(campaign.spendBdt)}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Leads</span>
                  <p className="font-semibold">{campaign.leadsGen}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Conversions</span>
                  <p className="font-semibold">{campaign.conversions}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Conv. Rate</span>
                  <p className="font-semibold">{((campaign.conversions / campaign.leadsGen) * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Budget Utilization</span>
                  <span className="font-medium">{((campaign.spendBdt / campaign.budgetBdt) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${(campaign.spendBdt / campaign.budgetBdt) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sales Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Q1 Target</span>
              <Target className="w-5 h-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{formatBDT(15000000)}</p>
            <p className="text-sm text-success mt-1">On track</p>
          </div>
          
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Weighted Pipeline</span>
              <DollarSign className="w-5 h-5 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">{formatBDT(totalPipeline * 0.72)}</p>
            <p className="text-sm text-muted-foreground mt-1">72% weighted</p>
          </div>
          
          <div className="p-4 bg-info/10 rounded-lg border border-info/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Win Rate</span>
              <TrendingUp className="w-5 h-5 text-info" />
            </div>
            <p className="text-2xl font-bold text-foreground">68%</p>
            <p className="text-sm text-success mt-1">+5% vs last quarter</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
