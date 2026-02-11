// src/app/api/skills/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, level } = body;
    const db =
      (process.env as any)["skill-map-db"] || (req as any).nextConfig?.env?.DB;

    if (!db) {
      return NextResponse.json(
        {
          error:
            "Database connection not found. Check your wrangler.toml binding.",
        },
        { status: 500 },
      );
    }

    await db
      .prepare(
        "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?)",
      )
      .bind(name, category, level, new Date().toLocaleDateString())
      .run();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
