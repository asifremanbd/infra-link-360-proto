import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    bandwidth: "Bandwidth & Cables",
    noc: "NOC Monitoring",
    customers: "Customer Database",
    billing: "Billing & Invoicing",
    ledger: "Ledger Management",
    defaults: "Payment Defaults",
    complaints: "Complaints",
    finance: "Finance & Accounting",
    hr: "HR & Payroll",
    marketing: "Marketing & Sales",
    analytics: "Analytics & Reports",
    security: "Security & Compliance",
    
    // Common
    search: "Search modules, customers, invoices...",
    logout: "Logout",
    export: "Export",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    total: "Total",
    status: "Status",
    actions: "Actions",
    
    // Status
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    paid: "Paid",
    overdue: "Overdue",
    resolved: "Resolved",
    open: "Open",
    
    // Dashboard
    welcomeBack: "Welcome back",
    totalRevenue: "Total Revenue",
    activeCustomers: "Active Customers",
    bandwidthUtilization: "Bandwidth Utilization",
    pendingInvoices: "Pending Invoices",
    recentAlerts: "Recent Alerts",
    
    // Regulatory
    btrcCompliance: "BTRC Compliance",
    nbrReporting: "NBR Reporting",
    regulatoryReports: "Regulatory Reports (BTRC/NBR)",
    generateBTRCReport: "Generate BTRC Report",
    generateNBRXML: "Generate NBR XML",
    ictAuditLog: "ICT Act Audit Log",
    
    // Regions
    dhaka: "Dhaka",
    chattogram: "Chattogram",
    sylhet: "Sylhet",
    rajshahi: "Rajshahi",
    khulna: "Khulna",
  },
  bn: {
    // Navigation
    dashboard: "ড্যাশবোর্ড",
    bandwidth: "ব্যান্ডউইথ ও ক্যাবল",
    noc: "NOC মনিটরিং",
    customers: "গ্রাহক তথ্য",
    billing: "বিলিং ও ইনভয়েসিং",
    ledger: "লেজার ব্যবস্থাপনা",
    defaults: "পেমেন্ট ডিফল্ট",
    complaints: "অভিযোগ",
    finance: "অর্থ ও হিসাব",
    hr: "এইচআর ও বেতন",
    marketing: "বিপণন ও বিক্রয়",
    analytics: "বিশ্লেষণ ও রিপোর্ট",
    security: "নিরাপত্তা ও সম্মতি",
    
    // Common
    search: "অনুসন্ধান করুন...",
    logout: "লগআউট",
    export: "রপ্তানি",
    view: "দেখুন",
    edit: "সম্পাদনা",
    delete: "মুছুন",
    save: "সংরক্ষণ",
    cancel: "বাতিল",
    total: "মোট",
    status: "অবস্থা",
    actions: "কার্যক্রম",
    
    // Status
    active: "সক্রিয়",
    inactive: "নিষ্ক্রিয়",
    pending: "বিচারাধীন",
    paid: "পরিশোধিত",
    overdue: "মেয়াদোত্তীর্ণ",
    resolved: "সমাধান হয়েছে",
    open: "খোলা",
    
    // Dashboard
    welcomeBack: "স্বাগতম",
    totalRevenue: "মোট আয়",
    activeCustomers: "সক্রিয় গ্রাহক",
    bandwidthUtilization: "ব্যান্ডউইথ ব্যবহার",
    pendingInvoices: "অপেক্ষমাণ চালান",
    recentAlerts: "সাম্প্রতিক সতর্কতা",
    
    // Regulatory
    btrcCompliance: "BTRC সম্মতি",
    nbrReporting: "NBR রিপোর্টিং",
    regulatoryReports: "নিয়ন্ত্রক রিপোর্ট (BTRC/NBR)",
    generateBTRCReport: "BTRC রিপোর্ট তৈরি করুন",
    generateNBRXML: "NBR XML তৈরি করুন",
    ictAuditLog: "ICT আইন অডিট লগ",
    
    // Regions
    dhaka: "ঢাকা",
    chattogram: "চট্টগ্রাম",
    sylhet: "সিলেট",
    rajshahi: "রাজশাহী",
    khulna: "খুলনা",
  }
};

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Auto-detect browser locale
    const stored = localStorage.getItem('language') as Language;
    if (stored) return stored;
    
    const browserLang = navigator.language.toLowerCase();
    return browserLang.includes('bn') ? 'bn' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    
    // Add Bengali font class to body when in Bangla mode
    if (language === 'bn') {
      document.body.classList.add('font-bengali');
    } else {
      document.body.classList.remove('font-bengali');
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
}
