import { Shield, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ComplianceBadges() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="success" className="gap-1">
        <Shield className="w-3 h-3" />
        BTRC Compliant
      </Badge>
      <Badge variant="success" className="gap-1">
        <CheckCircle2 className="w-3 h-3" />
        NBR Registered
      </Badge>
      <Badge variant="info" className="gap-1">
        <Shield className="w-3 h-3" />
        ICT Act 2006
      </Badge>
    </div>
  );
}
