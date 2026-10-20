"use client";

import { useState } from "react";
import { Plus, Search, MapPin, Clock, Star, Users, Pencil, Phone, Stethoscope } from "lucide-react";
import { Avatar, Badge, Button, Card, EmptyState, Field, Modal, PageHeader, inputClass, statusTone } from "@/components/ui";
import { branches, branchById, doctors as initialDoctors, specialties, type Doctor, type Specialty } from "@/lib/data";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const emptyDoctor: Doctor = {
  id: "",
  name: "drg. ",
  title: "",
  specialty: "Dokter Gigi Umum",
  branchId: branches[0].id,
  days: ["Mon", "Wed", "Fri"],
  hours: "09:00 – 17:00",
  rating: 0,
  reviews: 0,
  patientsThisMonth: 0,
  experience: 1,
  status: "Active",
  phone: "",
  str: "",
};

export default function DoctorsPage() {
  const [items, setItems] = useState<Doctor[]>(initialDoctors);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All specialties");
  const [branch, setBranch] = useState("All branches");
  const [editing, setEditing] = useState<Doctor | null>(null);

  const filtered = items.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) &&
      (specialty === "All specialties" || d.specialty === specialty) &&
      (branch === "All branches" || d.branchId === branch)
  );

  const save = () => {
    if (!editing) return;
    setItems((prev) =>
      editing.id ? prev.map((d) => (d.id === editing.id ? editing : d)) : [{ ...editing, id: `d${Date.now()}` }, ...prev]
    );
    setEditing(null);
  };

  const set = <K extends keyof Doctor>(key: K, value: Doctor[K]) => setEditing((e) => (e ? { ...e, [key]: value } : e));

  return (
    <>
      <PageHeader
        title="Doctors"
        description={`${items.filter((d) => d.status === "Active").length} active practitioners across ${branches.length} branches.`}
        actions={
          <Button variant="gold" icon={Plus} onClick={() => setEditing(emptyDoctor)}>
            Add Doctor
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-2 md:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search doctor name…" className={`${inputClass} pl-9`} />
        </div>
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={`${inputClass} md:w-60`}>
          <option>All specialties</option>
          {specialties.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} className={`${inputClass} md:w-60`}>
          <option value="All branches">All branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={Stethoscope} title="No doctors found" />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((d) => (
            <Card key={d.id} className="group overflow-hidden">
              <div className="navy-gradient relative h-16">
                <span className="absolute top-3 right-3">
                  <Badge tone={statusTone[d.status]} dot>
                    {d.status}
                  </Badge>
                </span>
              </div>
              <div className="-mt-8 px-5 pb-5">
                <div className="rounded-full bg-white p-1 shadow-sm ring-2 ring-gold-300" style={{ width: "fit-content" }}>
                  <Avatar name={d.name} size={56} />
                </div>
                <h3 className="mt-2 font-semibold text-navy-800">
                  {d.name}
                  {d.title && <span className="text-gold-600">, {d.title}</span>}
                </h3>
                <p className="text-sm text-gray-500">{d.specialty}</p>

                <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                  <p className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-gold-500" /> {branchById(d.branchId)?.name}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock size={13} className="text-gold-500" /> {d.hours}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone size={13} className="text-gold-500" /> {d.phone || "—"}
                  </p>
                </div>

                <div className="mt-3 flex gap-1">
                  {weekDays.map((day) => (
                    <span
                      key={day}
                      className={`flex h-7 flex-1 items-center justify-center rounded-md text-[10px] font-semibold ${
                        d.days.includes(day) ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {day.slice(0, 2)}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-surface p-2.5 text-center">
                  <div>
                    <p className="flex items-center justify-center gap-1 font-semibold text-navy-800">
                      <Star size={12} className="fill-gold-400 text-gold-400" />
                      {d.rating || "—"}
                    </p>
                    <p className="text-[10px] text-gray-500">{d.reviews} reviews</p>
                  </div>
                  <div>
                    <p className="flex items-center justify-center gap-1 font-semibold text-navy-800">
                      <Users size={12} className="text-gold-500" />
                      {d.patientsThisMonth}
                    </p>
                    <p className="text-[10px] text-gray-500">patients/mo</p>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">{d.experience} yr</p>
                    <p className="text-[10px] text-gray-500">experience</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" icon={Pencil} className="mt-4 w-full" onClick={() => setEditing(d)}>
                  Edit profile & schedule
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit Doctor" : "Add Doctor"}
        wide
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={save} disabled={!editing?.name.trim() || editing?.days.length === 0}>
              Save
            </Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input value={editing.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Title (e.g. Sp.KGA)">
              <input value={editing.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Specialty">
              <select value={editing.specialty} onChange={(e) => set("specialty", e.target.value as Specialty)} className={inputClass}>
                {specialties.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Branch">
              <select value={editing.branchId} onChange={(e) => set("branchId", e.target.value)} className={inputClass}>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Phone">
              <input value={editing.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} />
            </Field>
            <Field label="STR number">
              <input value={editing.str} onChange={(e) => set("str", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Practice hours">
              <input value={editing.hours} onChange={(e) => set("hours", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Status">
              <select value={editing.status} onChange={(e) => set("status", e.target.value as Doctor["status"])} className={inputClass}>
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium text-gray-600">Practice days</span>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => {
                  const on = editing.days.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => set("days", on ? editing.days.filter((x) => x !== day) : [...editing.days, day])}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                        on ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
