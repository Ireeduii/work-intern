// // // // // src/app/api/skills/route.ts
// // // // import { NextRequest, NextResponse } from "next/server";

// // // // export const runtime = "edge";

// // // // export async function POST(req: NextRequest) {
// // // //   try {
// // // //     const body = await req.json();
// // // //     const { name, category, level } = body;
// // // //     const db =
// // // //       (process.env as any)["skill-map-db"] || (req as any).nextConfig?.env?.DB;

// // // //     if (!db) {
// // // //       return NextResponse.json(
// // // //         {
// // // //           error:
// // // //             "Database connection not found. Check your wrangler.toml binding.",
// // // //         },
// // // //         { status: 500 },
// // // //       );
// // // //     }

// // // //     await db
// // // //       .prepare(
// // // //         "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?)",
// // // //       )
// // // //       .bind(name, category, level, new Date().toLocaleDateString())
// // // //       .run();

// // // //     return NextResponse.json({ success: true });
// // // //   } catch (error: any) {
// // // //     return NextResponse.json({ error: error.message }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextRequest, NextResponse } from "next/server";
// // // import { getRequestContext } from "@cloudflare/next-on-pages";

// // // export const runtime = "edge";

// // // export async function POST(req: NextRequest) {
// // //   try {
// // //     const body = await req.json();
// // //     const { name, category, level } = body;

// // //     const context = getRequestContext();
// // //     const db = context.env.DB;

// // //     if (!db) {
// // //       return NextResponse.json(
// // //         { error: "Датабаазтай холбогдож чадсангүй. wrangler.toml шалгана уу." },
// // //         { status: 500 },
// // //       );
// // //     }

// // //     await db
// // //       .prepare(
// // //         "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?)",
// // //       )
// // //       .bind(name, category, level, new Date().toLocaleDateString())
// // //       .run();

// // //     return NextResponse.json({ success: true });
// // //   } catch (error: any) {
// // //     return NextResponse.json({ error: error.message }, { status: 500 });
// // //   }
// // // }

// // import { NextRequest, NextResponse } from "next/server";

// // export const runtime = "edge";

// // export async function POST(req: NextRequest) {
// //   try {
// //     const body = await req.json();
// //     const { name, category, level } = body;

// //     // Cloudflare D1 Binding-ийг дуудах хамгийн найдвартай арга
// //     // @ts-ignore
// //     const db = req.context?.env?.DB || process.env.DB;

// //     if (!db) {
// //       console.error(
// //         "DB Binding олдсонгүй. wrangler.toml болон Cloudflare dashboard-оо шалгана уу.",
// //       );
// //       return NextResponse.json(
// //         { error: "Датабааз холболт амжилтгүй (DB binding not found)." },
// //         { status: 500 },
// //       );
// //     }

// //     await db
// //       .prepare(
// //         "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?)",
// //       )
// //       .bind(name, category, level, new Date().toLocaleDateString())
// //       .run();

// //     return NextResponse.json({ success: true });
// //   } catch (error: any) {
// //     console.error("API Error:", error);
// //     return NextResponse.json({ error: error.message }, { status: 500 });
// //   }
// // }

// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "edge";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { name, category, level } = body;

//     // Cloudflare-ийн binding-ийг авах хамгийн найдвартай арга
//     // @ts-ignore
//     const db = req.context?.env?.DB || process.env.DB;

//     if (!db) {
//       return NextResponse.json(
//         { error: "Датабааз холболт олдсонгүй (DB Binding fail)." },
//         { status: 500 },
//       );
//     }

//     await db
//       .prepare(
//         "INSERT INTO skills (name, category, level, lastUpdated) VALUES (?, ?, ?, ?)",
//       )
//       .bind(name, category, level, new Date().toLocaleDateString())
//       .run();

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// 1. Өгөгдөл унших (GET)
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

// 2. Өгөгдөл хадгалах (POST) - Энэ байхгүй байсан учраас 405 зааж байсан
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
