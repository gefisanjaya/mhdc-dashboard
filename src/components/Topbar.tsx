"use client";

import { Bell, Menu, Search, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import { branches } from "@/lib/data";
import { Avatar } from "./ui";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const [branch, setBranch] = useState("All Branches");

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-black/5 bg-white/85 px-4 backdrop-blur md:px-6 lg:px-8">
      <button onClick={onMenu} className="rounded-lg p-2 text-navy-800 hover:bg-navy-50 lg:hidden" aria-label="Open menu">
        <Menu size={20} />
      </button>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search patient, doctor, appointment…"
          className="w-full rounded-xl border border-gray-200 bg-surface py-2 pr-3 pl-9 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <label className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm sm:flex">
          <MapPin size={15} className="text-gold-600" />
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className="bg-transparent text-navy-800 outline-none">
            <option>All Branches</option>
            {branches.map((b) => (
              <option key={b.id}>{b.name}</option>
            ))}
          </select>
        </label>

        <button className="relative rounded-xl p-2 text-navy-800 hover:bg-navy-50" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-red ring-2 ring-white" />
        </button>

        <button className="flex items-center gap-2 rounded-xl py-1 pr-2 pl-1 hover:bg-navy-50">
          <Avatar name="Admin Pusat" size={34} />
          <span className="hidden text-left leading-tight md:block">
            <span className="block text-sm font-medium text-navy-800">Admin Pusat</span>
            <span className="block text-[11px] text-gray-500">Super Admin</span>
          </span>
          <ChevronDown size={16} className="hidden text-gray-400 md:block" />
        </button>
      </div>
    </header>
  );
}
