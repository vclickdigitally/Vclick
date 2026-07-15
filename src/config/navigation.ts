import { ROUTES } from "../constants/routes";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Image, 
  Search, 
  Users, 
  Settings 
} from "lucide-react";

export const publicNavLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#projects" },
  { label: "Process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  { label: "FAQ", href: "/#faq" },
];

export const adminSidebarLinks = [
  { label: "Dashboard", href: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard, disabled: false },
  { label: "Pages", href: ROUTES.ADMIN.PAGES, icon: FileText, disabled: true },
  { label: "Blogs", href: ROUTES.ADMIN.BLOGS, icon: BookOpen, disabled: true },
  { label: "Media Library", href: ROUTES.ADMIN.MEDIA, icon: Image, disabled: true },
  { label: "SEO Center", href: ROUTES.ADMIN.SEO, icon: Search, disabled: true },
  { label: "Users", href: ROUTES.ADMIN.USERS, icon: Users, disabled: true },
  { label: "Settings", href: ROUTES.ADMIN.SETTINGS, icon: Settings, disabled: true },
];
