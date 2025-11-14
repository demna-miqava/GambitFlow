export type MessagesAllowedFrom = "nobody" | "everyone" | "only_friends";

export type Settings = {
  userId: number;
  boardCoordinatesEnabled: boolean;
  moveHighlightEnabled: boolean;
  soundsEnabled: boolean;
  premovesEnabled: boolean;
  autoPromoteToQueenEnabled: boolean;
  confirmDrawResignationEnabled: boolean;
  showLegalMovesEnabled: boolean;
  engineEvaluationEnabled: boolean;
  showTimestampsEnabled: boolean;
  showRatingsDuringGameEnabled: boolean;
  pieceIconNotationEnabled: boolean;
  emailNotificationsEnabled: boolean;
  messagesAllowedFrom: MessagesAllowedFrom;
};
