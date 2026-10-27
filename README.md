# infra-link-360-proto

Build an interactive MVP prototype of InfraLink 360 that visually and functionally represents:

Core navigation (modular dashboard)

Real-time data visualization

Functional mock APIs and sample datasets

Integration placeholders between network, customer, billing, and finance modules

Role-based access simulation (Admin, NOC, Finance, HR)

🧱 Modules for MVP Scope (Phase-2 Prototype Reference in Agreement)

Focus on functional demonstration of these priority modules:

Bandwidth & Submarine Cable Traffic Management

Real-time bandwidth charts, capacity forecasts, utilization alerts.

Network Operations Center (NOC) Monitoring

Unified dashboard with multi-layer topology view and SLA alarms.

Customer Database Management

Hierarchical customer records, subscription lifecycle tracking, and KYC preview.

Invoicing & Billing

Automated billing view, tax compliance indicator, payment reminders.

Analytics & Reporting

Unified executive dashboard: bandwidth utilization, SLA, and revenue KPIs.

Include placeholders for other modules for visual continuity (e.g., HR, Complaint, Security, etc.).

🧠 Functional Requirements

User roles: Admin, NOC Engineer, Finance Manager, HR Officer.

Dashboards: Central BI view integrating KPIs from 3+ modules.

Mock Data: JSON or SQLite dataset for bandwidth logs, invoices, customers, and SLA events.

Automation Simulation:

Alerts for >80% utilization

Auto-generated billing cycles

Predictive analytics placeholder for capacity forecasting

UI Style: Professional enterprise UI (light theme, responsive grid, Tailwind + React).

UX Flow: Login → Dashboard → Module → Detail View → Export Report (PDF/Excel).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://infra-link-360-proto.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/aa3a663b-114a-4d0e-bfb7-cd05ca60aad9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
