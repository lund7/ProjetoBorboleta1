"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Medicação" },
    { href: "/mapa", label: "Navegação / UBS" },
    { href: "/cuidador", label: "Cuidador" },
  ];
  return <nav className="sidebar">
    <h1>ElderCare</h1>
    <p><strong>Bem-vindo de volta!</strong><br />Extensão Universitária em Ação</p>
    <ul><li>{links.map(link => <Link href={link.href} key={link.href}>
      <button type="button" className={pathname === link.href ? "active" : ""} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</button>
    </Link>)}</li></ul>
  </nav>;
}
