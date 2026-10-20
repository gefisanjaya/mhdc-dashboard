import type { ToothStatus } from "@/lib/data";

const legend: Record<ToothStatus, { label: string; className: string }> = {
  healthy: { label: "Healthy", className: "bg-white border-gray-300 text-gray-500" },
  caries: { label: "Caries", className: "bg-brand-red border-brand-red text-white" },
  filled: { label: "Filled", className: "bg-navy-800 border-navy-800 text-white" },
  rct: { label: "Root canal", className: "bg-teal-brand border-teal-brand text-white" },
  crown: { label: "Crown", className: "gold-gradient border-gold-500 text-white" },
  missing: { label: "Missing", className: "bg-gray-100 border-dashed border-gray-300 text-gray-300 line-through" },
};

// FDI notation, viewed from the front: patient's right on the left side of the chart.
const permanent = {
  upper: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
  lower: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
};
const primary = {
  upper: [55, 54, 53, 52, 51, 61, 62, 63, 64, 65],
  lower: [85, 84, 83, 82, 81, 71, 72, 73, 74, 75],
};

function Row({ teeth, chart }: { teeth: number[]; chart: Partial<Record<number, ToothStatus>> }) {
  return (
    <div className="flex justify-center gap-1">
      {teeth.map((t, i) => {
        const status = chart[t] ?? "healthy";
        return (
          <span
            key={t}
            title={`${t} – ${legend[status].label}`}
            className={`flex h-8 w-7 items-center justify-center rounded-md border text-[10px] font-semibold ${legend[status].className} ${
              i === teeth.length / 2 ? "ml-2" : ""
            }`}
          >
            {t}
          </span>
        );
      })}
    </div>
  );
}

export default function Odontogram({ chart, child }: { chart: Partial<Record<number, ToothStatus>>; child: boolean }) {
  const set = child ? primary : permanent;
  return (
    <div>
      <div className="space-y-2 overflow-x-auto rounded-xl bg-surface p-4">
        <Row teeth={set.upper} chart={chart} />
        <div className="mx-auto h-px w-3/4 bg-gray-300" />
        <Row teeth={set.lower} chart={chart} />
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {Object.entries(legend).map(([key, l]) => (
          <span key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className={`h-3 w-3 rounded border ${l.className}`} /> {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
