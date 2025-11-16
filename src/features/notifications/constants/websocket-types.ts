export enum NOTIFICATION_MESSAGE_TYPES {
  // Outgoing challenge actions
  CHALLENGE_SENT = "challenge_sent",
  CHALLENGE_ACCEPTED = "challenge_accepted",
  CHALLENGE_DECLINED = "challenge_declined",

  // Incoming challenge events
  CHALLENGE_RECEIVED = "challenge_received",
  OPPONENT_UNAVAILABLE = "opponent_unavailable",
  MATCH_CREATED = "match_created",
  ERROR = "error",
}
