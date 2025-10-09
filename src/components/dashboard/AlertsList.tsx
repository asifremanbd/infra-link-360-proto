import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slaEvents } from "@/data/mockData";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const severityConfig = {
  critical: {
    icon: AlertCircle,
    variant: "critical" as const,
    bg: "bg-critical/10",
    text: "text-critical",
  },
  warning: {
    icon: AlertTriangle,
    variant: "warning" as const,
    bg: "bg-warning/10",
    text: "text-warning",
  },
  info: {
    icon: Info,
    variant: "default" as const,
    bg: "bg-info/10",
    text: "text-info",
  },
};

export default function AlertsList() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Alerts & Events</h3>
      <div className="space-y-3">
        {slaEvents.map((event) => {
          const config = severityConfig[event.severity as keyof typeof severityConfig];
          const Icon = config.icon;
          
          return (
            <div
              key={event.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border",
                config.bg
              )}
            >
              <div className={cn("mt-0.5", config.text)}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{event.message}</p>
                  <Badge variant={config.variant} className="text-xs whitespace-nowrap">
                    {event.module}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
