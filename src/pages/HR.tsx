import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { employees, payrollRuns } from "@/data/extendedMockData";
import { formatBDT } from "@/lib/bdtUtils";
import { formatBDDate } from "@/lib/dateUtils";
import { Users, DollarSign, FileText, Download, Clock } from "lucide-react";

export default function HR() {
  const totalEmployees = employees.filter(e => e.status === "Active").length;
  const totalPayroll = employees
    .filter(e => e.status === "Active")
    .reduce((sum, e) => sum + e.baseSalaryBdt, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">HR & Payroll</h1>
        <p className="text-muted-foreground">Employee management, attendance tracking, and payroll processing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Active Employees</span>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalEmployees}</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Monthly Payroll</span>
            <DollarSign className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{formatBDT(totalPayroll)}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-info/10 to-transparent border-info/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Departments</span>
            <Users className="w-5 h-5 text-info" />
          </div>
          <p className="text-3xl font-bold text-foreground">6</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/10 to-transparent border-warning/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Avg. Tenure</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">2.8 yrs</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Employee Master</h3>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Code</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Department</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Grade</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Join Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Base Salary</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-mono">{employee.code}</td>
                  <td className="py-3 px-4 text-sm font-medium">{employee.name}</td>
                  <td className="py-3 px-4 text-sm">{employee.dept}</td>
                  <td className="py-3 px-4 text-sm">{employee.grade}</td>
                  <td className="py-3 px-4 text-sm">{formatBDDate(employee.joinDate)}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold">{formatBDT(employee.baseSalaryBdt)}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                      {employee.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payroll Runs</h3>
          <div className="space-y-3">
            {payrollRuns.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:bg-muted/30 transition-all"
              >
                <div>
                  <p className="font-semibold mb-1">Payroll - {run.month}</p>
                  <p className="text-sm text-muted-foreground">{formatBDDate(run.runAt, true)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={run.posted ? "default" : "warning"}>
                    {run.posted ? "Posted" : "Draft"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="default" className="w-full mt-4">
            <DollarSign className="w-4 h-4 mr-2" />
            Run Payroll
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department Distribution</h3>
          <div className="space-y-3">
            {["NOC", "Finance", "Sales", "HR", "Marketing", "Compliance"].map(dept => {
              const deptEmployees = employees.filter(e => e.dept === dept && e.status === "Active");
              const count = deptEmployees.length;
              const totalSalary = deptEmployees.reduce((sum, e) => sum + e.baseSalaryBdt, 0);
              const percentage = (count / totalEmployees) * 100;
              
              return (
                <div key={dept} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{dept}</span>
                    <span className="text-sm text-muted-foreground">{count} employees</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Total Salary:</span>
                    <span className="font-semibold">{formatBDT(totalSalary)}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reports & Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Download className="w-6 h-6" />
            <span>Payslips</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Download className="w-6 h-6" />
            <span>WHT Schedule</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Download className="w-6 h-6" />
            <span>Attendance Report</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
