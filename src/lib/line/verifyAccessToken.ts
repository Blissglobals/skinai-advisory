// 클라이언트가 보낸 userId를 그대로 믿으면 임의의 LINE 사용자에게 발송할 수 있어서,
// LIFF access token을 LINE 서버에 직접 검증한 뒤 그 토큰의 주인 userId를 씁니다.
// LIFF ID는 "{LINE Login 채널 ID}-{식별자}" 형식이라 채널 ID를 여기서 꺼내 비교합니다.
export async function verifyLiffAccessToken(accessToken: string): Promise<string | null> {
  const channelId = process.env.NEXT_PUBLIC_LIFF_ID?.split("-")[0];
  if (!channelId) return null;

  const verifyRes = await fetch(
    `https://api.line.me/oauth2/v2.1/verify?access_token=${encodeURIComponent(accessToken)}`
  );
  if (!verifyRes.ok) return null;
  const { client_id, expires_in } = (await verifyRes.json()) as {
    client_id?: string;
    expires_in?: number;
  };
  if (client_id !== channelId || !expires_in || expires_in <= 0) return null;

  const profileRes = await fetch("https://api.line.me/v2/profile", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!profileRes.ok) return null;
  const { userId } = (await profileRes.json()) as { userId?: string };
  return typeof userId === "string" ? userId : null;
}
