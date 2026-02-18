// import { gql } from "@apollo/client";

// const GET_SKILLS = gql`
//   query GetSkills {
//     skills {
//       id
//       name
//       category
//       level
//     }
//   }
// `;

// const ADD_SKILL = gql`
//   mutation AddSkill($name: String!, $category: String!, $level: String!) {
//     addSkill(name: $name, category: $category, level: $level) {
//       id
//       name
//     }
//   }
// `;

import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      category
      level
    }
  }
`;

export const ADD_SKILL = gql`
  mutation AddSkill($name: String!, $category: String!, $level: String!) {
    addSkill(name: $name, category: $category, level: $level) {
      id
      name
      category
      level
    }
  }
`;
