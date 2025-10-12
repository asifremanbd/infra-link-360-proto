import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import LoginPage from "@/components/LoginPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Bandwidth from "@/pages/Bandwidth";
import NOC from "@/pages/NOC";
import Customers from "@/pages/Customers";
import Billing from "@/pages/Billing";
import Analytics from "@/pages/Analytics";
import Ledger from "@/pages/Ledger";
import Defaults from "@/pages/Defaults";
import Complaints from "@/pages/Complaints";
import Finance from "@/pages/Finance";
import HR from "@/pages/HR";
import Marketing from "@/pages/Marketing";
import Security from "@/pages/Security";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocalizationProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bandwidth" element={<Bandwidth />} />
                <Route path="noc" element={<NOC />} />
                <Route path="customers" element={<Customers />} />
                <Route path="billing" element={<Billing />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="ledger" element={<Ledger />} />
                <Route path="defaults" element={<Defaults />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="finance" element={<Finance />} />
                <Route path="hr" element={<HR />} />
                <Route path="marketing" element={<Marketing />} />
                <Route path="security" element={<Security />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
