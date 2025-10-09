export type UserRole = "admin" | "noc" | "finance" | "hr";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export const ROLE_PERMISSIONS = {
  admin: ["all"],
  noc: ["bandwidth", "network", "monitoring"],
  finance: ["billing", "invoicing", "analytics"],
  hr: ["complaints", "workforce"]
};
