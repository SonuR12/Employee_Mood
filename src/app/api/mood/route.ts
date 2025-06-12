// @typescript-eslint/no-unused-vars

import { moods } from "@/lib/utils/mood";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(moods);
}

export async function POST(req: NextRequest) {
  try {
    const { employeeId, employeeName, mood, comment } = await req.json();
    const entry = {
      employeeId,
      employeeName,
      mood,
      comment,
      timestamp: new Date().toISOString(),
    };
    moods.push(entry);
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
