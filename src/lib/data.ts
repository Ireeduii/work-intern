// Shared mock data for the SkillMatrix platform

export type Skill = {
  name: string;
  level: number; // 1-5
  priority: "must-have" | "nice-to-have";
};

export type Project = {
  id: string;
  name: string;
  teamSize: number;
  skills: Skill[];
  status: "active" | "planning" | "completed";
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  skills: { name: string; level: number }[];
  matchScore?: number;
};

export const projects: Project[] = [
  {
    id: "p1",
    name: "Cloud Migration Platform",
    teamSize: 6,
    skills: [
      { name: "AWS", level: 4, priority: "must-have" },
      { name: "Docker", level: 3, priority: "must-have" },
      { name: "Kubernetes", level: 4, priority: "must-have" },
      { name: "Terraform", level: 3, priority: "nice-to-have" },
      { name: "Python", level: 3, priority: "nice-to-have" },
    ],
    status: "active",
  },
  {
    id: "p2",
    name: "Customer Analytics Dashboard",
    teamSize: 4,
    skills: [
      { name: "React", level: 4, priority: "must-have" },
      { name: "TypeScript", level: 4, priority: "must-have" },
      { name: "D3.js", level: 3, priority: "must-have" },
      { name: "SQL", level: 3, priority: "nice-to-have" },
    ],
    status: "active",
  },
  {
    id: "p3",
    name: "Mobile Banking App",
    teamSize: 5,
    skills: [
      { name: "React Native", level: 4, priority: "must-have" },
      { name: "TypeScript", level: 4, priority: "must-have" },
      { name: "Node.js", level: 3, priority: "must-have" },
      { name: "Security", level: 5, priority: "must-have" },
      { name: "CI/CD", level: 3, priority: "nice-to-have" },
    ],
    status: "planning",
  },
];

export const employees: Employee[] = [
  {
    id: "e1",
    name: "Sarah Chen",
    role: "Senior Engineer",
    department: "Engineering",
    avatar: "SC",
    skills: [
      { name: "React", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Node.js", level: 4 },
      { name: "AWS", level: 3 },
      { name: "Docker", level: 3 },
    ],
  },
  {
    id: "e2",
    name: "Marcus Rivera",
    role: "DevOps Lead",
    department: "Infrastructure",
    avatar: "MR",
    skills: [
      { name: "AWS", level: 5 },
      { name: "Docker", level: 5 },
      { name: "Kubernetes", level: 5 },
      { name: "Terraform", level: 4 },
      { name: "Python", level: 3 },
    ],
  },
  {
    id: "e3",
    name: "Aisha Patel",
    role: "Full Stack Developer",
    department: "Engineering",
    avatar: "AP",
    skills: [
      { name: "React", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Node.js", level: 4 },
      { name: "SQL", level: 4 },
      { name: "D3.js", level: 3 },
    ],
  },
  {
    id: "e4",
    name: "James Nakamura",
    role: "Cloud Architect",
    department: "Infrastructure",
    avatar: "JN",
    skills: [
      { name: "AWS", level: 5 },
      { name: "Kubernetes", level: 4 },
      { name: "Terraform", level: 5 },
      { name: "Docker", level: 4 },
      { name: "Security", level: 4 },
    ],
  },
  {
    id: "e5",
    name: "Elena Volkov",
    role: "Frontend Lead",
    department: "Engineering",
    avatar: "EV",
    skills: [
      { name: "React", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "D3.js", level: 4 },
      { name: "React Native", level: 4 },
      { name: "CSS", level: 5 },
    ],
  },
  {
    id: "e6",
    name: "David Kim",
    role: "Junior Developer",
    department: "Engineering",
    avatar: "DK",
    skills: [
      { name: "React", level: 2 },
      { name: "TypeScript", level: 2 },
      { name: "Node.js", level: 2 },
      { name: "SQL", level: 2 },
      { name: "Python", level: 3 },
    ],
  },
  {
    id: "e7",
    name: "Fatima Al-Hassan",
    role: "Security Engineer",
    department: "Security",
    avatar: "FA",
    skills: [
      { name: "Security", level: 5 },
      { name: "Python", level: 4 },
      { name: "AWS", level: 3 },
      { name: "CI/CD", level: 4 },
      { name: "Docker", level: 3 },
    ],
  },
  {
    id: "e8",
    name: "Tom Bradley",
    role: "Backend Engineer",
    department: "Engineering",
    avatar: "TB",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Python", level: 4 },
      { name: "SQL", level: 5 },
      { name: "Docker", level: 3 },
      { name: "CI/CD", level: 3 },
    ],
  },
];

export const departments = [
  { name: "Engineering", headcount: 45, skillCoverage: 78 },
  { name: "Infrastructure", headcount: 12, skillCoverage: 92 },
  { name: "Security", headcount: 8, skillCoverage: 85 },
  { name: "Data Science", headcount: 15, skillCoverage: 71 },
  { name: "Product", headcount: 10, skillCoverage: 65 },
];

export const demandedSkills = [
  { skill: "React", demand: 85 },
  { skill: "TypeScript", demand: 82 },
  { skill: "AWS", demand: 78 },
  { skill: "Python", demand: 75 },
  { skill: "Kubernetes", demand: 70 },
  { skill: "Docker", demand: 68 },
  { skill: "Node.js", demand: 65 },
  { skill: "Security", demand: 60 },
];

export const underutilizedSkills = [
  { skill: "Rust", value: 35 },
  { skill: "Go", value: 28 },
  { skill: "GraphQL", value: 22 },
  { skill: "WebAssembly", value: 15 },
];

export const criticalGaps = [
  { skill: "Machine Learning", current: 30, needed: 80 },
  { skill: "Data Engineering", current: 40, needed: 75 },
  { skill: "Mobile (iOS)", current: 25, needed: 70 },
  { skill: "DevSecOps", current: 45, needed: 85 },
  { skill: "System Design", current: 50, needed: 90 },
];
