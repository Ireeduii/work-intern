"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Star,
  ChevronDown,
  FolderKanban,
  Users,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import type { Skill } from "@/lib/data";

const availableSkills = [
  "React",
  "TypeScript",
  "Python",
  "AWS",
  "Docker",
  "Kubernetes",
  "Node.js",
  "SQL",
  "D3.js",
  "Terraform",
  "Security",
  "CI/CD",
  "React Native",
  "Machine Learning",
  "Go",
  "Rust",
  "GraphQL",
];

export default function ProjectsPage() {
  const [projectName, setProjectName] = useState("");
  const [teamSize, setTeamSize] = useState("4");
  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", level: 4, priority: "must-have" },
    { name: "TypeScript", level: 4, priority: "must-have" },
    { name: "Node.js", level: 3, priority: "nice-to-have" },
  ]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill && !skills.find((s) => s.name === newSkill)) {
      setSkills([
        ...skills,
        { name: newSkill, level: 3, priority: "nice-to-have" },
      ]);
      setNewSkill("");
    }
  };

  const removeSkill = (name: string) => {
    setSkills(skills.filter((s) => s.name !== name));
  };

  const updateSkillLevel = (name: string, level: number) => {
    setSkills(skills.map((s) => (s.name === name ? { ...s, level } : s)));
  };

  const togglePriority = (name: string) => {
    setSkills(
      skills.map((s) =>
        s.name === name
          ? {
              ...s,
              priority:
                s.priority === "must-have" ? "nice-to-have" : "must-have",
            }
          : s,
      ),
    );
  };

  const mustHaveSkills = skills.filter((s) => s.priority === "must-have");
  const niceToHaveSkills = skills.filter((s) => s.priority === "nice-to-have");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">
          Project Requirement Builder
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Define skill requirements for your project and find the best team
          composition
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Project Details</CardTitle>
              <CardDescription>
                Set up the basics for your new project
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="e.g., Cloud Migration Platform"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="team-size">Team Size</Label>
                  <Select value={teamSize} onValueChange={setTeamSize}>
                    <SelectTrigger id="team-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} members
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    Skill Requirements
                  </CardTitle>
                  <CardDescription>
                    Add and configure the skills needed for this project
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {skills.length} skills
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Select value={newSkill} onValueChange={setNewSkill}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill to add..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSkills
                      .filter((s) => !skills.find((sk) => sk.name === s))
                      .map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button onClick={addSkill} disabled={!newSkill}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs font-medium text-muted-foreground">
                        Skill
                      </TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">
                        Min Level
                      </TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">
                        Priority
                      </TableHead>
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skills.map((skill) => (
                      <TableRow
                        key={skill.name}
                        className={
                          skill.priority === "must-have"
                            ? "bg-[hsl(25,95%,53%)]/5"
                            : ""
                        }
                      >
                        <TableCell className="font-medium text-foreground">
                          {skill.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() =>
                                  updateSkillLevel(skill.name, level)
                                }
                                className="p-0.5"
                              >
                                <Star
                                  className={`h-4 w-4 transition-colors ${
                                    level <= skill.level
                                      ? "fill-[hsl(25,95%,53%)] text-[hsl(25,95%,53%)]"
                                      : "text-muted-foreground/30"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <button
                            type="button"
                            onClick={() => togglePriority(skill.name)}
                          >
                            <Badge
                              variant={
                                skill.priority === "must-have"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                skill.priority === "must-have"
                                  ? "bg-[hsl(25,95%,53%)] text-[hsl(222,47%,6%)] hover:bg-[hsl(25,95%,53%)]/90 cursor-pointer"
                                  : "cursor-pointer"
                              }
                            >
                              {skill.priority}
                            </Badge>
                          </button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSkill(skill.name)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Project Summary</CardTitle>
              <CardDescription>
                Overview of your project configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <FolderKanban className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Project</p>
                  <p className="text-sm font-medium text-foreground">
                    {projectName || "Untitled Project"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                <Users className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Team Size</p>
                  <p className="text-sm font-medium text-foreground">
                    {teamSize} members
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-[hsl(25,95%,53%)]" />
                  <span className="text-sm font-medium text-foreground">
                    Must-Have ({mustHaveSkills.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mustHaveSkills.map((s) => (
                    <Badge
                      key={s.name}
                      className="bg-[hsl(25,95%,53%)]/10 text-[hsl(25,95%,53%)] border-[hsl(25,95%,53%)]/20 border"
                    >
                      {s.name}
                      <span className="ml-1 opacity-70">Lv{s.level}</span>
                    </Badge>
                  ))}
                  {mustHaveSkills.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No must-have skills added
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Nice-to-Have ({niceToHaveSkills.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {niceToHaveSkills.map((s) => (
                    <Badge
                      key={s.name}
                      variant="secondary"
                      className="text-muted-foreground"
                    >
                      {s.name}
                      <span className="ml-1 opacity-70">Lv{s.level}</span>
                    </Badge>
                  ))}
                  {niceToHaveSkills.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No nice-to-have skills added
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Find Matching Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
