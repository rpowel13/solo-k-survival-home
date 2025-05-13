
import { cn } from "@/lib/utils"
import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = React.memo(({
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
});

Skeleton.displayName = "Skeleton";

export { Skeleton }
