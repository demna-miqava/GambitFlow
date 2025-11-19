import Logo from "@/components/Logo";
import OAuthSection from "./OAuthSection";
import type { ReactNode } from "react";

export const FormContainer = ({
  children,
  title,
  Footer,
}: {
  children: ReactNode;
  title?: string;
  Footer?: ReactNode;
}) => {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="flex w-full flex-col items-center gap-8 rounded-3xl border border-border bg-card px-6 py-10 shadow-2xl sm:px-12">
          <Logo />

          {title && <h1 className="text-3xl font-semibold">{title}</h1>}

          {children}
          <OAuthSection type="login" />

          {Footer}
        </div>
      </div>
    </main>
  );
};
