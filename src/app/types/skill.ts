// export type Skill = {
//   id: string;
//   name: string;
//   category: string;
//   level: 1 | 2 | 3 | 4 | 5;
//   lastUpdated: string;
// };
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type SkillCategory =
  | "Technical"
  | "Leadership"
  | "Communication"
  | "Design"
  | "Analytics";

export interface Skill {
  id: string;
  name: string;
  category: string;
  // level: Skill
  level: SkillLevel;
  lastUpdated: string;
}

export interface UserSkillGql {
  id: number;
  skillId: number;
  level: SkillLevel;
  upDatedAt: string;
  skill: {
    id: number;
    name: string;
    category: string;
  };
}
