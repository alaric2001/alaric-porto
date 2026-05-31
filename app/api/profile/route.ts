import { NextResponse } from "next/server";
import { portfolioData } from "@/app/lib/data";

export async function GET() {
  return NextResponse.json(portfolioData, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
