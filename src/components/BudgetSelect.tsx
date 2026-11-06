"use client";

const BUDGET_OPTIONS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
];

export default function BudgetSelect() {
  return (
    <select
      name="budget"
      defaultValue=""
      className="w-full rounded-2xl border border-white/10 bg-[#0c0c10] px-4 py-3.5 outline-none focus:border-white/25"
    >
      <option value="" disabled>
        Approximate budget (USD)
      </option>
      {BUDGET_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
      <option value="unsure">Not sure yet</option>
    </select>
  );
}
