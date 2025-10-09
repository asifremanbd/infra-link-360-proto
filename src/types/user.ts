export type UserRole = "admin" | "noc" | "finance" | "hr" | "marketing" | "compliance";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export const ROLE_PERMISSIONS = {
  admin: ["all"],
  noc: ["bandwidth", "network", "monitoring", "complaints"],
  finance: ["billing", "invoicing", "analytics", "ledger", "defaults"],
  hr: ["complaints", "workforce", "payroll"],
  marketing: ["leads", "campaigns", "sales"],
  compliance: ["security", "audit", "regulatory"]
};
