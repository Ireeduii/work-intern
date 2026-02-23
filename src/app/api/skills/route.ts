// // import { createSchema, createYoga } from "graphql-yoga";
// // import { Hono } from "hono";
// // import { handle } from "hono/cloudflare-pages";

// // interface Env {
// //   DB: D1Database;
// //   [key: string]: any;
// // }

// // export const runtime = "edge";

// // type Bindings = {
// //   DB: D1Database;
// // };

// // type YogaContext = {
// //   db: D1Database;
// // };

// // const skillSchema = createSchema<YogaContext>({
// //   typeDefs: `
// //     type Skill {
// //       id: Int
// //       name: String
// //       category: String
// //       level: String
// //     }

// //     type Query {
// //       skills: [Skill]
// //     }

// //     type Mutation {
// //       addSkill(name: String!, category: String!, level: String!): Skill
// //     }
// //   `,
// //   resolvers: {
// //     Query: {
// //       skills: async (_, __, context) => {
// //         const { results } = await context.db
// //           .prepare("SELECT * FROM skills")
// //           .all();
// //         return results as any;
// //       },
// //     },
// //     Mutation: {
// //       addSkill: async (_, { name, category, level }, context) => {
// //         const result = await context.db
// //           .prepare(
// //             "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?) RETURNING *",
// //           )
// //           .bind(name, category, level, new Date().toLocaleDateString())
// //           .first();

// //         return result as any;
// //       },
// //     },
// //   },
// // });

// // const app = new Hono<{ Bindings: Bindings }>();

// // app.all("/api/skills", async (c) => {
// //   const yoga = createYoga<YogaContext>({
// //     schema: skillSchema,
// //     graphqlEndpoint: "/api/skills",
// //     fetchAPI: { Response, Request },

// //     context: () => ({ db: c.env.DB }),
// //   });

// //   return yoga.handleRequest(c.req.raw, {} as any);
// // });

// // export const GET = handle(app);
// // export const POST = handle(app);

// import { createSchema, createYoga } from "graphql-yoga";
// import { NextRequest } from "next/server";
// import { getRequestContext } from "@cloudflare/next-on-pages";

// interface Env {
//   DB: D1Database;
//   [key: string]: any;
// }

// export const runtime = "edge";

// type YogaContext = {
//   db: D1Database;
// };

// const skillSchema = createSchema<YogaContext>({
//   typeDefs: `
//     type Skill {
//       id: Int
//       name: String
//       category: String
//       level: String
//     }
//     type Query {
//       skills: [Skill]
//     }
//     type Mutation {
//       addSkill(name: String!, category: String!, level: String!): Skill
//     }
//   `,
//   resolvers: {
//     Query: {
//       skills: async (_, __, context) => {
//         const { results } = await context.db
//           .prepare("SELECT * FROM skills")
//           .all();
//         return results as any;
//       },
//     },
//     Mutation: {
//       addSkill: async (_, { name, category, level }, context) => {
//         const result = await context.db
//           .prepare(
//             "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?) RETURNING *",
//           )
//           .bind(name, category, level, new Date().toLocaleDateString())
//           .first();
//         return result as any;
//       },
//     },
//   },
// });

// const yoga = createYoga<YogaContext>({
//   schema: skillSchema,
//   graphqlEndpoint: "/api/skills",
//   fetchAPI: { Response, Request },
// });

// export async function GET(request: NextRequest) {
//   const { env } = getRequestContext<{ DB: D1Database }>();

//   return yoga.handleRequest(request, {
//     db: env.DB,
//   });
// }

// export async function POST(request: NextRequest) {
//   const { env } = getRequestContext<{ DB: D1Database }>();

//   return yoga.handleRequest(request, {
//     db: env.DB,
//   });
// }
import { createSchema, createYoga } from "graphql-yoga";
import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

// Env интерфэйсийг илүү тодорхой болгох
interface Env {
  DB: D1Database;
  [key: string]: any;
}

export const runtime = "edge";

type YogaContext = {
  db: D1Database;
};

const skillSchema = createSchema<YogaContext>({
  typeDefs: `
    type Skill {
      id: Int
      name: String
      category: String
      level: String
    }
    type Query {
      skills: [Skill]
    }
    type Mutation {
      addSkill(name: String!, category: String!, level: String!): Skill
    }
  `,
  resolvers: {
    Query: {
      skills: async (_, __, context) => {
        const { results } = await context.db
          .prepare("SELECT * FROM skills")
          .all();
        return results as any;
      },
    },
    Mutation: {
      addSkill: async (_, { name, category, level }, context) => {
        const result = await context.db
          .prepare(
            "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?) RETURNING *",
          )
          .bind(name, category, level, new Date().toLocaleDateString())
          .first();
        return result as any;
      },
    },
  },
});

const yoga = createYoga<YogaContext>({
  schema: skillSchema,
  graphqlEndpoint: "/api/skills",
  fetchAPI: { Response, Request },
});

// GET Handler
export async function GET(request: NextRequest) {
  // Энд 'as any' ашигласнаар CloudflareEnv-ийн зөрүү арилна
  const context = getRequestContext() as any;
  const env = context.env as Env;

  return yoga.handleRequest(request, {
    db: env.DB,
  });
}

// POST Handler
export async function POST(request: NextRequest) {
  const context = getRequestContext() as any;
  const env = context.env as Env;

  return yoga.handleRequest(request, {
    db: env.DB,
  });
}
