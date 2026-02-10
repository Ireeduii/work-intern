"use client";

import { useSkills } from "@/app/hooks/use-skill";
import { EmployeeHeader } from "./employee-header";
import { SkillModal } from "./skill-modal";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid } from "lucide-react";
import type { Skill } from "../../types/skill";
import { SkillStats } from "./skill-stats";
import { SkillsTable } from "./skill-table";

const initialSkills: Skill[] = [
  {
    id: "1",
    name: "React",
    category: "Technical",
    level: 4,
    lastUpdated: "Jan 15, 2026",
  },
  {
    id: "2",
    name: "TypeScript",
    category: "Technical",
    level: 4,
    lastUpdated: "Jan 10, 2026",
  },
  {
    id: "3",
    name: "Figma",
    category: "Design",
    level: 2,
    lastUpdated: "Jan 5, 2026",
  },
];

export default function SkillProfilePage() {
  const {
    skills,
    isModalOpen,
    setIsModalOpen,
    editingSkill,
    onSave,
    deleteSkill,
    openEdit,
    openAdd,
  } = useSkills(initialSkills);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <span className="font-semibold">Skill Map</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#"
              className="font-medium text-foreground underline decoration-primary underline-offset-4"
            >
              Profile
            </a>
            <a href="#" className="hover:text-foreground">
              Team
            </a>
            <a href="#" className="hover:text-foreground">
              Reports
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8">
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <EmployeeHeader
            name="Ireedui"
            role="Senior Software Engineer"
            team="Platform Team"
            email="ireedui@example.com"
            location="Ulaanbaatar"
            joinDate="2025-03-01"
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                Skills & Competencies
              </h2>
              <p className="text-sm text-muted-foreground">
                {skills.length} skills tracked
              </p>
            </div>
            <Button onClick={openAdd} className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Add Skill
            </Button>
          </div>

          <SkillsTable
            skills={skills}
            onEdit={openEdit}
            onDelete={deleteSkill}
          />
        </section>

        <SkillStats skills={skills} />
      </main>

      <SkillModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={onSave}
        editingSkill={editingSkill}
      />
    </div>
  );
}
