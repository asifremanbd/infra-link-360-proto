import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Activity } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

const regions = [
  { name: "Dhaka", key: "dhaka", customers: 245, bandwidth: "850 Gbps", utilization: 78, status: "operational" },
  { name: "Chattogram", key: "chattogram", customers: 132, bandwidth: "420 Gbps", utilization: 65, status: "operational" },
  { name: "Sylhet", key: "sylhet", customers: 67, bandwidth: "180 Gbps", utilization: 54, status: "operational" },
  { name: "Rajshahi", key: "rajshahi", customers: 89, bandwidth: "220 Gbps", utilization: 71, status: "operational" },
  { name: "Khulna", key: "khulna", customers: 54, bandwidth: "150 Gbps", utilization: 49, status: "operational" },
];

export default function RegionalMapWidget() {
  const { t } = useLocalization();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Bangladesh Regional Operations</CardTitle>
        </div>
        <CardDescription>Customer distribution & bandwidth utilization by division</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {regions.map((region) => (
            <div key={region.key} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{t(region.key)}</span>
                </div>
                <Badge variant={region.utilization > 75 ? "warning" : "success"} className="gap-1">
                  <Activity className="w-3 h-3" />
                  {region.utilization}%
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Customers: <span className="text-foreground font-medium">{region.customers}</span></div>
                <div>Bandwidth: <span className="text-foreground font-medium">{region.bandwidth}</span></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
