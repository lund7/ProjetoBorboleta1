"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import AccessibilityBar from "@/components/AccessibilityBar";
import Sidebar from "@/components/Sidebar";
import ChatPanel from "@/components/ChatPanel";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMap = pathname === "/mapa";
  const showChat = pathname === "/" || pathname === "/cuidador";
  const layoutClass = `app-layout${isMap ? " map-layout" : ""}${pathname === "/cuidador" ? " caregiver-layout" : ""}`;
  return <div className={layoutClass}>
    <AccessibilityBar />
    <Sidebar />
    <main className="page-content">{children}</main>
    {showChat && <ChatPanel mode={pathname === "/cuidador" ? "caregiver" : "medication"} />}
  </div>;
}
