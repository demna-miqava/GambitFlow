import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import OverviewSection from "./OverviewSection";
import StatsSection from "./StatsSection";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "games", label: "Games" },
  { value: "stats", label: "Stats" },
  { value: "friends", label: "Friends" },
];

export const ProfileTabs = () => {
  return (
    <Tabs defaultValue="overview" className="mt-8 w-full">
      <TabsList className="flex w-full justify-start gap-3 overflow-x-auto bg-transparent p-0 scrollbar-hide">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-none w-[120px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium leading-tight text-white transition hover:bg-white/10 data-[state=active]:border-lime-500 data-[state=active]:bg-lime-500/20"
          >
            <span className="block truncate">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <OverviewSection />
      </TabsContent>

      <TabsContent value="games" className="mt-6 text-white/70">
        Games content coming soon.
      </TabsContent>

      <TabsContent value="stats" className="mt-6 text-white/70">
        <StatsSection />
      </TabsContent>

      <TabsContent value="friends" className="mt-6 text-white/70">
        Friends content coming soon.
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
