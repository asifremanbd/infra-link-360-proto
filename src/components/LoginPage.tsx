import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserRole } from "@/types/user";
import { Activity, User, DollarSign, Users } from "lucide-react";

const roles = [
  { value: "admin" as UserRole, label: "Administrator", icon: Activity, description: "Full system access" },
  { value: "noc" as UserRole, label: "NOC Engineer", icon: Activity, description: "Network operations & monitoring" },
  { value: "finance" as UserRole, label: "Finance Manager", icon: DollarSign, description: "Billing & invoicing" },
  { value: "hr" as UserRole, label: "HR Officer", icon: Users, description: "Workforce management" },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedRole) return;

    const user = {
      id: `user-${Date.now()}`,
      name: `${roles.find(r => r.value === selectedRole)?.label}`,
      email: `${selectedRole}@infralink360.com`,
      role: selectedRole,
    };

    login(user);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">InfraLink 360</h1>
          <p className="text-muted-foreground">Select your role to access the platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`p-6 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                  selectedRole === role.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    selectedRole === role.value ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{role.label}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleLogin}
          disabled={!selectedRole}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          Access Platform
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          MVP Prototype - Role-based access simulation
        </p>
      </Card>
    </div>
  );
}
