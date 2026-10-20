"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, MessageSquareReply, Search, MessageSquareText, Check, Trash2 } from "lucide-react";
import { Avatar, Badge, Button, Card, EmptyState, Modal, PageHeader, Stars, Tabs, inputClass, statusTone } from "@/components/ui";
import { branchById, doctorById, reviews as initialReviews, type Review } from "@/lib/data";
import { formatDate } from "@/lib/format";

const tabs = ["All", "Pending", "Published", "Hidden"] as const;
type Tab = (typeof tabs)[number];

const sourceTone = { Google: "blue", Website: "navy", Instagram: "gold", WhatsApp: "green" } as const;

export default function ReviewsPage() {
  const [items, setItems] = useState<Review[]>(initialReviews);
  const [tab, setTab] = useState<Tab>("All");
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState(0);
  const [replyTo, setReplyTo] = useState<Review | null>(null);
  const [reply, setReply] = useState("");

  const stats = useMemo(() => {
    const avg = items.reduce((s, r) => s + r.rating, 0) / items.length;
    const dist = [5, 4, 3, 2, 1].map((star) => ({ star, count: items.filter((r) => r.rating === star).length }));
    return { avg, dist, replied: items.filter((r) => r.reply).length };
  }, [items]);

  const counts = {
    All: items.length,
    Pending: items.filter((r) => r.status === "Pending").length,
    Published: items.filter((r) => r.status === "Published").length,
    Hidden: items.filter((r) => r.status === "Hidden").length,
  };

  const filtered = items.filter(
    (r) =>
      (tab === "All" || r.status === tab) &&
      (rating === 0 || r.rating === rating) &&
      `${r.author} ${r.text}`.toLowerCase().includes(query.toLowerCase())
  );

  const update = (id: string, patch: Partial<Review>) => setItems((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const openReply = (r: Review) => {
    setReplyTo(r);
    setReply(r.reply ?? `Terima kasih Kak ${r.author.split(" ")[0]} atas ulasannya! `);
  };

  return (
    <>
      <PageHeader title="Manage Review" description="Moderate patient reviews, reply on behalf of the clinic, and choose what appears on mhdc.co.id." />

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card className="flex items-center gap-5 p-5">
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-navy-800">{stats.avg.toFixed(1)}</p>
            <Stars value={stats.avg} />
            <p className="mt-1 text-xs text-gray-500">{items.length} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {stats.dist.map((d) => (
              <button key={d.star} onClick={() => setRating(rating === d.star ? 0 : d.star)} className="flex w-full items-center gap-2 text-xs">
                <span className={`w-3 ${rating === d.star ? "font-bold text-gold-700" : "text-gray-500"}`}>{d.star}</span>
                <div className="h-2 flex-1 rounded-full bg-gray-100">
                  <div className="gold-gradient h-2 rounded-full" style={{ width: `${(d.count / items.length) * 100}%` }} />
                </div>
                <span className="w-4 text-right text-gray-500">{d.count}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500">Awaiting moderation</p>
          <p className="mt-2 font-display text-3xl font-bold text-navy-800">{counts.Pending}</p>
          <p className="mt-2 text-xs text-gray-500">New reviews are hidden from the website until published.</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500">Response rate</p>
          <p className="mt-2 font-display text-3xl font-bold text-navy-800">{Math.round((stats.replied / items.length) * 100)}%</p>
          <div className="mt-3 h-2 rounded-full bg-gray-100">
            <div className="h-2 rounded-full bg-navy-800" style={{ width: `${(stats.replied / items.length) * 100}%` }} />
          </div>
        </Card>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs tabs={tabs} value={tab} onChange={setTab} counts={counts} />
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reviews…" className={`${inputClass} pl-9 lg:w-64`} />
          </div>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className={`${inputClass} w-36`}>
            <option value={0}>All ratings</option>
            {[5, 4, 3, 2, 1].map((s) => (
              <option key={s} value={s}>
                {s} stars
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={MessageSquareText} title="No reviews found" text="Try a different filter." />
        </Card>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((r) => {
            const doctor = doctorById(r.doctorId);
            return (
              <Card key={r.id} className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.author} size={40} />
                    <div>
                      <p className="font-medium text-ink">{r.author}</p>
                      <div className="flex items-center gap-2">
                        <Stars value={r.rating} size={13} />
                        <span className="text-xs text-gray-400">{formatDate(r.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge tone={statusTone[r.status]} dot>
                      {r.status}
                    </Badge>
                    <Badge tone={sourceTone[r.source]}>{r.source}</Badge>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">{r.text}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {branchById(r.branchId)?.name}
                  {doctor && ` · ${doctor.name}`}
                </p>

                {r.reply && (
                  <div className="mt-3 rounded-xl border-l-4 border-gold-400 bg-gold-50 px-3 py-2 text-sm text-gold-700">
                    <span className="font-semibold">MHDC Group:</span> {r.reply}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                  {r.status !== "Published" && (
                    <Button size="sm" variant="success" icon={Check} onClick={() => update(r.id, { status: "Published" })}>
                      Publish
                    </Button>
                  )}
                  {r.status !== "Hidden" ? (
                    <Button size="sm" variant="outline" icon={EyeOff} onClick={() => update(r.id, { status: "Hidden" })}>
                      Hide
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" icon={Eye} onClick={() => update(r.id, { status: "Pending" })}>
                      Unhide
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" icon={MessageSquareReply} onClick={() => openReply(r)}>
                    {r.reply ? "Edit reply" : "Reply"}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    icon={Trash2}
                    className="ml-auto"
                    onClick={() => setItems((prev) => prev.filter((x) => x.id !== r.id))}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={!!replyTo}
        onClose={() => setReplyTo(null)}
        title={`Reply to ${replyTo?.author ?? ""}`}
        footer={
          <>
            <Button variant="outline" onClick={() => setReplyTo(null)}>
              Cancel
            </Button>
            <Button
              variant="gold"
              disabled={!reply.trim()}
              onClick={() => {
                if (replyTo) update(replyTo.id, { reply: reply.trim() });
                setReplyTo(null);
              }}
            >
              Save reply
            </Button>
          </>
        }
      >
        {replyTo && (
          <>
            <div className="mb-4 rounded-xl bg-surface p-3 text-sm text-gray-600">
              <Stars value={replyTo.rating} size={12} />
              <p className="mt-1">{replyTo.text}</p>
            </div>
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} className={inputClass} />
            <p className="mt-2 text-xs text-gray-400">Replies are shown publicly under the review.</p>
          </>
        )}
      </Modal>
    </>
  );
}
