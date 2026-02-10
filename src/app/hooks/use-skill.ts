import { useState } from "react";
import type { Skill } from "@/app/types/skill";

export function useSkills(initialSkills: Skill[]) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const onSave = (skillData: Omit<Skill, "id" | "lastUpdated">) => {
    const updatedDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (editingSkill) {
      setSkills((prev) =>
        prev.map((s) =>
          s.id === editingSkill.id
            ? { ...s, ...skillData, lastUpdated: updatedDate }
            : s,
        ),
      );
    } else {
      const newSkill: Skill = {
        ...skillData,
        id: Date.now().toString(),
        lastUpdated: updatedDate,
      };
      setSkills((prev) => [...prev, newSkill]);
    }
    setIsModalOpen(false);
  };

  const deleteSkill = (id: string) =>
    setSkills((prev) => prev.filter((s) => s.id !== id));

  const openEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };
  const openAdd = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  return {
    skills,
    isModalOpen,
    setIsModalOpen,
    editingSkill,
    onSave,
    deleteSkill,
    openEdit,
    openAdd,
  };
}
