import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/AppSidebar";
import { SettingsProvider } from "@/features/settings/SettingsContext";
import { ChallengesProvider } from "@/features/notifications/context/ChallengesContext";
import { FullScreenLoader } from "./FullScreenLoader";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <SettingsProvider>
        <ChallengesProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="p-4 min-h-screen">
              <Suspense
                fallback={<FullScreenLoader height="h-[calc(100vh-2rem)]" />}
              >
                <Outlet />
              </Suspense>
            </main>
          </SidebarInset>
        </ChallengesProvider>
      </SettingsProvider>
    </SidebarProvider>
  );
};
