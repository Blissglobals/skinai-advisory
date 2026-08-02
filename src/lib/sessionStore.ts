import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KEY_PREFIX = "scan-session:";

export async function saveScanSession(
  token: string,
  data: unknown,
  ttlSeconds: number
): Promise<void> {
  await redis.set(KEY_PREFIX + token, data, { ex: ttlSeconds });
}

export async function getScanSession<T>(token: string): Promise<T | null> {
  return redis.get<T>(KEY_PREFIX + token);
}

export async function deleteScanSession(token: string): Promise<void> {
  await redis.del(KEY_PREFIX + token);
}
