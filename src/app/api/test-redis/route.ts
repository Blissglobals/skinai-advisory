import { NextResponse } from "next/server";
import { saveScanSession, getScanSession } from "@/lib/sessionStore";

export async function GET() {
  const testKey = `healthcheck-${Math.random().toString(36).slice(2)}`;
  await saveScanSession(testKey, { ok: true, from: "test-redis" }, 30);
  const result = await getScanSession(testKey);
  return NextResponse.json({ wrote: testKey, read: result });
}
