"use client";

import { useState } from "react";
import { Plus, Search, X, Phone, Mail, ShieldCheck, AlertTriangle, CalendarPlus, Users } from "lucide-react";
import { Avatar, Badge, Button, Card, EmptyState, Field, Modal, PageHeader, inputClass, statusTone } from "@/components/ui";
import Odontogram from "@/components/Odontogram";
import { branches, branchById, doctorById, insurers, patients as initialPatients, type Patient } from "@/lib/data";
import { ageFrom, formatDate, rupiah } from "@/lib/format";

export default function PatientsPage() {
  const [items, setItems] = useState<Patient[]>(initialPatients);
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState("all");
  const [insurance, setInsurance] = useState("all");
  const [group, setGroup] = useState<"all" | "child" | "adult">("all");
  const [selected, setSelected] = useState<Patient | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", gender: "P" as "L" | "P", dob: "", phone: "", email: "", branchId: branches[0].id, insurance: "Umum" });

  const filtered = items.filter((p) => {
    const age = ageFrom(p.dob);
    return (
      `${p.name} ${p.mrn} ${p.phone}`.toLowerCase().includes(query.toLowerCase()) &&
      (branch === "all" || p.branchId === branch) &&
      (insurance === "all" || p.insurance === insurance) &&
      (group === "all" || (group === "child" ? age < 13 : age >= 13))
    );
  });

  const addPatient = () => {
    const id = `p${Date.now()}`;
    setItems((prev) => [
      {
        ...form,
        id,
        mrn: `MHDC-26-${String(prev.length + 1).padStart(5, "0")}`,
        lastVisit: "2026-10-20",
        visits: 0,
        totalSpent: 0,
        status: "Active",
        teeth: {},
        history: [],
      },
      ...prev,
    ]);
    setAdding(false);
    setForm({ name: "", gender: "P", dob: "", phone: "", email: "", branchId: branches[0].id, insurance: "Umum" });
  };

  return (
    <>
      <PageHeader
        title="Patients"
        description="Patient records, dental charts and visit history."
        actions={
          <Button variant="gold" icon={Plus} onClick={() => setAdding(true)}>
            Register Patient
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-2 border-b border-gray-100 p-4 lg:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, MRN or phone…" className={`${inputClass} pl-9`} />
          </div>
          <select value={group} onChange={(e) => setGroup(e.target.value as typeof group)} className={`${inputClass} lg:w-40`}>
            <option value="all">All ages</option>
            <option value="child">Children (&lt;13)</option>
            <option value="adult">Adults</option>
          </select>
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className={`${inputClass} lg:w-56`}>
            <option value="all">All branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <select value={insurance} onChange={(e) => setInsurance(e.target.value)} className={`${inputClass} lg:w-44`}>
            <option value="all">All payers</option>
            {insurers.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Users} title="No patients found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase">
                  <th className="px-5 py-3 font-medium">Patient</th>
                  <th className="px-3 py-3 font-medium">MRN</th>
                  <th className="px-3 py-3 font-medium">Age</th>
                  <th className="px-3 py-3 font-medium">Branch</th>
                  <th className="px-3 py-3 font-medium">Payer</th>
                  <th className="px-3 py-3 font-medium">Last visit</th>
                  <th className="px-3 py-3 font-medium">Visits</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} onClick={() => setSelected(p)} className="cursor-pointer border-b border-gray-50 last:border-0 hover:bg-gold-50/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.name} size={34} />
                        <div>
                          <p className="font-medium text-ink">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-gray-600">{p.mrn}</td>
                    <td className="px-3 py-3 text-gray-600">
                      {ageFrom(p.dob)} th · {p.gender}
                    </td>
                    <td className="px-3 py-3 text-gray-600">{branchById(p.branchId)?.name}</td>
                    <td className="px-3 py-3">
                      <Badge tone={p.insurance === "Umum" ? "gray" : "teal"}>{p.insurance}</Badge>
                    </td>
                    <td className="px-3 py-3 text-gray-600">{formatDate(p.lastVisit)}</td>
                    <td className="px-3 py-3 font-medium text-navy-800">{p.visits}</td>
                    <td className="px-5 py-3">
                      <Badge tone={statusTone[p.status]} dot>
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail drawer */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950/40 transition-opacity ${selected ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setSelected(null)}
      />
      <aside
        className={`scrollbar-thin fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto bg-white shadow-2xl transition-transform ${
          selected ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selected && (
          <>
            <div className="navy-gradient p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <span className="rounded-full ring-2 ring-gold-300">
                    <Avatar name={selected.name} size={56} />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">{selected.name}</h2>
                    <p className="text-sm text-white/70">
                      {selected.mrn} · {ageFrom(selected.dob)} tahun · {selected.gender === "L" ? "Laki-laki" : "Perempuan"}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="font-display text-lg font-semibold">{selected.visits}</p>
                  <p className="text-[11px] text-white/60">Visits</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="font-display text-lg font-semibold">{rupiah(selected.totalSpent).replace("Rp", "Rp ")}</p>
                  <p className="text-[11px] text-white/60">Total spent</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="font-display text-lg font-semibold">{formatDate(selected.lastVisit)}</p>
                  <p className="text-[11px] text-white/60">Last visit</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6">
              {selected.allergies && (
                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-brand-red">
                  <AlertTriangle size={16} /> Allergy: <b>{selected.allergies}</b>
                </div>
              )}

              <section className="grid grid-cols-2 gap-3 text-sm">
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} className="text-gold-500" /> {selected.phone}
                </p>
                <p className="flex items-center gap-2 truncate text-gray-600">
                  <Mail size={14} className="text-gold-500" /> {selected.email}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck size={14} className="text-gold-500" /> {selected.insurance}
                </p>
                <p className="text-gray-600">{branchById(selected.branchId)?.name}</p>
              </section>

              <section>
                <h3 className="mb-3 font-semibold text-navy-800">Dental Chart (Odontogram)</h3>
                <Odontogram chart={selected.teeth} child={ageFrom(selected.dob) < 12} />
              </section>

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-navy-800">Visit History</h3>
                  <Button size="sm" variant="outline" icon={CalendarPlus}>
                    Book visit
                  </Button>
                </div>
                {selected.history.length === 0 ? (
                  <p className="text-sm text-gray-400">No visits yet.</p>
                ) : (
                  <ol className="relative space-y-4 border-l-2 border-gold-100 pl-5">
                    {selected.history.map((h, i) => (
                      <li key={i} className="relative">
                        <span className="absolute top-1.5 -left-[27px] h-3 w-3 rounded-full border-2 border-white bg-gold-500" />
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-ink">{h.service}</p>
                            <p className="text-xs text-gray-400">
                              {formatDate(h.date)} · {doctorById(h.doctorId)?.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">{h.note}</p>
                          </div>
                          <span className="shrink-0 text-sm font-semibold text-navy-800">{h.cost ? rupiah(h.cost) : "—"}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            </div>
          </>
        )}
      </aside>

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Register Patient"
        wide
        footer={
          <>
            <Button variant="outline" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button variant="gold" onClick={addPatient} disabled={!form.name.trim() || !form.dob || !form.phone.trim()}>
              Register
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name *">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Gender">
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as "L" | "P" })} className={inputClass}>
              <option value="P">Perempuan</option>
              <option value="L">Laki-laki</option>
            </select>
          </Field>
          <Field label="Date of birth *">
            <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Phone / WhatsApp *">
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Email">
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Payer / Insurance">
            <select value={form.insurance} onChange={(e) => setForm({ ...form, insurance: e.target.value })} className={inputClass}>
              {insurers.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Home branch">
            <select value={form.branchId} onChange={(e) => setForm({ ...form, branchId: e.target.value })} className={inputClass}>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Modal>
    </>
  );
}
