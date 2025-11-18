import { getProfileStatsRoute } from "@/constants/routes";
import { useUser } from "@/hooks/useUser";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

interface StatsHeaderProps {
  showLink?: boolean;
}

const StatsHeader = ({ showLink = true }: StatsHeaderProps) => {
  const { username } = useUser();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(getProfileStatsRoute(username));
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-foreground">Stats</h3>
      {showLink && (
        <ArrowRight
          className="size-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          onClick={handleNavigate}
        />
      )}
    </div>
  );
};

export default StatsHeader;
