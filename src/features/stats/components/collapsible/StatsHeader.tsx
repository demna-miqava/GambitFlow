import { useUser } from "@/hooks/useUser";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const StatsHeader = () => {
  const { userName } = useUser();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${userName}/stats`);
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-200">Stats</h3>
      <ArrowRight
        className="size-4 text-gray-400 cursor-pointer"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default StatsHeader;
