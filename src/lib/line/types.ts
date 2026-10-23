export interface LineEventSource {
  type: "user" | "group" | "room";
  userId?: string;
}

interface LineEventBase {
  source: LineEventSource;
  timestamp: number;
}

export interface LineFollowEvent extends LineEventBase {
  type: "follow";
  replyToken: string;
}

export interface LineUnfollowEvent extends LineEventBase {
  type: "unfollow";
}

export interface LineMessageEvent extends LineEventBase {
  type: "message";
  replyToken: string;
  message: { type: "text"; id: string; text: string } | { type: string; id: string };
}

export interface LinePostbackEvent extends LineEventBase {
  type: "postback";
  replyToken: string;
  postback: { data: string };
}

export type LineWebhookEvent =
  | LineFollowEvent
  | LineUnfollowEvent
  | LineMessageEvent
  | LinePostbackEvent
  | (LineEventBase & { type: string });

export interface LineWebhookBody {
  destination: string;
  events: LineWebhookEvent[];
}

export interface LineQuickReplyItem {
  type: "action";
  action: { type: "postback"; label: string; data: string; displayText: string };
}

export interface LineTextMessage {
  type: "text";
  text: string;
  quickReply?: { items: LineQuickReplyItem[] };
}
