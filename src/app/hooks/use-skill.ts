"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@apollo/client/react";
import { Skill } from "../types/skill";
import { ADD_SKILL, GET_SKILLS } from "@/lib/queries";

export function useSkills() {
  // const [skill, setSkills] = useState<Skill[]>(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const { data, loading, refetch } = useQuery<{ skills: any[] }>(GET_SKILLS);
  const skills = data?.skills || [];

  const [addSkillMutation] = useMutation(ADD_SKILL, {
    onCompleted: () => {
      toast.success("Success");
      setIsModalOpen(false);
      refetch();
    },
    onError: (error: any) => {
      console.error("GraphQL Error:", error);
      toast.error(error.message || "Mutation error");
    },
  });

  const onSave = async (skillData: any) => {
    try {
      await addSkillMutation({
        variables: {
          name: skillData.name,
          category: skillData.category,
          level: String(skillData.level),
        },
      });
    } catch (e) {
      console.error("Save error:", e);
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
    console.log("Delete logic here for ID:", id);
  };

  return {
    skills,
    loading,
    isModalOpen,
    setIsModalOpen,
    editingSkill,
    onSave,
    deleteSkill,
    openEdit,
    openAdd,
  };
}
// "use client";

// import { Skill, UserSkillGql } from "@/app/types/skill";
// import { useMutation, useQuery } from "@apollo/client/react";
// import { useCallback, useState } from "react";
// import {
//   GET_USER_PROFILE,
//   GET_ALL_SKILLS,
//   REMOVE_USER_SKILL,
//   UPSERT_USER_SKILL,
// } from "@/lib/queries";

// function toSkill(us: UserSkillGql): Skill {
//   return {
//     id: String(us.skillId),
//     name: us.skill.name || us.skill.category,
//     category: us.skill.category,
//     level: us.level,
//     lastUpdated: new Date(us.upDatedAt).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     }),
//   };
// }

// export function useSkills(userId: number) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

//   const { data, loading, error } = useQuery<{
//     user: { userSkills: UserSkillGql[] } | null;
//   }>(GET_USER_PROFILE, {
//     variables: { id: userId },
//     skip: !userId,
//   });

//   const { data: allSkillsData } = useQuery<{
//     skills: { id: number; name: string; category: string }[];
//   }>(GET_ALL_SKILLS);

//   const [upsertUserSkill] = useMutation(UPSERT_USER_SKILL, {
//     refetchQueries: [{ query: GET_USER_PROFILE, variables: { id: userId } }],
//   });

//   const [removeUserSkill] = useMutation(REMOVE_USER_SKILL, {
//     refetchQueries: [{ query: GET_USER_PROFILE, variables: { id: userId } }],
//   });

//   const skills: Skill[] = data?.user?.userSkills.map(toSkill) ?? [];

//   const availableSkillsForDropDown =
//     allSkillsData?.skills.map((s) => ({
//       id: s.id,
//       name: s.name,
//       category: s.category,
//     })) ?? [];

//   const onSave = useCallback(
//     async (skillData: Omit<Skill, "id" | "lastUpdated">) => {
//       const match = allSkillsData?.skills.find(
//         (s) => s.name === skillData.name,
//       );
//       if (!match) return;

//       await upsertUserSkill({
//         variables: {
//           input: {
//             userId,
//             skillId: match.id,
//             level: skillData.level,
//           },
//         },
//       });
//       setIsModalOpen(false);
//     },
//     [allSkillsData, upsertUserSkill, userId],
//   );

//   const deleteSkill = useCallback(
//     async (skillId: string) => {
//       await removeUserSkill({
//         variables: { userId, skillId: Number(skillId) },
//       });
//     },
//     [removeUserSkill, userId],
//   );

//   const openEdit = useCallback((skill: Skill) => {
//     setEditingSkill(skill);
//     setIsModalOpen(true);
//   }, []);

//   const openAdd = useCallback(() => {
//     setEditingSkill(null);
//     setIsModalOpen(true);
//   }, []);

//   return {
//     skills,
//     loading,
//     error,
//     isModalOpen,
//     setIsModalOpen,
//     editingSkill,
//     onSave,
//     deleteSkill,
//     openAdd,
//     openEdit,
//     availableSkillsForDropDown,
//   };
// }
