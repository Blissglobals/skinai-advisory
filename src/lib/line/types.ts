export interface LineEventSource {
  type: "user" | "group" | "room";
  userId?: string;
}

export interface LineFollowEvent {
  type: "follow";
  source: LineEventSource;
  timestamp: number;
  replyToken: string;
}

export interface LineUnfollowEvent {
  type: "unfollow";
  source: LineEventSource;
  timestamp: number;
}

export type LineWebhookEvent =
  | LineFollowEvent
  | LineUnfollowEvent
  | { type: string; source: LineEventSource; timestamp: number };

export interface LineWebhookBody {
  destination: string;
  events: LineWebhookEvent[];
}
