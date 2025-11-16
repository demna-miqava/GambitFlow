import { NOTIFICATION_MESSAGE_TYPES } from "../constants/websocket-types";

export type SendChallengeMessage = {
  type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_SENT;
  data: {
    challengedId: string;
    color: "white" | "black" | "random";
    time: number;
    increment: number;
  };
};

export type AcceptChallengeMessage = {
  type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_ACCEPTED;
  data: {
    challengerId: string;
  };
};

export type DeclineChallengeMessage = {
  type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_DECLINED;
  data: {
    challengerId: string;
  };
};

export type ChallengeReceivedNotification = {
  type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_RECEIVED;
  data: {
    challengerId: string;
    username: string;
    avatarUrl: string | null;
    challengerRating: number;
    color: "white" | "black" | "random";
    time: number;
    increment: number;
    createdAt: string;
  };
};

export type OpponentUnavailableNotification = {
  type: NOTIFICATION_MESSAGE_TYPES.OPPONENT_UNAVAILABLE;
};

export type ChallengeDeclinedNotification = {
  type: NOTIFICATION_MESSAGE_TYPES.CHALLENGE_DECLINED;
};

export type MatchCreatedNotification = {
  type: NOTIFICATION_MESSAGE_TYPES.MATCH_CREATED;
  data: {
    gameId: string;
    opponentId: string;
    opponentUsername: string;
    opponentRating: number;
    color: "white" | "black";
    time: number;
    increment: number;
  };
};

export type ChallengeErrorNotification = {
  type: NOTIFICATION_MESSAGE_TYPES.ERROR;
  data: {
    message: string;
  };
};

export type Challenge = {
  id: number;
  challengerId: string;
  username: string;
  avatarUrl: string | null;
  color: "white" | "black" | "random";
  time: number;
  increment: number;
  createdAt: string;
};

export type NotificationWebSocketMessage =
  | ChallengeReceivedNotification
  | OpponentUnavailableNotification
  | ChallengeDeclinedNotification
  | MatchCreatedNotification
  | ChallengeErrorNotification;
