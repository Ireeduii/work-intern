import { createSchema, createYoga } from "graphql-yoga";
import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

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
export async function GET(request: NextRequest) {
  const context = getRequestContext() as any;
  const env = context.env as Env;

  return yoga.handleRequest(request, {
    db: env.DB,
  });
}

export async function POST(request: NextRequest) {
  const context = getRequestContext() as any;
  const env = context.env as Env;

  return yoga.handleRequest(request, {
    db: env.DB,
  });
}
