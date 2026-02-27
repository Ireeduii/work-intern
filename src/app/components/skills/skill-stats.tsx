import { Skill } from "@/app/types/skill";

export function SkillStats({ skills }: { skills: Skill[] }) {
  const avg =
    skills.length > 0
      ? (
          skills.reduce((acc, s) => acc + (Number(s.level) || 0), 0) /
          skills.length
        ).toFixed(1)
      : "0";
  const experts = skills.filter((s) => s.level >= 4).length;

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {[
        { label: "Total Skills", value: skills.length },
        { label: "Average Level", value: avg },
        { label: "Expert Skills", value: experts },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-5"
        >
          <p className="text-sm font-medium text-muted-foreground">
            {stat.label}
          </p>

          <p className="mt-1 text-3xl font-semibold text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}

// "use client";

// import type { Skill } from "@/app/types/skill";

// interface SkillStatsProps {
//   skills: Skill[];
// }

// const LEVEL_LABELS = ["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

// const LEVEL_COLORS: Record<number, { bar: string; text: string; bg: string }> = {
//   1: { bar: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-800 dark:text-slate-300" },
//   2: { bar: "bg-blue-400", text: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950 dark:text-blue-300" },
//   3: { bar: "bg-emerald-400", text: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300" },
//   4: { bar: "bg-amber-400", text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950 dark:text-amber-300" },
//   5: { bar: "bg-rose-400", text: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950 dark:text-rose-300" },
// };

// const CATEGORY_COLORS: Record<string, string> = {
//   Technical: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
//   Leadership: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
//   Communication: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
//   Design: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
//   Analytics: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
// };

// export function SkillStats({ skills }: SkillStatsProps) {
//   if (skills.length === 0) return null;

//   // avg level
//   const avgLevel = skills.reduce((s, sk) => s + sk.level, 0) / skills.length;

//   const levelCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//   skills.forEach((sk) => { levelCounts[sk.level] = (levelCounts[sk.level] ?? 0) + 1; });

//   const categoryCounts: Record<string, number> = {};
//   skills.forEach((sk) => {
//     categoryCounts[sk.category] = (categoryCounts[sk.category] ?? 0) + 1;
//   });

//   const maxCount = Math.max(...Object.values(levelCounts));

//   return (
//     <section className="space-y-4">
//       <h2 className="text-lg font-semibold text-foreground tracking-tight">
//         Skill Overview
//       </h2>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//         {/* Total skills */}
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//           <p className="text-sm text-muted-foreground">Total Skills</p>
//           <p className="mt-1 text-3xl font-bold text-foreground">{skills.length}</p>
//         </div>

//         {/* Average level */}
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//           <p className="text-sm text-muted-foreground">Average Level</p>
//           <p className="mt-1 text-3xl font-bold text-foreground">{avgLevel.toFixed(1)}</p>
//           <p className="text-xs text-muted-foreground mt-0.5">
//             {LEVEL_LABELS[Math.round(avgLevel)]}
//           </p>
//         </div>

//         {/* Top category */}
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
//           <p className="text-sm text-muted-foreground">Top Category</p>
//           <p className="mt-1 text-3xl font-bold text-foreground">
//             {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—"}
//           </p>
//           <p className="text-xs text-muted-foreground mt-0.5">
//             {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[1]} skill(s)
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//         {/* Level distribution bar chart */}
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
//           <p className="text-sm font-semibold text-foreground">Level Distribution</p>
//           <div className="space-y-2">
//             {[1, 2, 3, 4, 5].map((lvl) => {
//               const count = levelCounts[lvl] ?? 0;
//               const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
//               const c = LEVEL_COLORS[lvl];
//               return (
//                 <div key={lvl} className="flex items-center gap-3">
//                   <span className="w-24 text-xs text-muted-foreground shrink-0">
//                     {LEVEL_LABELS[lvl]}
//                   </span>
//                   <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
//                     <div
//                       className={`h-full rounded-full transition-all duration-500 ${c.bar}`}
//                       style={{ width: `${pct}%` }}
//                     />
//                   </div>
//                   <span className={`w-4 text-xs font-medium text-right ${c.text}`}>
//                     {count}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Category breakdown */}
//         <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
//           <p className="text-sm font-semibold text-foreground">By Category</p>
//           <div className="flex flex-wrap gap-2">
//             {Object.entries(categoryCounts)
//               .sort((a, b) => b[1] - a[1])
//               .map(([cat, count]) => (
//                 <div
//                   key={cat}
//                   className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
//                     CATEGORY_COLORS[cat] ?? "bg-secondary text-secondary-foreground"
//                   }`}
//                 >
//                   <span>{cat}</span>
//                   <span className="opacity-60">·</span>
//                   <span>{count}</span>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
