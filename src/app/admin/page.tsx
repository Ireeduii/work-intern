import {
  FolderKanban,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { projects, employees, criticalGaps, departments } from "@/lib/data";

const stats = [
  {
    label: "Active Projects",
    value: projects.filter((p) => p.status === "active").length,
    icon: FolderKanban,
    color: "text-primary",
  },
  {
    label: "Team Members",
    value: employees.length,
    icon: Users,
    color: "text-[hsl(160,60%,45%)]",
  },
  {
    label: "Avg Coverage",
    value: `${Math.round(departments.reduce((a, d) => a + d.skillCoverage, 0) / departments.length)}%`,
    icon: TrendingUp,
    color: "text-[hsl(160,60%,45%)]",
  },
  {
    label: "Critical Gaps",
    value: criticalGaps.filter((g) => g.current < 40).length,
    icon: AlertTriangle,
    color: "text-[hsl(25,95%,53%)]",
  },
];

export default function AdminSide() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor your team skills, project requirements, and workforce
          analytics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Active Projects</CardTitle>
              <CardDescription>Current skill requirements</CardDescription>
            </div>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="text-primary">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {projects
              .filter((p) => p.status === "active")
              .map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">
                      {project.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {project.teamSize} members
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.skills.length} skills
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0"
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Critical Skill Gaps</CardTitle>
              <CardDescription>
                Areas requiring immediate attention
              </CardDescription>
            </div>
            <Link href="/analytics">
              <Button variant="ghost" size="sm" className="text-primary">
                Details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {criticalGaps.slice(0, 4).map((gap) => (
              <div key={gap.skill} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {gap.skill}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {gap.current}% / {gap.needed}%
                  </span>
                </div>
                <Progress
                  value={gap.current}
                  className="h-2 bg-secondary [&>div]:bg-destructive"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
