const LINE_PUSH_ENDPOINT = "https://api.line.me/v2/bot/message/push";

export async function pushLineTextMessage(userId: string, text: string): Promise<void> {
  const res = await fetch(LINE_PUSH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LINE push message failed (${res.status}): ${body}`);
  }
}
