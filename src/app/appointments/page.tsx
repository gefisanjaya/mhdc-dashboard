"use client";

import { useState } from "react";
import { Plus, Search, CalendarDays, Clock, ChevronRight, MessageCircle, Globe, PhoneCall, Footprints } from "lucide-react";
import { Avatar, Badge, Button, Card, EmptyState, Field, Modal, PageHeader, Tabs, inputClass, statusTone } from "@/components/ui";
import {
  appointments as initialAppointments,
  branches,
  branchById,
  doctorById,
  doctors,
  patientById,
  patients,
  services,
  type Appointment,
  type AppointmentStatus,
} from "@/lib/data";
import { formatDate } from "@/lib/format";

const tabs = ["Today", "Upcoming", "Past", "All"] as const;
type Tab = (typeof tabs)[number];
const TODAY = "2026-10-20";

const nextStatus: Partial<Record<AppointmentStatus, AppointmentStatus>> = {
  Pending: "Confirmed",
  Confirmed: "Checked In",
  "Checked In": "In Treatment",
  "In Treatment": "Completed",
};

const channelIcon = { WhatsApp: MessageCircle, Website: Globe, "Call Center": PhoneCall, "Walk-in": Footprints };

export default function AppointmentsPage() {
  const [items, setItems] = useState<Appointment[]>(initialAppointments);
  const [tab, setTab] = useState<Tab>("Today");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    branchId: branches[0].id,
    service: services[0].name,
    date: TODAY,
    time: "10:00",
    channel: "Walk-in" as Appointment["channel"],
  });

  const filtered = items
    .filter((a) => {
      const p = patientById(a.patientId);
      const inTab = tab === "All" || (tab === "Today" ? a.date === TODAY : tab === "Upcoming" ? a.date > TODAY : a.date < TODAY);
      return (
        inTab &&
        (status === "all" || a.status === status) &&
        `${p?.name} ${a.service} ${doctorById(a.doctorId)?.name}`.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));

  const todays = items.filter((a) => a.date === TODAY);
  const summary = [
    { label: "Scheduled today", value: todays.length, cls: "bg-navy-800 text-white" },
    { label: "Waiting / In chair", value: todays.filter((a) => a.status === "Checked In" || a.status === "In Treatment").length, cls: "gold-gradient text-white" },
    { label: "Completed", value: todays.filter((a) => a.status === "Completed").length, cls: "bg-white text-navy-800" },
    { label: "Cancelled / No-show", value: todays.filter((a) => a.status === "Cancelled" || a.status === "No Show").length, cls: "bg-white text-brand-red" },
  ];

  const advance = (id: string) =>
    setItems((prev) => prev.map((a) => (a.id === id && nextStatus[a.status] ? { ...a, status: nextStatus[a.status]! } : a)));
  const cancel = (id: string) => setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a)));

  return (
    <>
      <PageHeader
        title="Appointments"
        description="Manage bookings from WhatsApp, website, call center and walk-ins."
        actions={
          <Button variant="gold" icon={Plus} onClick={() => setOpen(true)}>
            New Appointment
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 shadow-sm ring-1 ring-black/5 ${s.cls}`}>
            <p className="text-sm opacity-80">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className={`${inputClass} pl-9 lg:w-60`} />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputClass} w-40`}>
            <option value="all">All status</option>
            {["Pending", "Confirmed", "Checked In", "In Treatment", "Completed", "Cancelled", "No Show"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={CalendarDays} title="No appointments" text="Nothing scheduled for this filter." />
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.map((a) => {
              const p = patientById(a.patientId)!;
              const d = doctorById(a.doctorId)!;
              const ChannelIcon = channelIcon[a.channel];
              const next = nextStatus[a.status];
              return (
                <li key={a.id} className="flex flex-col gap-3 px-5 py-4 hover:bg-gold-50/30 md:flex-row md:items-center">
                  <div className="flex w-28 shrink-0 items-center gap-3 md:flex-col md:items-start md:gap-0">
                    <span className="flex items-center gap-1.5 font-display text-lg font-semibold text-navy-800">
                      <Clock size={15} className="text-gold-500" />
                      {a.time}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(a.date)}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar name={p.name} size={40} />
                    <div className="min-w-0">
                      <p className="font-medium text-ink">{p.name}</p>
                      <p className="truncate text-sm text-gray-500">
                        {a.service} · {d.name}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-gray-400">
                        <ChannelIcon size={12} /> {a.channel} · {branchById(a.branchId)?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={statusTone[a.status]} dot>
                      {a.status}
                    </Badge>
                    {next && (
                      <Button size="sm" variant="outline" onClick={() => advance(a.id)}>
                        {next === "Confirmed" ? "Confirm" : next === "Checked In" ? "Check in" : next === "In Treatment" ? "Start" : "Finish"}
                        <ChevronRight size={14} />
                      </Button>
                    )}
                    {next && (
                      <Button size="sm" variant="danger" onClick={() => cancel(a.id)}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="New Appointment"
        wide
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="gold"
              onClick={() => {
                setItems((prev) => [...prev, { ...form, id: `a${Date.now()}`, status: "Confirmed" }]);
                setOpen(false);
              }}
            >
              Book appointment
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Patient">
            <select value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} className={inputClass}>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.mrn})
                </option>
              ))}
            </select>
          </Field>
          <Field label="Treatment">
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputClass}>
              {services
                .filter((s) => s.active)
                .map((s) => (
                  <option key={s.id}>{s.name}</option>
                ))}
            </select>
          </Field>
          <Field label="Branch">
            <select value={form.branchId} onChange={(e) => setForm({ ...form, branchId: e.target.value })} className={inputClass}>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Doctor">
            <select value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} className={inputClass}>
              {doctors
                .filter((d) => d.status === "Active")
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.specialty}
                  </option>
                ))}
            </select>
          </Field>
          <Field label="Date">
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Time">
            <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Booking channel">
            <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value as Appointment["channel"] })} className={inputClass}>
              {Object.keys(channelIcon).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </Modal>
    </>
  );
}
