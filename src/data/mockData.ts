// Mock data for the MVP prototype

export const bandwidthData = [
  { time: "00:00", utilization: 45, capacity: 100, threshold: 80 },
  { time: "04:00", utilization: 38, capacity: 100, threshold: 80 },
  { time: "08:00", utilization: 72, capacity: 100, threshold: 80 },
  { time: "12:00", utilization: 85, capacity: 100, threshold: 80 },
  { time: "16:00", utilization: 91, capacity: 100, threshold: 80 },
  { time: "20:00", utilization: 68, capacity: 100, threshold: 80 },
  { time: "23:59", utilization: 52, capacity: 100, threshold: 80 },
];

export const slaEvents = [
  { id: 1, severity: "critical", message: "Bandwidth utilization exceeded 90% on Cable-A", time: "2 min ago", module: "Bandwidth" },
  { id: 2, severity: "warning", message: "Customer payment overdue: ACME Corp", time: "15 min ago", module: "Billing" },
  { id: 3, severity: "info", message: "Scheduled maintenance: Router-03", time: "1 hour ago", module: "NOC" },
  { id: 4, severity: "warning", message: "SLA breach approaching for Client XYZ", time: "2 hours ago", module: "Network" },
];

export const customers = [
  { id: "C001", name: "ACME Corporation", tier: "Enterprise", status: "Active", revenue: 125000, region: "North America" },
  { id: "C002", name: "TechStart Inc", tier: "Premium", status: "Active", revenue: 45000, region: "Europe" },
  { id: "C003", name: "Global Telecom", tier: "Enterprise", status: "Pending", revenue: 230000, region: "Asia Pacific" },
  { id: "C004", name: "DataFlow Systems", tier: "Standard", status: "Active", revenue: 28000, region: "Europe" },
  { id: "C005", name: "CloudNet Solutions", tier: "Premium", status: "Active", revenue: 67000, region: "North America" },
];

export const invoices = [
  { id: "INV-2024-001", customer: "ACME Corporation", amount: 12500, status: "Paid", dueDate: "2024-01-15", period: "Jan 2024" },
  { id: "INV-2024-002", customer: "TechStart Inc", amount: 4500, status: "Pending", dueDate: "2024-01-20", period: "Jan 2024" },
  { id: "INV-2024-003", customer: "Global Telecom", amount: 23000, status: "Overdue", dueDate: "2024-01-10", period: "Jan 2024" },
  { id: "INV-2024-004", customer: "DataFlow Systems", amount: 2800, status: "Paid", dueDate: "2024-01-18", period: "Jan 2024" },
  { id: "INV-2024-005", customer: "CloudNet Solutions", amount: 6700, status: "Pending", dueDate: "2024-01-25", period: "Jan 2024" },
];

export const networkTopology = [
  { id: "N1", name: "Core Router 01", type: "router", status: "Operational", load: 45, location: "DC-NY" },
  { id: "N2", name: "Core Router 02", type: "router", status: "Operational", load: 62, location: "DC-LA" },
  { id: "N3", name: "Cable-A (Atlantic)", type: "cable", status: "Operational", load: 85, location: "Submarine" },
  { id: "N4", name: "Cable-B (Pacific)", type: "cable", status: "Warning", load: 91, location: "Submarine" },
  { id: "N5", name: "Edge Switch 01", type: "switch", status: "Operational", load: 38, location: "DC-NY" },
  { id: "N6", name: "Edge Switch 02", type: "switch", status: "Operational", load: 42, location: "DC-LA" },
];

export const kpiMetrics = {
  totalRevenue: 495000,
  activeCustomers: 127,
  avgBandwidthUtil: 67.3,
  slaCompliance: 98.5,
  openTickets: 12,
  pendingInvoices: 8,
  networkUptime: 99.97,
  criticalAlerts: 3,
};

export const revenueByRegion = [
  { region: "North America", revenue: 192000, customers: 48 },
  { region: "Europe", revenue: 145000, customers: 35 },
  { region: "Asia Pacific", revenue: 158000, customers: 44 },
];

export const bandwidthForecast = [
  { month: "Jan", actual: 67, forecast: 65 },
  { month: "Feb", actual: 72, forecast: 70 },
  { month: "Mar", actual: null, forecast: 76 },
  { month: "Apr", actual: null, forecast: 79 },
  { month: "May", actual: null, forecast: 83 },
  { month: "Jun", actual: null, forecast: 87 },
];
