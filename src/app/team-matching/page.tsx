"use client"

import { useState } from "react"
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { employees, projects } from "@/lib/data"

type MatchedEmployee = {
  id: string
  name: string
  role: string
  department: string
  avatar: string
  matchScore: number
  matchedSkills: { name: string; level: number; required: number; met: boolean }[]
  skills: { name: string; level: number }[]
}

function getMatchedEmployees(projectId: string): MatchedEmployee[] {
  const project = projects.find((p) => p.id === projectId)
  if (!project) return []

  return employees
    .map((emp) => {
      const matchedSkills = project.skills.map((reqSkill) => {
        const empSkill = emp.skills.find((s) => s.name === reqSkill.name)
        return {
          name: reqSkill.name,
          level: empSkill?.level ?? 0,
          required: reqSkill.level,
          met: empSkill ? empSkill.level >= reqSkill.level : false,
        }
      })
      const matchScore = Math.round(
        (matchedSkills.filter((s) => s.met).length / matchedSkills.length) * 100
      )
      return {
        ...emp,
        matchScore,
        matchedSkills,
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}

function getTeamWarnings(matched: MatchedEmployee[]): string[] {
  const warnings: string[] = []
  const topTeam = matched.slice(0, 4)

  const juniors = topTeam.filter((e) => e.role.includes("Junior"))
  if (juniors.length > 1) {
    warnings.push("Too many junior members - consider adding more experienced leads")
  }

  const depts = new Set(topTeam.map((e) => e.department))
  if (depts.size === 1) {
    warnings.push("All members from the same department - consider cross-functional diversity")
  }

  const avgScore = topTeam.reduce((a, e) => a + e.matchScore, 0) / topTeam.length
  if (avgScore < 60) {
    warnings.push("Average match score is low - upskilling may be required")
  }

  return warnings
}

export default function TeamMatchingPage() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null)

  const matchedEmployees = getMatchedEmployees(selectedProject)
  const project = projects.find((p) => p.id === selectedProject)
  const warnings = getTeamWarnings(matchedEmployees)

  const skillCoverage = project
    ? project.skills.map((skill) => {
        const coverageCount = employees.filter((e) =>
          e.skills.some((s) => s.name === skill.name && s.level >= skill.level)
        ).length
        return { name: skill.name, coverage: coverageCount, total: employees.length }
      })
    : []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Team Recommendation
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-matched team members ranked by skill compatibility
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {warnings.length > 0 && (
        <Card className="border-[hsl(38,92%,50%)]/30 bg-[hsl(38,92%,50%)]/5">
          <CardContent className="flex flex-col gap-2 pt-6">
            {warnings.map((warning) => (
              <div key={warning} className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-[hsl(38,92%,50%)]" />
                <span className="text-sm text-[hsl(38,92%,50%)]">{warning}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommended Team Members</CardTitle>
              <CardDescription>
                Sorted by match score for {project?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {matchedEmployees.map((emp, i) => (
                <div key={emp.id} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedEmployee(
                        expandedEmployee === emp.id ? null : emp.id
                      )
                    }
                    className="flex items-center gap-4 rounded-lg border border-border p-4 text-left transition-colors hover:bg-secondary/50 w-full"
                  >
                    <span className="text-xs font-mono text-muted-foreground w-5">
                      #{i + 1}
                    </span>
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {emp.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {emp.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {emp.role} - {emp.department}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-lg font-semibold font-mono ${
                            emp.matchScore >= 80
                              ? "text-[hsl(142,71%,45%)]"
                              : emp.matchScore >= 50
                                ? "text-[hsl(38,92%,50%)]"
                                : "text-destructive"
                          }`}
                        >
                          {emp.matchScore}%
                        </span>
                        <Progress
                          value={emp.matchScore}
                          className={`h-1.5 w-20 bg-secondary ${
                            emp.matchScore >= 80
                              ? "[&>div]:bg-[hsl(142,71%,45%)]"
                              : emp.matchScore >= 50
                                ? "[&>div]:bg-[hsl(38,92%,50%)]"
                                : "[&>div]:bg-destructive"
                          }`}
                        />
                      </div>
                      {expandedEmployee === emp.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {expandedEmployee === emp.id && (
                    <div className="rounded-b-lg border border-t-0 border-border bg-secondary/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Skill Breakdown
                      </p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {emp.matchedSkills.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex items-center gap-2 rounded-md bg-background p-2"
                          >
                            {skill.met ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(142,71%,45%)]" />
                            ) : (
                              <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                            )}
                            <span className="text-sm text-foreground flex-1">
                              {skill.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`font-mono text-xs ${
                                skill.met
                                  ? "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,45%)]"
                                  : "bg-destructive/10 text-destructive"
                              }`}
                            >
                              {skill.level}/{skill.required}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skill Coverage</CardTitle>
              <CardDescription>
                Team-wide distribution for required skills
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {skillCoverage.map((sc) => (
                <div key={sc.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {sc.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {sc.coverage}/{sc.total}
                    </span>
                  </div>
                  <Progress
                    value={(sc.coverage / sc.total) * 100}
                    className="h-2 bg-secondary [&>div]:bg-primary"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team Summary</CardTitle>
              <CardDescription>Quick overview of the current selection</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <span className="text-sm text-muted-foreground">
                  Required team size
                </span>
                <span className="text-sm font-semibold text-foreground font-mono">
                  {project?.teamSize}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <span className="text-sm text-muted-foreground">
                  Available candidates
                </span>
                <span className="text-sm font-semibold text-foreground font-mono">
                  {matchedEmployees.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <span className="text-sm text-muted-foreground">
                  {'Match >= 80%'}
                </span>
                <span className="text-sm font-semibold text-[hsl(142,71%,45%)] font-mono">
                  {matchedEmployees.filter((e) => e.matchScore >= 80).length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-secondary p-3">
                <span className="text-sm text-muted-foreground">
                  {'Match < 50%'}
                </span>
                <span className="text-sm font-semibold text-destructive font-mono">
                  {matchedEmployees.filter((e) => e.matchScore < 50).length}
                </span>
              </div>

              <Separator />

              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Assemble Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
