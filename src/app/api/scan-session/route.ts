import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createScanSession } from "@/lib/scanSession";
import { isRateLimited } from "@/lib/sessionStore";
import { parseAge, parseDeepScan } from "@/lib/scanInput";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

interface CreateSessionBody {
  deepScan?: unknown;
  age?: unknown;
  locale?: string;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (await isRateLimited(`scan-session:${ip}`, 20, 60 * 10)) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as CreateSessionBody | null;
  const locale = body?.locale;
  if (!locale || !isLocale(locale)) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const dict = await getDictionary(locale);
  const labels = {
    pore: dict.metrics.pore.label,
    wrinkle: dict.metrics.wrinkle.label,
    pigment: dict.metrics.pigment.label,
    elasticity: dict.metrics.elasticity.label,
  };
  const deepScan = parseDeepScan(body.deepScan, labels);
  const age = parseAge(body.age);
  if (!deepScan || age === undefined) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const token = await createScanSession({ deepScan, age, locale });
  return NextResponse.json({ token });
}
