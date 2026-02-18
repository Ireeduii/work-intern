"use client";
import { useState } from "react";
// import { useQuery, useMutation } from "@apollo/client/index.js";
import { toast } from "sonner";
import { GET_SKILLS, ADD_SKILL } from "../../lib/queries";
import { useMutation, useQuery } from "@apollo/client/react";

export function useSkills() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  // const { data, loading, refetch } = useQuery(GET_SKILLS);
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
          level: skillData.level,
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
