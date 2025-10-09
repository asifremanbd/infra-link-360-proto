// Extended mock data for all 12 modules with Bangladesh-specific datasets

export const regions = ["Dhaka", "Chattogram", "Khulna", "Sylhet", "Rajshahi"];
export const landingSites = ["Cox's Bazar", "Kuakata"];

// Ledger entries
export const ledgerEntries = [
  { id: 1, customerId: "C001", type: "AR", ref: "INV-2024-001", debitBdt: 143750, creditBdt: 0, postedAt: "2024-01-15T10:30:00", reconciled: true },
  { id: 2, customerId: "C001", type: "AR", ref: "PMT-2024-001", debitBdt: 0, creditBdt: 143750, postedAt: "2024-01-16T14:20:00", reconciled: true },
  { id: 3, customerId: "C002", type: "AR", ref: "INV-2024-002", debitBdt: 51750, creditBdt: 0, postedAt: "2024-01-20T11:00:00", reconciled: false },
  { id: 4, customerId: "C003", type: "AR", ref: "INV-2024-003", debitBdt: 264500, creditBdt: 0, postedAt: "2024-01-10T09:15:00", reconciled: false },
  { id: 5, customerId: "C004", type: "AR", ref: "INV-2024-004", debitBdt: 32200, creditBdt: 0, postedAt: "2024-01-18T15:45:00", reconciled: true },
  { id: 6, customerId: "C004", type: "AR", ref: "PMT-2024-004", debitBdt: 0, creditBdt: 32200, postedAt: "2024-01-19T10:00:00", reconciled: true },
];

export const suspenseEntries = [
  { id: 1, amountBdt: 15000, source: "Unknown wire transfer", notedAt: "2024-01-22T11:30:00", resolved: false, resolutionNote: null },
  { id: 2, amountBdt: 8500, source: "Partial payment mismatch", notedAt: "2024-01-20T14:15:00", resolved: true, resolutionNote: "Allocated to INV-2024-010" },
];

// Payment defaults and risk
export const defaultsRisk = [
  { id: 1, customerId: "C001", riskScore: 45, bucket: "Low", reason: "Good payment history", updatedAt: "2024-01-25T10:00:00" },
  { id: 2, customerId: "C002", riskScore: 68, bucket: "Medium", reason: "Overdue 35 days, missed promise", updatedAt: "2024-01-25T10:00:00" },
  { id: 3, customerId: "C003", riskScore: 92, bucket: "High", reason: "Overdue 65 days, no response", updatedAt: "2024-01-25T10:00:00" },
  { id: 4, customerId: "C004", riskScore: 38, bucket: "Low", reason: "Consistent payer", updatedAt: "2024-01-25T10:00:00" },
];

export const dunningActions = [
  { id: 1, customerId: "C002", stage: "soft2", action: "Sent second reminder email + SMS", actionAt: "2024-01-24T09:00:00", byUser: "finance@infralink.bd" },
  { id: 2, customerId: "C003", stage: "hard", action: "Service suspension notice sent", actionAt: "2024-01-23T10:30:00", byUser: "finance@infralink.bd" },
  { id: 3, customerId: "C003", stage: "hard", action: "Case escalated to legal", actionAt: "2024-01-25T14:00:00", byUser: "admin@infralink.bd" },
];

// Complaints
export const complaints = [
  { id: 1, customerId: "C001", channel: "Call Center", category: "Service Outage", priority: "Critical", openedAt: "2024-01-25T08:15:00", slaTargetAt: "2024-01-25T12:15:00", status: "In Progress", rcaTag: "Fiber Cut", linkedNocEventId: 1 },
  { id: 2, customerId: "C002", channel: "Email", category: "Billing Issue", priority: "Medium", openedAt: "2024-01-24T14:30:00", slaTargetAt: "2024-01-26T14:30:00", status: "Acknowledged", rcaTag: null, linkedNocEventId: null },
  { id: 3, customerId: "C005", channel: "NOC Alert", category: "Performance", priority: "High", openedAt: "2024-01-25T10:00:00", slaTargetAt: "2024-01-25T18:00:00", status: "Resolved", rcaTag: "Config Error", linkedNocEventId: 2 },
  { id: 4, customerId: "C003", channel: "Web Portal", category: "Account Access", priority: "Low", openedAt: "2024-01-23T16:45:00", slaTargetAt: "2024-01-27T16:45:00", status: "Open", rcaTag: null, linkedNocEventId: null },
];

export const nocEventsExtended = [
  { id: 1, device: "Cable-A (Atlantic)", location: "Submarine", severity: "critical", openedAt: "2024-01-25T08:10:00", closedAt: null, linkedComplaintId: 1 },
  { id: 2, device: "Core Router 01", location: "DC-Dhaka", severity: "warning", openedAt: "2024-01-25T09:45:00", closedAt: "2024-01-25T11:30:00", linkedComplaintId: 3 },
];

// Finance & Accounting
export const glAccounts = [
  { id: 1, code: "1000", name: "Cash", type: "asset" },
  { id: 2, code: "1100", name: "Accounts Receivable", type: "asset" },
  { id: 3, code: "2000", name: "Accounts Payable", type: "liability" },
  { id: 4, code: "3000", name: "Equity", type: "equity" },
  { id: 5, code: "4000", name: "Revenue", type: "income" },
  { id: 6, code: "5000", name: "COGS", type: "expense" },
  { id: 7, code: "6100", name: "Salaries", type: "expense" },
  { id: 8, code: "6200", name: "VAT Payable", type: "liability" },
  { id: 9, code: "6300", name: "WHT Payable", type: "liability" },
];

export const glJournals = [
  { id: 1, memo: "Revenue recognition Jan 2024", postedBy: "finance@infralink.bd", postedAt: "2024-01-31T17:00:00", locked: true },
  { id: 2, memo: "Payroll Jan 2024", postedBy: "hr@infralink.bd", postedAt: "2024-01-31T18:00:00", locked: true },
  { id: 3, memo: "VAT accrual Jan 2024", postedBy: "finance@infralink.bd", postedAt: "2024-01-31T18:30:00", locked: true },
];

export const taxConfig = [
  { id: 1, name: "Standard VAT", ratePct: 15, type: "VAT", effectiveFrom: "2020-01-01" },
  { id: 2, name: "WHT - Service", ratePct: 5, type: "WHT", effectiveFrom: "2020-01-01" },
  { id: 3, name: "WHT - Corporate", ratePct: 10, type: "WHT", effectiveFrom: "2020-01-01" },
];

// HR & Payroll
export const employees = [
  { id: 1, code: "EMP001", name: "Md. Karim Rahman", dept: "NOC", grade: "Senior Engineer", joinDate: "2020-05-15", baseSalaryBdt: 85000, status: "Active" },
  { id: 2, code: "EMP002", name: "Fatima Akter", dept: "Finance", grade: "Manager", joinDate: "2019-03-10", baseSalaryBdt: 120000, status: "Active" },
  { id: 3, code: "EMP003", name: "Rafiq Ahmed", dept: "Sales", grade: "Executive", joinDate: "2021-07-01", baseSalaryBdt: 55000, status: "Active" },
  { id: 4, code: "EMP004", name: "Nusrat Jahan", dept: "HR", grade: "Officer", joinDate: "2022-01-20", baseSalaryBdt: 48000, status: "Active" },
  { id: 5, code: "EMP005", name: "Tanvir Hossain", dept: "NOC", grade: "Engineer", joinDate: "2021-11-05", baseSalaryBdt: 65000, status: "Active" },
  { id: 6, code: "EMP006", name: "Shirin Begum", dept: "Finance", grade: "Accountant", joinDate: "2020-09-12", baseSalaryBdt: 72000, status: "Active" },
  { id: 7, code: "EMP007", name: "Abdullah Khan", dept: "Compliance", grade: "Analyst", joinDate: "2022-04-18", baseSalaryBdt: 58000, status: "Active" },
  { id: 8, code: "EMP008", name: "Salma Khatun", dept: "Marketing", grade: "Specialist", joinDate: "2021-06-25", baseSalaryBdt: 62000, status: "Active" },
];

export const payrollRuns = [
  { id: 1, month: "2024-01", runAt: "2024-01-31T19:00:00", posted: true },
  { id: 2, month: "2023-12", runAt: "2023-12-31T19:00:00", posted: true },
];

// Marketing & Sales
export const leads = [
  { id: 1, name: "Sunshine Telecom", source: "Web", region: "Dhaka", stage: "Qualified", estValueBdt: 850000, owner: "sales@infralink.bd", createdAt: "2024-01-15" },
  { id: 2, name: "Metro ISP Ltd", source: "Event", region: "Chattogram", stage: "Contacted", estValueBdt: 1200000, owner: "sales@infralink.bd", createdAt: "2024-01-18" },
  { id: 3, name: "Digital Bangladesh Corp", source: "Referral", region: "Sylhet", stage: "Proposal", estValueBdt: 2500000, owner: "sales@infralink.bd", createdAt: "2024-01-10" },
  { id: 4, name: "TechHub Solutions", source: "Web", region: "Dhaka", stage: "New", estValueBdt: 450000, owner: "sales@infralink.bd", createdAt: "2024-01-22" },
];

export const opportunities = [
  { id: 1, leadId: 1, product: "10 Gbps Link", bandwidthMbps: 10000, probabilityPct: 75, closeDate: "2024-02-28", status: "Negotiation" },
  { id: 2, leadId: 2, product: "20 Gbps Link", bandwidthMbps: 20000, probabilityPct: 60, closeDate: "2024-03-15", status: "Proposal" },
  { id: 3, leadId: 3, product: "40 Gbps Link", bandwidthMbps: 40000, probabilityPct: 85, closeDate: "2024-02-10", status: "Closing" },
];

export const campaigns = [
  { id: 1, name: "Q1 2024 Enterprise Push", channel: "Email", budgetBdt: 150000, spendBdt: 142000, leadsGen: 47, conversions: 8, roiPct: 285 },
  { id: 2, name: "LinkedIn Bandwidth Ads", channel: "LinkedIn", budgetBdt: 200000, spendBdt: 185000, leadsGen: 62, conversions: 12, roiPct: 340 },
  { id: 3, name: "BTRC Summit 2024", channel: "Event", budgetBdt: 500000, spendBdt: 480000, leadsGen: 123, conversions: 18, roiPct: 420 },
];

// Security & Audit
export const auditLog = [
  { id: 1, user: "admin@infralink.bd", role: "Admin", action: "login", entity: "auth", entityId: null, ip: "103.92.45.12", at: "2024-01-25T08:00:00" },
  { id: 2, user: "finance@infralink.bd", role: "Finance", action: "export_report", entity: "invoices", entityId: null, ip: "103.92.45.23", at: "2024-01-25T10:15:00" },
  { id: 3, user: "noc@infralink.bd", role: "NOC", action: "update_device", entity: "devices", entityId: "N3", ip: "103.92.45.45", at: "2024-01-25T11:30:00" },
  { id: 4, user: "admin@infralink.bd", role: "Admin", action: "role_change", entity: "users", entityId: "U005", ip: "103.92.45.12", at: "2024-01-24T14:20:00" },
  { id: 5, user: "finance@infralink.bd", role: "Finance", action: "period_close", entity: "gl_journals", entityId: "1", ip: "103.92.45.23", at: "2024-01-31T17:00:00" },
];

export const complianceScores = [
  { id: 1, framework: "BTRC Reporting", score: 98, status: "Compliant", lastAudit: "2024-01-15" },
  { id: 2, framework: "NBR Tax Filing", score: 95, status: "Compliant", lastAudit: "2024-01-10" },
  { id: 3, framework: "ICT Act 2006", score: 92, status: "Compliant", lastAudit: "2024-01-20" },
  { id: 4, framework: "Data Privacy", score: 88, status: "Review Required", lastAudit: "2023-12-28" },
];

// Extended customers with more BD-specific data
export const extendedCustomers = [
  { 
    id: "C001", 
    code: "ACME-001",
    name: "ACME Cable Ltd", 
    tier: "Enterprise", 
    status: "Active", 
    revenue: 1250000, 
    region: "Dhaka",
    industry: "Telecommunications",
    monthlyRevenueBdt: 1250000,
    tin: "123456789012",
    nid: "19901234567890",
    docsStatus: "Verified"
  },
  { 
    id: "C002", 
    code: "BNET-002",
    name: "BengalNet ISP", 
    tier: "Premium", 
    status: "Active", 
    revenue: 930000, 
    region: "Chattogram",
    industry: "ISP",
    monthlyRevenueBdt: 930000,
    tin: "234567890123",
    nid: "19851234567891",
    docsStatus: "Verified"
  },
  { 
    id: "C003", 
    code: "GLOB-003",
    name: "GlobalTel", 
    tier: "Enterprise", 
    status: "Active", 
    revenue: 2300000, 
    region: "Sylhet",
    industry: "Carrier",
    monthlyRevenueBdt: 2300000,
    tin: "345678901234",
    nid: "19751234567892",
    docsStatus: "Verified"
  },
  { 
    id: "C004", 
    code: "DELT-004",
    name: "Delta Data Systems", 
    tier: "Standard", 
    status: "Pending", 
    revenue: 280000, 
    region: "Rajshahi",
    industry: "Data Center",
    monthlyRevenueBdt: 280000,
    tin: "456789012345",
    nid: "19951234567893",
    docsStatus: "Under Review"
  },
  { 
    id: "C005", 
    code: "CLOU-005",
    name: "CloudNet Solutions", 
    tier: "Premium", 
    status: "Active", 
    revenue: 670000, 
    region: "Khulna",
    industry: "Cloud Services",
    monthlyRevenueBdt: 670000,
    tin: "567890123456",
    nid: "19881234567894",
    docsStatus: "Verified"
  },
];
