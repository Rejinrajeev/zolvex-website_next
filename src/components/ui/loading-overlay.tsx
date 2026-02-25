"use client";

import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingOverlay({ 
  isLoading, 
  text = "Loading...", 
  fullScreen = false,
  className 
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className={cn(
      "flex items-center justify-center bg-background/80 backdrop-blur-sm z-50",
      fullScreen ? "fixed inset-0" : "absolute inset-0",
      className
    )}>
      <Spinner size="lg" text={text} />
    </div>
  );
}