"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LifeBuoy } from "lucide-react";
import { navSections } from "@/lib/nav";
import { approvals, reviews } from "@/lib/data";

const badgeCounts = {
  approval: approvals.filter((a) => a.status === "Pending").length,
  reviews: reviews.filter((r) => r.status === "Pending").length,
};

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`navy-gradient fixed inset-y-0 left-0 z-40 flex w-64 flex-col text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex h-12 w-24 items-center justify-center rounded-xl bg-white px-2 shadow-sm">
              <Image src="/logo-mhdc.png" alt="MHDC Clinic" width={88} height={40} className="h-auto w-full" priority />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-semibold">MHDC Group</span>
              <span className="block text-[11px] text-gold-300">Admin Panel</span>
            </span>
          </Link>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/10 lg:hidden" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">{section.title}</p>
              <ul className="space-y-1">
                {section.items.map(({ href, label, icon: Icon, badgeKey }) => {
                  const active = isActive(href);
                  const count = badgeKey ? badgeCounts[badgeKey] : 0;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                          active ? "gold-gradient font-medium text-white shadow-lg shadow-black/20" : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={18} className={active ? "text-white" : "text-gold-300/80 group-hover:text-gold-300"} />
                        <span className="flex-1">{label}</span>
                        {count > 0 && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/25 text-white" : "bg-brand-red text-white"}`}
                          >
                            {count}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="m-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <LifeBuoy size={16} className="text-gold-300" /> Need help?
          </div>
          <p className="mt-1 text-xs text-white/60">Contact Customer Relation for system support.</p>
          <a
            href="https://mhdc.co.id/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 block rounded-lg bg-white py-2 text-center text-xs font-semibold text-navy-800 hover:bg-gold-50"
          >
            Visit mhdc.co.id
          </a>
        </div>
      </aside>
    </>
  );
}
