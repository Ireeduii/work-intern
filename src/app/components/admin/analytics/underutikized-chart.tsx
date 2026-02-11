"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";
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
import { underutilizedSkills } from "@/lib/data";

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(160, 60%, 45%)",
  "hsl(25, 95%, 53%)",
  "hsl(280, 65%, 60%)",
];

const chartConfig = {
  value: {
    label: "Utilization",
  },
  Rust: {
    label: "Rust",
    color: COLORS[0],
  },
  Go: {
    label: "Go",
    color: COLORS[1],
  },
  GraphQL: {
    label: "GraphQL",
    color: COLORS[2],
  },
  WebAssembly: {
    label: "WebAssembly",
    color: COLORS[3],
  },
};

export function UnderutilizedChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Underutilized Skills</CardTitle>
        <CardDescription>
          Skills with available talent but low project demand
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="skill" />} />
              <Pie
                data={underutilizedSkills}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                nameKey="skill"
              >
                {underutilizedSkills.map((_, index) => (
                  <Cell
                    key={underutilizedSkills[index].skill}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                formatter={(value) => (
                  <span style={{ color: "hsl(215, 20%, 55%)", fontSize: 12 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
