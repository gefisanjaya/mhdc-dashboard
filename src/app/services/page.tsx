"use client";

import { useState } from "react";
import { Plus, Search, Pencil, Timer, Percent } from "lucide-react";
import { Badge, Button, Card, Field, Modal, PageHeader, Tabs, inputClass } from "@/components/ui";
import { services as initialServices, type Service, type ServiceCategory } from "@/lib/data";
import { rupiah } from "@/lib/format";

const tabs = ["All", "Gigi Anak", "Gigi Dewasa", "Vaksinasi", "Tumbuh Kembang"] as const;
type Tab = (typeof tabs)[number];

const emptyService: Service = { id: "", name: "", category: "Gigi Dewasa", priceFrom: 0, duration: 30, active: true };

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>(initialServices);
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Service | null>(null);

  const filtered = items.filter((s) => (tab === "All" || s.category === tab) && s.name.toLowerCase().includes(query.toLowerCase()));
  const counts = Object.fromEntries(tabs.map((t) => [t, t === "All" ? items.length : items.filter((s) => s.category === t).length])) as Record<Tab, number>;

  const save = () => {
    if (!editing) return;
    setItems((prev) => (editing.id ? prev.map((s) => (s.id === editing.id ? editing : s)) : [...prev, { ...editing, id: `s${Date.now()}` }]));
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Services & Pricing"
        description="Treatment catalogue and pricelist shown to patients. Prices vary with case complexity."
        actions={
          <Button variant="gold" icon={Plus} onClick={() => setEditing(emptyService)}>
            Add Service
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs tabs={tabs} value={tab} onChange={setTab} counts={counts} />
        <div className="relative">
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search service…" className={`${inputClass} pl-9 lg:w-64`} />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase">
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-3 py-3 font-medium">Category</th>
                <th className="px-3 py-3 font-medium">Price</th>
                <th className="px-3 py-3 font-medium">Duration</th>
                <th className="px-3 py-3 font-medium">Promo</th>
                <th className="px-3 py-3 font-medium">Active</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gold-50/40">
                  <td className="px-5 py-3 font-medium text-ink">{s.name}</td>
                  <td className="px-3 py-3">
                    <Badge tone={s.category === "Gigi Anak" ? "gold" : s.category === "Gigi Dewasa" ? "navy" : s.category === "Vaksinasi" ? "teal" : "blue"}>
                      {s.category}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 font-medium text-navy-800">
                    {rupiah(s.priceFrom)}
                    {s.priceTo && <span className="text-gray-400"> – {rupiah(s.priceTo)}</span>}
                  </td>
                  <td className="px-3 py-3 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Timer size={13} className="text-gold-500" /> {s.duration} min
                    </span>
                  </td>
                  <td className="px-3 py-3">{s.promo ? <Badge tone="red">-{s.promo}%</Badge> : <span className="text-gray-300">—</span>}</td>
                  <td className="px-3 py-3">
                    <button
                      onClick={() => setItems((prev) => prev.map((x) => (x.id === s.id ? { ...x, active: !x.active } : x)))}
                      className={`relative h-5 w-9 rounded-full transition ${s.active ? "bg-navy-800" : "bg-gray-200"}`}
                      aria-label="Toggle active"
                    >
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${s.active ? "left-4.5" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button size="sm" variant="ghost" icon={Pencil} onClick={() => setEditing(s)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit Service" : "Add Service"}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={save} disabled={!editing?.name.trim() || !editing?.priceFrom}>
              Save
            </Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Service name">
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputClass} />
              </Field>
            </div>
            <Field label="Category">
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value as ServiceCategory })}
                className={inputClass}
              >
                {tabs.slice(1).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Duration (minutes)">
              <input type="number" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: Number(e.target.value) })} className={inputClass} />
            </Field>
            <Field label="Price from (Rp)">
              <input type="number" value={editing.priceFrom} onChange={(e) => setEditing({ ...editing, priceFrom: Number(e.target.value) })} className={inputClass} />
            </Field>
            <Field label="Price to (Rp, optional)">
              <input
                type="number"
                value={editing.priceTo ?? ""}
                onChange={(e) => setEditing({ ...editing, priceTo: e.target.value ? Number(e.target.value) : undefined })}
                className={inputClass}
              />
            </Field>
            <Field label="Promo discount (%)">
              <div className="relative">
                <input
                  type="number"
                  value={editing.promo ?? ""}
                  onChange={(e) => setEditing({ ...editing, promo: e.target.value ? Number(e.target.value) : undefined })}
                  className={`${inputClass} pr-8`}
                />
                <Percent size={14} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
              </div>
            </Field>
          </div>
        )}
      </Modal>
    </>
  );
}
