"use client";
import HelpButton from "@/components/Ui/HelpButton";
import Dashboard from "../dashboard";

export default function DashboardLayout({ children }) {
  return <Dashboard>{children}<HelpButton/></Dashboard>;
}
