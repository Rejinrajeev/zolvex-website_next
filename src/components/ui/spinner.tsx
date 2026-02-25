import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12"
};

export function Spinner({ size = "md", className, text }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div className={cn(
          "border-4 border-primary/30 rounded-full animate-spin border-t-primary",
          sizeClasses[size],
          className
        )} />
        {size === "lg" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
          </div>
        )}
      </div>
      {text && <p className="text-sm text-muted animate-pulse">{text}</p>}
    </div>
  );
}

// Simple spinning icon variant
export function SpinnerIcon({ size = "md", className }: SpinnerProps) {
  return (
    <Loader2 className={cn(
      "animate-spin text-primary",
      sizeClasses[size],
      className
    )} />
  );
}