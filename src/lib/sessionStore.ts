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

// 같은 key로 처음 요청한 쪽만 true를 받습니다. 중복 실행 방지용 잠금입니다.
export async function claimOnce(key: string, ttlSeconds: number): Promise<boolean> {
  return (await redis.set(key, 1, { nx: true, ex: ttlSeconds })) === "OK";
}

export async function releaseClaim(key: string): Promise<void> {
  await redis.del(key);
}

// ponytail: 고정 윈도 카운터라 윈도 경계에서 최대 2배 버스트가 가능합니다.
// 정밀한 제한이 필요해지면 @upstash/ratelimit 슬라이딩 윈도로 교체하세요.
export async function isRateLimited(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const redisKey = "ratelimit:" + key;
  const count = await redis.incr(redisKey);
  if (count === 1) await redis.expire(redisKey, windowSeconds);
  return count > limit;
}
