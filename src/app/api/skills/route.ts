import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    // @ts-ignore
    const db = req.context?.env?.DB || process.env.DB;

    if (!db)
      return NextResponse.json({ error: "DB not found" }, { status: 500 });

    const { results } = await db.prepare("SELECT * FROM skills").all();
    return NextResponse.json({ skills: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, level } = body;

    // @ts-ignore
    const db = req.context?.env?.DB || process.env.DB;

    if (!db) {
      return NextResponse.json(
        { error: "DB connection fail" },
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
