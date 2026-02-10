"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { SkillLevel } from "./skill-level";
import type { Skill } from "@/app/types/skill";
interface SkillsTableProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

// export interface Skill {
//   id: string
//   name: string
//   category: string
//   level: number
//   lastUpdated: string
// }

interface SkillsTableProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (skillId: string) => void;
}

const categoryColors: Record<string, string> = {
  Technical: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Leadership:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Communication:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  Analytics: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
};

export function SkillsTable({ skills, onEdit, onDelete }: SkillsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold text-foreground">
              Skill
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Category
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Level
            </TableHead>
            <TableHead className="font-semibold text-foreground hidden sm:table-cell">
              Last Updated
            </TableHead>
            <TableHead className="font-semibold text-foreground text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No skills added yet. Click "Add Skill" to get started.
              </TableCell>
            </TableRow>
          ) : (
            skills.map((skill) => (
              <TableRow key={skill.id} className="group">
                <TableCell className="font-medium text-foreground">
                  {skill.name}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      categoryColors[skill.category] ||
                      "bg-secondary text-secondary-foreground"
                    }
                  >
                    {skill.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <SkillLevel level={skill.level} showLabel />
                </TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">
                  {skill.lastUpdated}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => onEdit(skill)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {skill.name}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {skill.name}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
