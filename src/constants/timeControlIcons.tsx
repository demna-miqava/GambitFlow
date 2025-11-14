import { Bolt, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const TIME_CONTROL_ICONS = {
  bullet: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Bolt>) => (
    <Bolt className={cn("text-amber-300", className)} {...props} />
  ),
  blitz: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Zap>) => (
    <Zap className={cn("text-amber-400", className)} {...props} />
  ),
  rapid: ({
    className,
    ...props
  }: { className?: string } & React.ComponentProps<typeof Clock>) => (
    <Clock className={cn("text-green-400", className)} {...props} />
  ),
};
