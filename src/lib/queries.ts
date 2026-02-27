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

// import { gql } from "@apollo/client";

// export const GET_SKILLS = gql`
//   query GetSkills {
//     skills {
//       id
//       name
//       category
//       level
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

// export const ADD_SKILL = gql`
//   mutation AddSkill($name: String!, $category: String!, $level: String!) {
//     addSkill(name: $name, category: $category, level: $level) {
//       id
//       name
//       category
//       level
//     }
//   }
// `;

// import { gql } from "@apollo/client";

// export const GET_USER_PROFILE = gql`
//   query GetUserProfile($id: Int!) {
//     user(id: $id) {
//       id
//       name
//       email
//       role
//       bio
//       avatar
//       department
//       createdAt
//       userSkills {
//         id
//         skillId
//         level
//         updatedAt
//         skill {
//           id
//           name
//           category
//         }
//       }
//     }
//   }
// `;

// export const GET_ALL_SKILLS = gql`
//   query GetAllSkills {
//     skills {
//       id
//       name
//       category
//     }
//   }
// `;

// export const UPDATE_USER = gql`
//   mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
//     updateUser(id: $id, input: $input) {
//       id
//       name
//       email
//       role
//       bio
//       avatar
//       department
//     }
//   }
// `;

// export const UPSERT_USER_SKILL = gql`
//   mutation UpsertUserSkill($input: UpsertUserSkillInput!) {
//     upsertUserSkill(input: $input) {
//       id
//       userId
//       skillId
//       level
//       updatedAt
//       skill {
//         id
//         name
//         category
//       }
//     }
//   }
// `;

// export const REMOVE_USER_SKILL = gql`
//   mutation RemoveUserSkill($userId: Int!, $skillId: Int!) {
//     removeUserSkill(userId: $userId, skillId: $skillId)
//   }
// `;
