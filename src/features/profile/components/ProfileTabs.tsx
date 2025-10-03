import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate, useParams } from "react-router";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "games", label: "Games" },
  { value: "stats", label: "Stats" },
  { value: "friends", label: "Friends" },
];

const getValueFromPath = (pathname: string) => {
  // Find the tab that matches the current pathname
  const matchingTab = tabs.find((tab) => pathname.includes(tab.value));
  return matchingTab?.value || "overview";
};

export const ProfileTabs = () => {
  const location = useLocation();
  const { userName } = useParams();
  const navigate = useNavigate();

  return (
    <Tabs
      value={getValueFromPath(location.pathname)}
      onValueChange={(value) => {
        const routeName = value === "overview" ? "" : `${value}`;
        navigate(`/profile/${userName}/${routeName}`);
      }}
      className="mt-8 w-full"
    >
      <TabsList className="flex w-full justify-start gap-3 overflow-x-auto bg-transparent p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-none w-[120px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium leading-tight text-foreground transition hover:bg-white/10 data-[state=active]:border-lime-500 data-[state=active]:bg-lime-500/20"
          >
            <span className="block truncate">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
