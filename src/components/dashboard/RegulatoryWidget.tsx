import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Shield, CheckCircle2 } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

export default function RegulatoryWidget() {
  const { t } = useLocalization();

  const reports = [
    { name: "BTRC Monthly Report", status: "current", date: "Dec 2024" },
    { name: "NBR VAT Return", status: "current", date: "Dec 2024" },
    { name: "ICT Act Compliance", status: "verified", date: "Q4 2024" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">{t('regulatoryReports')}</CardTitle>
          </div>
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Compliant
          </Badge>
        </div>
        <CardDescription>BTRC & NBR regulatory reporting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{report.name}</p>
                <p className="text-xs text-muted-foreground">{report.date}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              PDF
            </Button>
          </div>
        ))}
        
        <div className="pt-2 space-y-2">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <FileText className="w-4 h-4" />
            {t('generateBTRCReport')}
          </Button>
          <Button variant="outline" size="sm" className="w-full gap-2">
            <FileText className="w-4 h-4" />
            {t('generateNBRXML')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
