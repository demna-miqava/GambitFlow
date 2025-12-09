import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface MoveControl {
  id: string;
  icon: LucideIcon;
  title: string;
  onClick: () => void;
  disabled: boolean;
}

interface BaseMoveControlsProps {
  controls: MoveControl[];
  additionalActions?: ReactNode;
  className?: string;
}

export const BaseMoveControls = ({
  controls,
  additionalActions,
  className,
}: BaseMoveControlsProps) => {
  return (
    <div className={className}>
      <nav className="flex w-full gap-2" aria-label="Move navigation">
        {controls.map((control) => (
          <Button
            key={control.id}
            type="button"
            className="flex flex-1 items-center justify-center rounded-md bg-secondary py-2 text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-50"
            title={control.title}
            aria-label={control.title}
            onClick={control.onClick}
            disabled={control.disabled}
          >
            <control.icon className="size-4" aria-hidden="true" />
          </Button>
        ))}
      </nav>
      {additionalActions}
    </div>
  );
};
