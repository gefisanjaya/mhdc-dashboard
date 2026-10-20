"use client";

import { useMemo, useState } from "react";
import { Check, X, Search, ClipboardCheck, FileText, Building2, User, CalendarDays } from "lucide-react";
import { Badge, Button, Card, EmptyState, Field, Modal, PageHeader, Tabs, inputClass, statusTone } from "@/components/ui";
import { approvals as initialApprovals, branchById, type Approval, type ApprovalType } from "@/lib/data";
import { formatDate, rupiah } from "@/lib/format";

const statusTabs = ["Pending", "Approved", "Rejected", "All"] as const;
type StatusTab = (typeof statusTabs)[number];

const typeTone: Record<ApprovalType, "navy" | "gold" | "teal" | "blue" | "red" | "amber" | "gray"> = {
  "Treatment Plan": "navy",
  "Discount Request": "gold",
  "Doctor Leave": "amber",
  "Schedule Change": "blue",
  Refund: "red",
  "Insurance Claim": "teal",
  "New Doctor": "gray",
};

export default function ApprovalPage() {
  const [items, setItems] = useState<Approval[]>(initialApprovals);
  const [tab, setTab] = useState<StatusTab>("Pending");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("All types");
  const [selected, setSelected] = useState<Approval | null>(null);
  const [decision, setDecision] = useState<{ item: Approval; action: "Approved" | "Rejected" } | null>(null);
  const [note, setNote] = useState("");
  const [checked, setChecked] = useState<string[]>([]);

  const counts = useMemo(
    () => ({
      Pending: items.filter((i) => i.status === "Pending").length,
      Approved: items.filter((i) => i.status === "Approved").length,
      Rejected: items.filter((i) => i.status === "Rejected").length,
      All: items.length,
    }),
    [items]
  );

  const filtered = items.filter(
    (i) =>
      (tab === "All" || i.status === tab) &&
      (type === "All types" || i.type === type) &&
      `${i.title} ${i.code} ${i.requestedBy}`.toLowerCase().includes(query.toLowerCase())
  );

  const applyDecision = (ids: string[], status: "Approved" | "Rejected", n?: string) => {
    setItems((prev) => prev.map((i) => (ids.includes(i.id) ? { ...i, status, note: n || i.note } : i)));
    setChecked([]);
  };

  const confirmDecision = () => {
    if (!decision) return;
    applyDecision([decision.item.id], decision.action, note);
    setDecision(null);
    setSelected(null);
    setNote("");
  };

  const pendingIds = filtered.filter((i) => i.status === "Pending").map((i) => i.id);
  const allChecked = pendingIds.length > 0 && pendingIds.every((id) => checked.includes(id));

  return (
    <>
      <PageHeader title="Approval" description="Review treatment plans, discounts, refunds, insurance claims and staff requests from every branch." />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs tabs={statusTabs} value={tab} onChange={setTab} counts={counts} />
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search requests…" className={`${inputClass} pl-9 sm:w-64`} />
          </div>
          <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputClass} sm:w-48`}>
            <option>All types</option>
            {Object.keys(typeTone).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {checked.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-2xl bg-navy-800 px-5 py-3 text-sm text-white">
          <span>{checked.length} request(s) selected</span>
          <div className="flex gap-2">
            <Button size="sm" variant="gold" icon={Check} onClick={() => applyDecision(checked, "Approved", "Bulk approved")}>
              Approve all
            </Button>
            <Button size="sm" className="bg-white/10 text-white hover:bg-white/20" icon={X} onClick={() => applyDecision(checked, "Rejected", "Bulk rejected")}>
              Reject all
            </Button>
          </div>
        </div>
      )}

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={ClipboardCheck} title="All caught up!" text="No requests match the current filter." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase">
                  <th className="w-10 px-5 py-3">
                    <input
                      type="checkbox"
                      className="accent-navy-800"
                      checked={allChecked}
                      disabled={pendingIds.length === 0}
                      onChange={() => setChecked(allChecked ? [] : pendingIds)}
                    />
                  </th>
                  <th className="px-3 py-3 font-medium">Request</th>
                  <th className="px-3 py-3 font-medium">Type</th>
                  <th className="px-3 py-3 font-medium">Branch</th>
                  <th className="px-3 py-3 font-medium">Amount</th>
                  <th className="px-3 py-3 font-medium">Priority</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gold-50/40">
                    <td className="px-5 py-3.5">
                      <input
                        type="checkbox"
                        className="accent-navy-800"
                        disabled={a.status !== "Pending"}
                        checked={checked.includes(a.id)}
                        onChange={() => setChecked((c) => (c.includes(a.id) ? c.filter((x) => x !== a.id) : [...c, a.id]))}
                      />
                    </td>
                    <td className="px-3 py-3.5">
                      <button onClick={() => setSelected(a)} className="text-left">
                        <p className="font-medium text-ink hover:text-gold-700">{a.title}</p>
                        <p className="text-xs text-gray-400">
                          {a.code} · {a.requestedBy} · {formatDate(a.date)}
                        </p>
                      </button>
                    </td>
                    <td className="px-3 py-3.5">
                      <Badge tone={typeTone[a.type]}>{a.type}</Badge>
                    </td>
                    <td className="px-3 py-3.5 text-gray-600">{branchById(a.branchId)?.name}</td>
                    <td className="px-3 py-3.5 font-medium text-navy-800">{a.amount ? rupiah(a.amount) : "—"}</td>
                    <td className="px-3 py-3.5">
                      <span
                        className={`text-xs font-semibold ${
                          a.priority === "High" ? "text-brand-red" : a.priority === "Medium" ? "text-gold-600" : "text-gray-400"
                        }`}
                      >
                        ● {a.priority}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <Badge tone={statusTone[a.status]} dot>
                        {a.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        {a.status === "Pending" ? (
                          <>
                            <Button size="sm" variant="success" icon={Check} onClick={() => setDecision({ item: a, action: "Approved" })}>
                              Approve
                            </Button>
                            <Button size="sm" variant="danger" icon={X} onClick={() => setDecision({ item: a, action: "Rejected" })}>
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="ghost" icon={FileText} onClick={() => setSelected(a)}>
                            Details
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.code ?? ""}
        footer={
          selected?.status === "Pending" && (
            <>
              <Button variant="danger" icon={X} onClick={() => setDecision({ item: selected, action: "Rejected" })}>
                Reject
              </Button>
              <Button variant="gold" icon={Check} onClick={() => setDecision({ item: selected, action: "Approved" })}>
                Approve
              </Button>
            </>
          )
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge tone={typeTone[selected.type]}>{selected.type}</Badge>
              <Badge tone={statusTone[selected.status]} dot>
                {selected.status}
              </Badge>
            </div>
            <h4 className="text-lg font-semibold text-navy-800">{selected.title}</h4>
            <p className="text-sm text-gray-600">{selected.description}</p>
            <dl className="grid grid-cols-2 gap-3 rounded-xl bg-surface p-4 text-sm">
              <Info icon={User} label="Requested by" value={selected.requestedBy} />
              <Info icon={Building2} label="Branch" value={branchById(selected.branchId)?.name ?? "-"} />
              <Info icon={CalendarDays} label="Date" value={formatDate(selected.date)} />
              <Info icon={FileText} label="Amount" value={selected.amount ? rupiah(selected.amount) : "—"} />
            </dl>
            {selected.note && (
              <div className="rounded-xl border border-gold-100 bg-gold-50 p-3 text-sm text-gold-700">
                <span className="font-semibold">Reviewer note:</span> {selected.note}
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        open={!!decision}
        onClose={() => setDecision(null)}
        title={decision?.action === "Approved" ? "Approve request" : "Reject request"}
        footer={
          <>
            <Button variant="outline" onClick={() => setDecision(null)}>
              Cancel
            </Button>
            <Button
              variant={decision?.action === "Approved" ? "gold" : "primary"}
              className={decision?.action === "Rejected" ? "bg-brand-red hover:bg-red-700" : ""}
              onClick={confirmDecision}
              disabled={decision?.action === "Rejected" && !note.trim()}
            >
              Confirm {decision?.action === "Approved" ? "approval" : "rejection"}
            </Button>
          </>
        }
      >
        <p className="mb-4 text-sm text-gray-600">
          You are about to <b>{decision?.action === "Approved" ? "approve" : "reject"}</b> “{decision?.item.title}”.
        </p>
        <Field label={decision?.action === "Rejected" ? "Reason (required)" : "Note (optional)"}>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className={inputClass} placeholder="Add a note for the requester…" />
        </Field>
      </Modal>
    </>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-gray-500">
        <Icon size={13} /> {label}
      </dt>
      <dd className="mt-0.5 font-medium text-navy-800">{value}</dd>
    </div>
  );
}
