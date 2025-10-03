import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router";

const ViewFullStatsLink = () => {
  const { userName } = useUser();
  const navigate = useNavigate();
  return (
    <div className="text-right pt-4">
      <button
        className="text-gray-400 hover:text-gray-300 text-sm cursor-pointer"
        onClick={() => navigate(`/profile/${userName}/stats`)}
      >
        View Full Stats
      </button>
    </div>
  );
};

export default ViewFullStatsLink;
