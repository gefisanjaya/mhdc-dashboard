"use client";

import { useState } from "react";
import { MapPin, Phone, Armchair, Users, Star, Building2 } from "lucide-react";
import { Badge, Card, CardHeader, PageHeader, Tabs, statusTone } from "@/components/ui";
import { HorizontalBarChart } from "@/components/charts";
import { branches, doctors } from "@/lib/data";
import { compactRupiah } from "@/lib/format";

const tabs = ["All", "MHDC Clinic", "Medikids"] as const;

export default function BranchesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = branches.filter((b) => tab === "All" || b.brand === tab);
  const ranked = [...list].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);

  return (
    <>
      <PageHeader title="Branches" description="MHDC Clinic & Medikids locations across Jabodetabek, Bandung, Surabaya, Semarang, Makassar and more." />

      <div className="mb-4">
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:col-span-3">
          {list.map((b) => (
            <Card key={b.id} className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${
                      b.brand === "Medikids" ? "gold-gradient" : "bg-navy-800"
                    }`}
                  >
                    <Building2 size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-navy-800">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.city}</p>
                  </div>
                </div>
                <Badge tone={statusTone[b.status]} dot>
                  {b.status}
                </Badge>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <p className="flex items-start gap-1.5">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-gold-500" /> {b.address}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone size={13} className="text-gold-500" /> {b.phone}
                </p>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 rounded-xl bg-surface p-2.5 text-center text-xs">
                <div>
                  <p className="font-semibold text-navy-800">{compactRupiah(b.monthlyRevenue)}</p>
                  <p className="text-[10px] text-gray-500">revenue</p>
                </div>
                <div>
                  <p className="flex items-center justify-center gap-1 font-semibold text-navy-800">
                    <Users size={11} />
                    {b.patientsThisMonth}
                  </p>
                  <p className="text-[10px] text-gray-500">patients</p>
                </div>
                <div>
                  <p className="flex items-center justify-center gap-1 font-semibold text-navy-800">
                    <Armchair size={11} />
                    {b.chairs}
                  </p>
                  <p className="text-[10px] text-gray-500">chairs</p>
                </div>
                <div>
                  <p className="flex items-center justify-center gap-1 font-semibold text-navy-800">
                    <Star size={11} className="fill-gold-400 text-gold-400" />
                    {b.rating}
                  </p>
                  <p className="text-[10px] text-gray-500">{doctors.filter((d) => d.branchId === b.id).length} doctors</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="h-fit xl:col-span-2">
          <CardHeader title="Revenue Ranking" subtitle="This month" />
          <div className="px-3 pb-4">
            <HorizontalBarChart data={ranked} dataKey="monthlyRevenue" nameKey="name" />
          </div>
        </Card>
      </div>
    </>
  );
}
