import { Skill } from "../types/skill";

export function SkillStats({ skills }: { skills: Skill[] }) {
  const avg =
    skills.length > 0
      ? (skills.reduce((acc, s) => acc + s.level, 0) / skills.length).toFixed(1)
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
