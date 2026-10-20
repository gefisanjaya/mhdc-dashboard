"use client";

import Link from "next/link";
import { CalendarCheck, Users, Wallet, Star, ArrowRight, Clock, Download, Plus } from "lucide-react";
import { Avatar, Badge, Button, Card, CardHeader, PageHeader, StatCard, Stars, statusTone } from "@/components/ui";
import { RevenueChart, ServiceMixChart, chartColors } from "@/components/charts";
import {
  appointments,
  approvals,
  branches,
  doctorById,
  patientById,
  branchById,
  reviews,
  revenueTrend,
  serviceMix,
} from "@/lib/data";
import { compactRupiah, formatDate } from "@/lib/format";

export default function DashboardPage() {
  const today = appointments.filter((a) => a.date === "2026-10-20").sort((a, b) => a.time.localeCompare(b.time));
  const pending = approvals.filter((a) => a.status === "Pending");
  const published = reviews.filter((r) => r.status === "Published");
  const avgRating = published.reduce((s, r) => s + r.rating, 0) / published.length;
  const topBranches = [...branches].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Selamat sore, Admin 👋"
        description="Here's what's happening across MHDC Clinic & Medikids today — Tuesday, 20 October 2026."
        actions={
          <>
            <Button variant="outline" icon={Download}>
              Export Report
            </Button>
            <Link href="/appointments">
              <Button variant="gold" icon={Plus}>
                New Appointment
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (Oct)" value={compactRupiah(3_710_000_000)} change={5.4} icon={Wallet} tone="gold" />
        <StatCard label="Patients (Oct)" value="3.978" change={3.1} icon={Users} tone="navy" />
        <StatCard label="Appointments Today" value={String(today.length)} change={-2.3} icon={CalendarCheck} tone="teal" />
        <StatCard label="Avg. Rating" value={`${avgRating.toFixed(1)} / 5`} change={0.8} icon={Star} tone="red" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Revenue Overview" subtitle="All branches · last 12 months" action={<Badge tone="green">+35% YoY</Badge>} />
          <div className="px-2 pb-4">
            <RevenueChart data={revenueTrend} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Service Mix" subtitle="Share of treatments this month" />
          <ServiceMixChart data={serviceMix} />
          <ul className="space-y-2 px-5 pb-5">
            {serviceMix.map((s, i) => (
              <li key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: chartColors[i] }} />
                  {s.name}
                </span>
                <span className="font-semibold text-navy-800">{s.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Today's Appointments"
            subtitle={`${today.length} scheduled`}
            action={
              <Link href="/appointments" className="flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700">
                View all <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50/60 text-left text-xs text-gray-500 uppercase">
                  <th className="px-5 py-2.5 font-medium">Time</th>
                  <th className="px-5 py-2.5 font-medium">Patient</th>
                  <th className="px-5 py-2.5 font-medium">Treatment</th>
                  <th className="px-5 py-2.5 font-medium">Doctor</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {today.map((a) => {
                  const p = patientById(a.patientId)!;
                  const d = doctorById(a.doctorId)!;
                  return (
                    <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gold-50/40">
                      <td className="px-5 py-3 font-medium text-navy-800">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-gold-500" />
                          {a.time}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={p.name} size={30} />
                          <div>
                            <p className="font-medium text-ink">{p.name}</p>
                            <p className="text-xs text-gray-400">{branchById(a.branchId)?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{a.service}</td>
                      <td className="px-5 py-3 text-gray-600">{d.name}</td>
                      <td className="px-5 py-3">
                        <Badge tone={statusTone[a.status]} dot>
                          {a.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Pending Approvals"
            subtitle={`${pending.length} requests need action`}
            action={
              <Link href="/approval" className="flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700">
                Review <ArrowRight size={14} />
              </Link>
            }
          />
          <ul className="space-y-1 px-3 pb-4">
            {pending.slice(0, 5).map((a) => (
              <li key={a.id}>
                <Link href="/approval" className="flex items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-navy-50">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      a.priority === "High" ? "bg-brand-red" : a.priority === "Medium" ? "bg-gold-500" : "bg-gray-300"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{a.title}</p>
                    <p className="text-xs text-gray-400">
                      {a.type} · {formatDate(a.date)}
                    </p>
                  </div>
                  {a.amount && <span className="text-xs font-semibold text-navy-800">{compactRupiah(a.amount)}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Top Branches" subtitle="By revenue this month" />
          <ul className="space-y-4 px-5 pb-5">
            {topBranches.map((b, i) => {
              const pct = (b.monthlyRevenue / topBranches[0].monthlyRevenue) * 100;
              return (
                <li key={b.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-navy-50 text-xs font-semibold text-navy-800">{i + 1}</span>
                      <span className="font-medium text-ink">{b.name}</span>
                    </span>
                    <span className="font-semibold text-navy-800">{compactRupiah(b.monthlyRevenue)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className={`h-2 rounded-full ${i === 0 ? "gold-gradient" : "bg-navy-800"}`} style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <CardHeader
            title="Latest Reviews"
            subtitle="From Google, Instagram & website"
            action={
              <Link href="/reviews" className="flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700">
                Manage <ArrowRight size={14} />
              </Link>
            }
          />
          <ul className="divide-y divide-gray-100 px-5 pb-3">
            {reviews.slice(0, 4).map((r) => (
              <li key={r.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar name={r.author} size={28} />
                    <span className="text-sm font-medium text-ink">{r.author}</span>
                    <Stars value={r.rating} size={12} />
                  </div>
                  <Badge tone={statusTone[r.status]}>{r.status}</Badge>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-gray-500">{r.text}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
