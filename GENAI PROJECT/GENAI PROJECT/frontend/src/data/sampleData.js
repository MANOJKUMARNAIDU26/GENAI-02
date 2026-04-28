// ============================================================
// LexiClause AI — Sample Data for Demo
// ============================================================

export const sampleClauses = [
  { id: 1, title: "Standard Confidentiality", category: "NDA", type: "Confidentiality", risk: "Low", jurisdiction: "US - Federal", usageCount: 142, lastUpdated: "2025-04-15", text: "The receiving party shall keep all confidential information strictly confidential and shall not disclose it to any third party without prior written consent of the disclosing party." },
  { id: 2, title: "Mutual Non-Disclosure", category: "NDA", type: "Confidentiality", risk: "Low", jurisdiction: "US - California", usageCount: 98, lastUpdated: "2025-04-10", text: "Both parties agree to maintain the confidentiality of all proprietary information exchanged during the term of this agreement and for a period of three (3) years thereafter." },
  { id: 3, title: "30-Day Termination", category: "Employment", type: "Termination", risk: "Medium", jurisdiction: "US - Federal", usageCount: 87, lastUpdated: "2025-04-12", text: "Either party may terminate this agreement upon 30 days written notice to the other party, provided all outstanding obligations are fulfilled prior to termination." },
  { id: 4, title: "Immediate Termination for Cause", category: "Employment", type: "Termination", risk: "High", jurisdiction: "US - New York", usageCount: 63, lastUpdated: "2025-03-28", text: "This agreement may be terminated immediately by either party upon material breach by the other party, including but not limited to fraud, willful misconduct, or insolvency." },
  { id: 5, title: "Limitation of Liability", category: "Vendor", type: "Liability", risk: "Medium", jurisdiction: "US - Federal", usageCount: 119, lastUpdated: "2025-04-18", text: "In no event shall either party be liable for indirect, incidental, special, consequential, or punitive damages, regardless of the cause of action or the theory of liability." },
  { id: 6, title: "Uncapped Liability", category: "Vendor", type: "Liability", risk: "High", jurisdiction: "UK", usageCount: 34, lastUpdated: "2025-03-15", text: "Neither party excludes or limits its liability for death or personal injury caused by negligence, fraud, or fraudulent misrepresentation." },
  { id: 7, title: "Standard Indemnification", category: "Partnership", type: "Indemnity", risk: "Medium", jurisdiction: "US - Delaware", usageCount: 76, lastUpdated: "2025-04-05", text: "Each party agrees to indemnify and hold harmless the other party from any claims, damages, or expenses arising from breach of this agreement or negligent acts." },
  { id: 8, title: "Non-Compete Restriction", category: "Employment", type: "Non-Compete", risk: "High", jurisdiction: "US - California", usageCount: 54, lastUpdated: "2025-03-20", text: "The employee shall not engage in any competing business or accept employment with a competitor during the term of this agreement and for twelve (12) months thereafter." },
  { id: 9, title: "Governing Law - California", category: "Vendor", type: "Governing Law", risk: "Low", jurisdiction: "US - California", usageCount: 165, lastUpdated: "2025-04-20", text: "This agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles." },
  { id: 10, title: "Data Protection Clause", category: "Data Privacy", type: "Data Privacy", risk: "Medium", jurisdiction: "EU - GDPR", usageCount: 91, lastUpdated: "2025-04-14", text: "The processor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk of processing personal data." },
  { id: 11, title: "Force Majeure", category: "Vendor", type: "Force Majeure", risk: "Low", jurisdiction: "US - Federal", usageCount: 72, lastUpdated: "2025-04-08", text: "Neither party shall be liable for failure to perform its obligations if such failure results from circumstances beyond the reasonable control of that party, including natural disasters, war, or pandemic." },
  { id: 12, title: "Intellectual Property Assignment", category: "Employment", type: "IP Rights", risk: "Medium", jurisdiction: "US - Federal", usageCount: 68, lastUpdated: "2025-04-02", text: "All intellectual property created by the employee during the course of employment shall be the exclusive property of the employer, and the employee hereby assigns all rights therein." },
  { id: 13, title: "Dispute Resolution - Arbitration", category: "Partnership", type: "Dispute Resolution", risk: "Low", jurisdiction: "US - Federal", usageCount: 83, lastUpdated: "2025-04-11", text: "Any dispute arising out of or relating to this agreement shall be resolved by binding arbitration administered by the American Arbitration Association in accordance with its rules." },
  { id: 14, title: "Payment Terms - Net 30", category: "Vendor", type: "Payment", risk: "Low", jurisdiction: "US - Federal", usageCount: 156, lastUpdated: "2025-04-19", text: "Payment shall be due within thirty (30) days of receipt of a valid invoice. Late payments shall accrue interest at a rate of 1.5% per month or the maximum rate permitted by law." },
  { id: 15, title: "Lease Termination Notice", category: "Lease", type: "Termination", risk: "Medium", jurisdiction: "US - New York", usageCount: 45, lastUpdated: "2025-03-25", text: "The tenant shall provide the landlord with not less than sixty (60) days written notice prior to vacating the premises, failing which the tenant shall be liable for rent during the notice period." },
  { id: 16, title: "Warranty Disclaimer", category: "Vendor", type: "Warranty", risk: "Medium", jurisdiction: "US - Federal", usageCount: 92, lastUpdated: "2025-04-16", text: "THE SERVICES ARE PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE." },
  { id: 17, title: "Anti-Bribery Compliance", category: "Partnership", type: "Compliance", risk: "High", jurisdiction: "International", usageCount: 41, lastUpdated: "2025-03-30", text: "Each party represents and warrants that it has not and will not offer, pay, or authorize payment of any bribe, kickback, or other corrupt payment in connection with this agreement." },
  { id: 18, title: "Data Breach Notification", category: "Data Privacy", type: "Data Privacy", risk: "High", jurisdiction: "EU - GDPR", usageCount: 67, lastUpdated: "2025-04-13", text: "In the event of a personal data breach, the processor shall notify the controller without undue delay and in any event within 72 hours of becoming aware of such breach." },
  { id: 19, title: "Assignment Restriction", category: "Partnership", type: "Assignment", risk: "Low", jurisdiction: "US - Federal", usageCount: 88, lastUpdated: "2025-04-07", text: "Neither party may assign or transfer this agreement or any rights hereunder without the prior written consent of the other party, and any attempted assignment without such consent shall be void." },
  { id: 20, title: "Entire Agreement", category: "NDA", type: "General", risk: "Low", jurisdiction: "US - Federal", usageCount: 174, lastUpdated: "2025-04-21", text: "This agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, and agreements between the parties, whether written or oral." },
];

export const sampleDocuments = [
  { id: 1, name: "Master Services Agreement v3.2", type: "Vendor", format: "PDF", size: "2.4 MB", uploadedBy: "Sarah Chen", uploadDate: "2025-04-18", status: "Indexed", clauses: 12 },
  { id: 2, name: "Employee NDA Template", type: "NDA", format: "DOCX", size: "845 KB", uploadedBy: "James Morrison", uploadDate: "2025-04-15", status: "Indexed", clauses: 6 },
  { id: 3, name: "Vendor Partnership Agreement", type: "Partnership", format: "PDF", size: "1.8 MB", uploadedBy: "Sarah Chen", uploadDate: "2025-04-12", status: "Indexed", clauses: 15 },
  { id: 4, name: "Commercial Lease Agreement", type: "Lease", format: "PDF", size: "3.1 MB", uploadedBy: "Priya Sharma", uploadDate: "2025-04-10", status: "Indexed", clauses: 18 },
  { id: 5, name: "Data Processing Agreement", type: "Data Privacy", format: "DOCX", size: "1.2 MB", uploadedBy: "James Morrison", uploadDate: "2025-04-08", status: "Indexed", clauses: 9 },
  { id: 6, name: "Employment Contract Template", type: "Employment", format: "PDF", size: "956 KB", uploadedBy: "Priya Sharma", uploadDate: "2025-04-05", status: "Indexed", clauses: 14 },
  { id: 7, name: "Software License Agreement", type: "Vendor", format: "TXT", size: "420 KB", uploadedBy: "Sarah Chen", uploadDate: "2025-03-28", status: "Indexed", clauses: 8 },
  { id: 8, name: "Joint Venture MOU", type: "Partnership", format: "PDF", size: "1.5 MB", uploadedBy: "James Morrison", uploadDate: "2025-03-20", status: "Pending Review", clauses: 11 },
];

export const sampleDrafts = [
  { id: 1, title: "NDA - TechCorp & DataFlow Inc.", type: "NDA", createdDate: "2025-04-20", status: "Final", parties: "TechCorp LLC, DataFlow Inc.", duration: "24 months", jurisdiction: "California" },
  { id: 2, title: "Vendor Agreement - CloudServe", type: "Vendor", createdDate: "2025-04-18", status: "Draft", parties: "Acme Corp, CloudServe Ltd.", duration: "12 months", jurisdiction: "Delaware" },
  { id: 3, title: "Employment Contract - Sr. Engineer", type: "Employment", createdDate: "2025-04-15", status: "Under Review", parties: "InnoTech Inc., John Smith", duration: "36 months", jurisdiction: "New York" },
  { id: 4, title: "Partnership MOU - Global Logistics", type: "Partnership", createdDate: "2025-04-12", status: "Final", parties: "FastShip LLC, Global Logistics Co.", duration: "60 months", jurisdiction: "Federal" },
  { id: 5, title: "Data Privacy Agreement - EU Ops", type: "Data Privacy", createdDate: "2025-04-10", status: "Draft", parties: "EuroData GmbH, Acme Corp", duration: "Indefinite", jurisdiction: "EU - GDPR" },
];

export const sampleUsers = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@lexiclause.ai", role: "Admin", department: "Legal", status: "Active", lastActive: "2025-04-21 09:30 AM", avatar: "SC" },
  { id: 2, name: "James Morrison", email: "james.m@lexiclause.ai", role: "Legal Associate", department: "Compliance", status: "Active", lastActive: "2025-04-21 10:15 AM", avatar: "JM" },
  { id: 3, name: "Priya Sharma", email: "priya.s@lexiclause.ai", role: "Compliance Officer", department: "Legal", status: "Active", lastActive: "2025-04-20 04:45 PM", avatar: "PS" },
  { id: 4, name: "Michael Torres", email: "m.torres@lexiclause.ai", role: "Legal Associate", department: "Contracts", status: "Inactive", lastActive: "2025-04-15 02:00 PM", avatar: "MT" },
  { id: 5, name: "Emily Watson", email: "e.watson@lexiclause.ai", role: "Legal Associate", department: "Legal", status: "Active", lastActive: "2025-04-21 08:00 AM", avatar: "EW" },
];

export const recentActivity = [
  { id: 1, user: "Sarah Chen", action: "Generated draft", target: "NDA - TechCorp & DataFlow", time: "10 min ago", icon: "file-text" },
  { id: 2, user: "James Morrison", action: "Uploaded document", target: "Employee NDA Template", time: "25 min ago", icon: "upload" },
  { id: 3, user: "Priya Sharma", action: "Ran compliance check", target: "Commercial Lease Agreement", time: "1 hour ago", icon: "shield-check" },
  { id: 4, user: "Sarah Chen", action: "Searched clauses", target: "termination clause vendor", time: "2 hours ago", icon: "search" },
  { id: 5, user: "Emily Watson", action: "Bookmarked clause", target: "Standard Indemnification", time: "3 hours ago", icon: "bookmark" },
  { id: 6, user: "James Morrison", action: "Compared clauses", target: "Liability vs Indemnity", time: "4 hours ago", icon: "git-compare" },
  { id: 7, user: "Priya Sharma", action: "Exported draft as PDF", target: "Partnership MOU", time: "5 hours ago", icon: "download" },
  { id: 8, user: "Sarah Chen", action: "Updated clause library", target: "Force Majeure Clause", time: "6 hours ago", icon: "edit" },
];

export const analyticsData = {
  searchTrends: [
    { month: "Nov", searches: 120 }, { month: "Dec", searches: 185 },
    { month: "Jan", searches: 210 }, { month: "Feb", searches: 245 },
    { month: "Mar", searches: 310 }, { month: "Apr", searches: 380 },
  ],
  draftTrends: [
    { month: "Nov", drafts: 18 }, { month: "Dec", drafts: 24 },
    { month: "Jan", drafts: 32 }, { month: "Feb", drafts: 28 },
    { month: "Mar", drafts: 41 }, { month: "Apr", drafts: 52 },
  ],
  clauseTypeUsage: [
    { name: "Confidentiality", value: 28 }, { name: "Termination", value: 22 },
    { name: "Liability", value: 18 }, { name: "Indemnity", value: 14 },
    { name: "Data Privacy", value: 10 }, { name: "Others", value: 8 },
  ],
  riskDistribution: [
    { name: "Low Risk", value: 45, color: "#22c55e" },
    { name: "Medium Risk", value: 35, color: "#f59e0b" },
    { name: "High Risk", value: 20, color: "#ef4444" },
  ],
  departmentUsage: [
    { dept: "Legal", searches: 180, drafts: 32 },
    { dept: "Compliance", searches: 95, drafts: 15 },
    { dept: "Contracts", searches: 72, drafts: 28 },
    { dept: "HR", searches: 33, drafts: 8 },
  ],
};

export const auditLogs = [
  { id: 1, timestamp: "2025-04-21 10:30:15", user: "Sarah Chen", action: "LOGIN", details: "Successful login from 192.168.1.42", severity: "info" },
  { id: 2, timestamp: "2025-04-21 10:28:05", user: "James Morrison", action: "UPLOAD", details: "Uploaded Employee NDA Template.docx", severity: "info" },
  { id: 3, timestamp: "2025-04-21 09:45:22", user: "System", action: "INDEX", details: "Auto-indexed 6 new clauses from uploaded document", severity: "info" },
  { id: 4, timestamp: "2025-04-21 09:15:00", user: "Priya Sharma", action: "EXPORT", details: "Exported compliance report for Lease Agreement", severity: "info" },
  { id: 5, timestamp: "2025-04-20 16:30:11", user: "Michael Torres", action: "FAILED_LOGIN", details: "Failed login attempt - invalid credentials", severity: "warning" },
  { id: 6, timestamp: "2025-04-20 14:20:33", user: "Sarah Chen", action: "DELETE", details: "Deleted draft: Outdated NDA Template v1", severity: "warning" },
  { id: 7, timestamp: "2025-04-20 11:05:44", user: "System", action: "BACKUP", details: "Automated daily backup completed successfully", severity: "info" },
  { id: 8, timestamp: "2025-04-19 09:00:00", user: "System", action: "SECURITY_SCAN", details: "Weekly security scan completed - no threats detected", severity: "info" },
];

export const agreementTypes = [
  "Non-Disclosure Agreement (NDA)",
  "Master Services Agreement",
  "Employment Contract",
  "Vendor Agreement",
  "Partnership Agreement",
  "Software License Agreement",
  "Data Processing Agreement",
  "Commercial Lease Agreement",
  "Joint Venture Agreement",
  "Consulting Agreement",
];

export const jurisdictions = [
  "US - Federal", "US - California", "US - New York", "US - Delaware", "US - Texas",
  "UK", "EU - GDPR", "India", "Singapore", "International",
];

export const documentCategories = ["NDA", "Employment", "Vendor", "Partnership", "Lease", "Data Privacy"];
