import { useChallenges } from "@/features/notifications/context/ChallengesContext";
import { UserAvatar } from "@/components/UserAvatar";
import { formatTimeControl } from "@/utils/timeControl";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getChallenges } from "@/services/challenges";
import { QKEY_CHALLENGES } from "@/constants/queryKeys";
import { TWO_MINUTES_MS } from "@/constants/time";

export const Challenges = () => {
  const { data: challenges = [], isLoading } = useQuery({
    queryKey: [QKEY_CHALLENGES],
    queryFn: getChallenges,
    staleTime: TWO_MINUTES_MS,
  });
  const { handleAcceptChallenge, handleDeclineChallenge } = useChallenges();

  if (isLoading || challenges.length === 0) {
    return null;
  }
  return (
    <>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-sidebar-foreground/70">
        Challenges
      </h3>
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.challengerId}
            className="flex items-center justify-between rounded-xl border border-sidebar-border bg-sidebar px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <UserAvatar
                src={challenge.avatarUrl}
                username={challenge.username}
              />
              <div className="leading-tight">
                <p className="font-semibold">{challenge.username}</p>
                <p className="text-xs text-sidebar-foreground/70">
                  {formatTimeControl(challenge.time, challenge.increment)} •{" "}
                  {formatDistanceToNow(new Date(challenge.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleDeclineChallenge(challenge.challengerId)}
                className="rounded-lg bg-destructive px-3 py-1 text-xs text-white hover:bg-destructive/90 transition-colors"
              >
                Decline
              </Button>
              <Button
                onClick={() => handleAcceptChallenge(challenge.challengerId)}
                className="rounded-lg bg-lime-500 px-3 py-1 text-xs font-semibold text-lime-950 hover:bg-lime-600 transition-colors"
              >
                Accept
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
