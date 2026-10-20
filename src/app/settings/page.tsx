"use client";

import Image from "next/image";
import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { Avatar, Badge, Button, Card, CardHeader, Field, PageHeader, inputClass } from "@/components/ui";

const team = [
  { name: "Admin Pusat", email: "admin@mhdc.co.id", role: "Super Admin" },
  { name: "Rina Customer Relation", email: "cr@mhdc.co.id", role: "Customer Relation" },
  { name: "Dodi Branch Manager", email: "bm.kemang@mhdc.co.id", role: "Branch Manager" },
  { name: "Sari Kasir", email: "kasir.bsd@mhdc.co.id", role: "Cashier" },
];

const notificationPrefs = [
  { key: "approval", label: "New approval request", desc: "Email & in-app when a branch submits a request" },
  { key: "review", label: "New patient review", desc: "Notify when a review needs moderation" },
  { key: "lowRating", label: "Low rating alert (≤ 2 stars)", desc: "Send WhatsApp alert to the branch manager" },
  { key: "reminder", label: "Appointment reminder to patients", desc: "WhatsApp reminder H-1 before the visit" },
];

export default function SettingsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ approval: true, review: true, lowRating: true, reminder: false });
  const [saved, setSaved] = useState(false);

  return (
    <>
      <PageHeader
        title="Settings"
        description="Clinic profile, team access and notification preferences."
        actions={
          <Button
            variant="gold"
            icon={Save}
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved ? "Saved!" : "Save changes"}
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Clinic Profile" subtitle="Shown on invoices and patient communications" />
          <div className="grid gap-4 px-5 pb-5 sm:grid-cols-2">
            <div className="flex items-center gap-4 sm:col-span-2">
              <div className="flex h-20 w-36 items-center justify-center rounded-xl border border-gray-200 bg-white p-2">
                <Image src="/logo-mhdc-group.webp" alt="MHDC Group" width={140} height={64} className="h-auto w-full" />
              </div>
              <Button variant="outline" size="sm" icon={Upload}>
                Change logo
              </Button>
            </div>
            <Field label="Company name">
              <input defaultValue="CV Kelola MHDC" className={inputClass} />
            </Field>
            <Field label="Brand">
              <input defaultValue="MHDC Group — An Answer for Better Life" className={inputClass} />
            </Field>
            <Field label="Customer Relation WhatsApp">
              <input defaultValue="0811-1000-1000" className={inputClass} />
            </Field>
            <Field label="Email">
              <input defaultValue="cr@mhdc.co.id" className={inputClass} />
            </Field>
            <Field label="Website">
              <input defaultValue="https://mhdc.co.id" className={inputClass} />
            </Field>
            <Field label="Max branch discount without approval (%)">
              <input type="number" defaultValue={15} className={inputClass} />
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader title="Notifications" />
          <ul className="space-y-4 px-5 pb-5">
            {notificationPrefs.map((n) => (
              <li key={n.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-ink">{n.label}</p>
                  <p className="text-xs text-gray-500">{n.desc}</p>
                </div>
                <button
                  onClick={() => setPrefs((p) => ({ ...p, [n.key]: !p[n.key] }))}
                  className={`relative mt-1 h-5 w-9 shrink-0 rounded-full transition ${prefs[n.key] ? "bg-navy-800" : "bg-gray-200"}`}
                  aria-label={n.label}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${prefs[n.key] ? "left-4.5" : "left-0.5"}`} />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader title="Team & Roles" subtitle="Who can access this dashboard" />
          <ul className="divide-y divide-gray-100 px-5 pb-3">
            {team.map((t) => (
              <li key={t.email} className="flex items-center gap-3 py-3">
                <Avatar name={t.name} size={36} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.email}</p>
                </div>
                <Badge tone={t.role === "Super Admin" ? "gold" : "navy"}>{t.role}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
