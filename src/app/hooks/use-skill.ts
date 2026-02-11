// import { useState } from "react";
// import type { Skill } from "@/app/types/skill";

// export function useSkills(initialSkills: Skill[]) {
//   const [skills, setSkills] = useState<Skill[]>(initialSkills);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

//   const onSave = (skillData: Omit<Skill, "id" | "lastUpdated">) => {
//     const updatedDate = new Date().toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });

//     if (editingSkill) {
//       setSkills((prev) =>
//         prev.map((s) =>
//           s.id === editingSkill.id
//             ? { ...s, ...skillData, lastUpdated: updatedDate }
//             : s,
//         ),
//       );
//     } else {
//       const newSkill: Skill = {
//         ...skillData,
//         id: Date.now().toString(),
//         lastUpdated: updatedDate,
//       };
//       setSkills((prev) => [...prev, newSkill]);
//     }
//     setIsModalOpen(false);
//   };

//   const deleteSkill = (id: string) =>
//     setSkills((prev) => prev.filter((s) => s.id !== id));

//   const openEdit = (skill: Skill) => {
//     setEditingSkill(skill);
//     setIsModalOpen(true);
//   };
//   const openAdd = () => {
//     setEditingSkill(null);
//     setIsModalOpen(true);
//   };

//   return {
//     skills,
//     isModalOpen,
//     setIsModalOpen,
//     editingSkill,
//     onSave,
//     deleteSkill,
//     openEdit,
//     openAdd,
//   };
// }

"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useSkills(initialSkills: any[]) {
  const [skills, setSkills] = useState(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.skills) setSkills(data.skills);
    } catch (err) {
      console.error("Уншихад алдаа гарлаа:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // const onSave = async (skillData: any) => {
  //   try {
  //     const response = await fetch("/api/skills", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(skillData),
  //     });

  //     if (response.ok) {
  //       toast.success("Амжилттай хадгалагдлаа");
  //       fetchSkills();
  //       setIsModalOpen(false);
  //     } else {
  //       toast.error("Хадгалахад алдаа гарлаа");
  //     }
  //   } catch (error) {
  //     toast.error("Сервертэй холбогдож чадсангүй");
  //   }
  // };

  const onSave = async (skillData: any) => {
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Серверийн алдаа:", errorData);
        throw new Error("Алдаа гарлаа");
      }

      toast.success("Амжилттай хадгалагдлаа");
      await fetchSkills();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Fetch алдаа:", error);
      toast.error("Сервертэй холбогдож чадсангүй");
    }
  };
  const openAdd = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const openEdit = (skill: any) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const deleteSkill = async (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
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
