"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Skill } from "@/app/types/skill";

interface SkillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (skill: Omit<Skill, "id" | "lastUpdated">) => void;
  editingSkill?: Skill | null;
}

const availableSkills = [
  { name: "React", category: "Technical" },
  { name: "TypeScript", category: "Technical" },
  { name: "Node.js", category: "Technical" },
  { name: "Python", category: "Technical" },
  { name: "SQL", category: "Technical" },
  { name: "AWS", category: "Technical" },
  { name: "Docker", category: "Technical" },
  { name: "Team Management", category: "Leadership" },
  { name: "Project Planning", category: "Leadership" },
];

const levelLabels: {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
  description: string;
}[] = [
  { value: 1, label: "Beginner", description: "Basic understanding" },
  { value: 2, label: "Basic", description: "Can apply with guidance" },
  { value: 3, label: "Intermediate", description: "Works independently" },
  { value: 4, label: "Advanced", description: "Can mentor others" },
  { value: 5, label: "Expert", description: "Industry-level expertise" },
];

export function SkillModal({
  open,
  onOpenChange,
  onSave,
  editingSkill,
}: SkillModalProps) {
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5>(3);

  useEffect(() => {
    if (editingSkill) {
      setSelectedSkill(editingSkill.name);
      setSelectedLevel(editingSkill.level);
    } else {
      setSelectedSkill("");
      setSelectedLevel(3);
    }
  }, [editingSkill, open]);

  const handleSave = () => {
    const skill = availableSkills.find((s) => s.name === selectedSkill);
    if (skill) {
      onSave({
        name: skill.name,
        category: skill.category,
        level: selectedLevel,
      });
      onOpenChange(false);
    }
  };

  const isEditing = !!editingSkill;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? "Edit Skill" : "Add New Skill"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the skill level for this competency."
              : "Select a skill and rate your proficiency level."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="skill" className="text-foreground">
              Skill
            </Label>
            <Select
              value={selectedSkill}
              onValueChange={setSelectedSkill}
              disabled={isEditing}
            >
              <SelectTrigger id="skill" className="w-full">
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                {availableSkills.map((skill) => (
                  <SelectItem key={skill.name} value={skill.name}>
                    <div className="flex items-center gap-2">
                      <span>{skill.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {skill.category}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-foreground">Proficiency Level</Label>
            <div className="grid gap-2">
              {levelLabels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setSelectedLevel(level.value)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                    selectedLevel === level.value
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border bg-card text-foreground hover:border-muted-foreground/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                        selectedLevel === level.value
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {level.value}
                    </div>
                    <span className="font-medium">{level.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {level.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedSkill}>
            {isEditing ? "Save Changes" : "Add Skill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
