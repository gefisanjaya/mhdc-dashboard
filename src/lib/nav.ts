import {
  LayoutDashboard,
  CalendarDays,
  ClipboardCheck,
  MessageSquareText,
  Stethoscope,
  Users,
  Building2,
  Tags,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon; badgeKey?: "approval" | "reviews" };

export const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Main",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/appointments", label: "Appointments", icon: CalendarDays },
      { href: "/approval", label: "Approval", icon: ClipboardCheck, badgeKey: "approval" },
      { href: "/reviews", label: "Manage Review", icon: MessageSquareText, badgeKey: "reviews" },
    ],
  },
  {
    title: "Clinic",
    items: [
      { href: "/doctors", label: "Doctors", icon: Stethoscope },
      { href: "/patients", label: "Patients", icon: Users },
      { href: "/branches", label: "Branches", icon: Building2 },
      { href: "/services", label: "Services & Pricing", icon: Tags },
    ],
  },
  {
    title: "System",
    items: [{ href: "/settings", label: "Settings", icon: Settings }],
  },
];
