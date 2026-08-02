import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createScanSession } from "@/lib/scanSession";
import { isLocale } from "@/i18n/config";
import type { DeepScanResult } from "@/lib/analysis/types";

interface CreateSessionBody {
  deepScan?: DeepScanResult;
  age?: number | null;
  locale?: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateSessionBody;
  const { deepScan, age = null, locale } = body;

  if (!deepScan || !locale || !isLocale(locale)) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const token = await createScanSession({ deepScan, age, locale });
  return NextResponse.json({ token });
}
