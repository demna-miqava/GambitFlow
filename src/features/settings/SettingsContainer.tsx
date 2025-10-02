import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Gamepad2,
  LayoutDashboard,
  MessageCircle,
  Palette,
  ShieldCheck,
  User,
} from "lucide-react";

const tabs = [
  { value: "board", label: "Board & Pieces", icon: Palette },
  { value: "gameplay", label: "Gameplay", icon: Gamepad2 },
  { value: "profile", label: "Profile", icon: User },
  { value: "interface", label: "Interface", icon: LayoutDashboard },
  { value: "social", label: "Social", icon: MessageCircle },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "account", label: "Account", icon: ShieldCheck },
];

export const SettingsContainer = () => {
  return (
    <Tabs defaultValue="board" className="flex-row gap-4">
      <TabsList className="h-full flex-col gap-2 px-2 py-3">
        {tabs.map(({ icon: Icon, label, value }) => (
          <TabsTrigger
            value={value}
            key={label}
            className="flex w-full justify-start"
            aria-label="tab-trigger"
          >
            <Icon size={205} className="size-8" />
            <span className="text-sm">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="ml-6">
          <div className="flex items-start">
            <p className="text-muted-foreground text-sm">{tab.label}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
