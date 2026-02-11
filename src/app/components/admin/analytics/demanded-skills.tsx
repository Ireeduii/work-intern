"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DemandedSkill = {
  skill: string;
  demand: number;
};

export function DemandedSkillsChart({ data }: { data: DemandedSkill[] }) {
  const chartConfig = {
    demand: {
      label: "Demand Score",
      color: "hsl(217, 91%, 60%)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Most Demanded Skills</CardTitle>
        <CardDescription>
          Skills with the highest demand across active projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                dataKey="skill"
                type="category"
                width={90}
                tick={{ fontSize: 12, fill: "hsl(215, 20%, 55%)" }}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="demand"
                fill="var(--color-demand)"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
