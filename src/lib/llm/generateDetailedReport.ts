import OpenAI from "openai";
import type { ScanSessionData } from "@/lib/scanSession";

const LANGUAGE_NAMES: Record<string, string> = {
  ko: "Korean (한국어)",
  "zh-TW": "Traditional Chinese (繁體中文)",
  "zh-CN": "Simplified Chinese (简体中文)",
};

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export async function generateDetailedReport(session: ScanSessionData): Promise<string> {
  const language = LANGUAGE_NAMES[session.locale] ?? LANGUAGE_NAMES.ko;
  const metricsSummary = session.deepScan.metrics
    .map((m) => `- ${m.label}: ${m.score}/100`)
    .join("\n");

  const prompt = `You are a friendly skincare advisor writing a personalized detailed report for a user of a skin analysis app called SkinAI Advisory.

Write entirely in ${language}. Do not mix in other languages.

The user's measured scores (0-100 scale, higher is better):
${metricsSummary}
Overall score: ${session.deepScan.overallScore}/100
${session.age ? `Age: ${session.age}` : ""}

Write a warm, encouraging, detailed report covering:
1. An overall summary of their skin condition based on the scores above.
2. For each metric, a specific observation and a practical, general care suggestion.
3. A short closing note of encouragement.

Constraints:
- This is general skincare information, not a medical diagnosis. Do not make medical claims, and do not recommend specific medications, brand-name products, or named clinical procedures.
- Keep a warm, conversational tone, not clinical or robotic.
- Plain prose only -- no markdown symbols (no #, *, -, numbered lists).
- Length: roughly 400-600 words.`;

  const openai = getClient();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content?.trim() ?? "";
}
