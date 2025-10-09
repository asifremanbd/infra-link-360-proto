import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Activity,
  BarChart3,
  Users,
  DollarSign,
  Network,
  Shield,
  MessageSquare,
  FileText,
  LayoutDashboard,
  BookOpen,
  AlertTriangle,
  Briefcase,
  UserCircle,
  TrendingUp,
} from "lucide-react";

const allModules = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["admin", "noc", "finance", "hr", "marketing", "compliance"] },
  { path: "/bandwidth", icon: Activity, label: "Bandwidth & Cables", roles: ["admin", "noc"] },
  { path: "/noc", icon: Network, label: "NOC Monitoring", roles: ["admin", "noc"] },
  { path: "/customers", icon: Users, label: "Customer Database", roles: ["admin", "finance", "marketing"] },
  { path: "/billing", icon: DollarSign, label: "Billing & Invoicing", roles: ["admin", "finance"] },
  { path: "/ledger", icon: BookOpen, label: "Ledger Management", roles: ["admin", "finance"] },
  { path: "/defaults", icon: AlertTriangle, label: "Payment Defaults", roles: ["admin", "finance"] },
  { path: "/complaints", icon: MessageSquare, label: "Complaints", roles: ["admin", "hr", "noc"] },
  { path: "/finance", icon: FileText, label: "Finance & Accounting", roles: ["admin", "finance"] },
  { path: "/hr", icon: UserCircle, label: "HR & Payroll", roles: ["admin", "hr"] },
  { path: "/marketing", icon: TrendingUp, label: "Marketing & Sales", roles: ["admin", "marketing"] },
  { path: "/analytics", icon: BarChart3, label: "Analytics & Reports", roles: ["admin", "finance", "noc", "marketing"] },
  { path: "/security", icon: Shield, label: "Security & Compliance", roles: ["admin", "compliance"] },
];

export default function Sidebar() {
  const { user } = useAuth();

  const visibleModules = allModules.filter((module) =>
    module.roles.includes(user?.role || "")
  );

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-secondary rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">InfraLink 360</h1>
            <p className="text-xs text-sidebar-foreground/70">Enterprise Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {visibleModules.map((module) => {
          const Icon = module.icon;
          return (
            <NavLink
              key={module.path}
              to={module.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80",
                  module.placeholder && "opacity-60 cursor-not-allowed"
                )
              }
              onClick={(e) => module.placeholder && e.preventDefault()}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{module.label}</span>
              {module.placeholder && (
                <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded">Soon</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-semibold text-sm">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
