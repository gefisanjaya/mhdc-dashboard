"use client";

import { X, Star, type LucideIcon } from "lucide-react";
import { useEffect } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("min-w-0 rounded-2xl border border-black/5 bg-white shadow-sm", className)}>{children}</div>;
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
      <div>
        <h3 className="text-base font-semibold text-navy-800">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

type ButtonVariant = "primary" | "gold" | "outline" | "ghost" | "danger" | "success";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-navy-800 text-white hover:bg-navy-700",
  gold: "gold-gradient text-white hover:brightness-105",
  outline: "border border-gray-200 bg-white text-navy-800 hover:bg-navy-50",
  ghost: "text-navy-800 hover:bg-navy-50",
  danger: "bg-brand-red/10 text-brand-red hover:bg-brand-red/15",
  success: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: "sm" | "md"; icon?: LucideIcon }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        buttonStyles[variant],
        className
      )}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
}

type Tone = "navy" | "gold" | "green" | "red" | "amber" | "gray" | "teal" | "blue";

const toneStyles: Record<Tone, string> = {
  navy: "bg-navy-50 text-navy-800 ring-navy-100",
  gold: "bg-gold-50 text-gold-700 ring-gold-100",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  red: "bg-red-50 text-brand-red ring-red-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  gray: "bg-gray-100 text-gray-600 ring-gray-200",
  teal: "bg-teal-50 text-teal-brand ring-teal-100",
  blue: "bg-sky-50 text-sky-700 ring-sky-100",
};

export function Badge({ tone = "gray", children, dot }: { tone?: Tone; children: React.ReactNode; dot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset", toneStyles[tone])}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export const statusTone: Record<string, Tone> = {
  Pending: "amber",
  Approved: "green",
  Rejected: "red",
  Published: "green",
  Hidden: "gray",
  Confirmed: "navy",
  "Checked In": "blue",
  "In Treatment": "gold",
  Completed: "green",
  Cancelled: "red",
  "No Show": "gray",
  Active: "green",
  "On Leave": "amber",
  Inactive: "gray",
  Open: "green",
  Renovation: "amber",
};

const avatarColors = ["#19285e", "#8c6d3a", "#0f695c", "#57370d", "#34509f", "#b08d57"];

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name
    .replace(/^(drg\.|dr\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const color = avatarColors[name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % avatarColors.length];
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white"
      style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(value) ? "fill-gold-400 text-gold-400" : "fill-gray-200 text-gray-200"} />
      ))}
    </span>
  );
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "navy",
}: {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  tone?: "navy" | "gold" | "red" | "teal";
}) {
  const iconBg = { navy: "bg-navy-800", gold: "gold-gradient", red: "bg-brand-red", teal: "bg-teal-brand" }[tone];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-2 font-display text-2xl font-bold text-navy-800">{value}</p>
        </div>
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm", iconBg)}>
          <Icon size={20} />
        </span>
      </div>
      {change !== undefined && (
        <p className="mt-3 text-xs text-gray-500">
          <span className={cn("font-semibold", change >= 0 ? "text-emerald-600" : "text-brand-red")}>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </span>{" "}
          vs last month
        </p>
      )}
    </Card>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className={cn("flex max-h-[90vh] w-full flex-col rounded-2xl bg-white shadow-2xl", wide ? "max-w-3xl" : "max-w-lg")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-navy-800">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="scrollbar-thin overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  counts,
}: {
  tabs: readonly T[];
  value: T;
  onChange: (t: T) => void;
  counts?: Partial<Record<T, number>>;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={cn(
            "rounded-lg px-3.5 py-1.5 text-sm font-medium transition",
            value === t ? "bg-navy-800 text-white shadow" : "text-gray-500 hover:text-navy-800"
          )}
        >
          {t}
          {counts?.[t] !== undefined && (
            <span className={cn("ml-1.5 rounded-full px-1.5 text-[11px]", value === t ? "bg-white/20" : "bg-gray-100")}>{counts[t]}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100";

export function EmptyState({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
        <Icon size={24} />
      </span>
      <p className="mt-3 font-display font-semibold text-navy-800">{title}</p>
      {text && <p className="mt-1 text-sm text-gray-500">{text}</p>}
    </div>
  );
}
