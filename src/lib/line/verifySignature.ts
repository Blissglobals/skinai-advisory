import { createHmac, timingSafeEqual } from "crypto";

export function verifyLineSignature(
  rawBody: string,
  signatureHeader: string | null,
  channelSecret: string | undefined
): boolean {
  if (!channelSecret || !signatureHeader) return false;

  const expected = createHmac("sha256", channelSecret).update(rawBody).digest("base64");

  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signatureHeader);
  if (expectedBuf.length !== actualBuf.length) return false;

  return timingSafeEqual(expectedBuf, actualBuf);
}
