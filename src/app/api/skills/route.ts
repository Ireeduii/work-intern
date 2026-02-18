import { createSchema, createYoga } from "graphql-yoga";
import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// type
interface Env {
  DB: D1Database;
}

interface YogaContext {
  db: D1Database;
}

const schema = createSchema<YogaContext>({
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
  schema,
  graphqlEndpoint: "/api/skills",
  fetchAPI: { Response, Request },
});

export async function GET(request: NextRequest) {
  const { env } = getRequestContext<Env>();

  return yoga.handleRequest(request, {
    db: env.DB,
  });
}

export async function POST(request: NextRequest) {
  const { env } = getRequestContext<Env>();

  if (!env || !env.DB) {
    return new Response(JSON.stringify({ error: "D1 Binding missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return yoga.handleRequest(request, {
    db: env.DB,
  });
}
