import * as React from 'react';
import { cn } from '@/lib/utils';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-md)] bg-[var(--background-secondary)] motion-safe:animate-shimmer motion-safe:bg-gradient-to-r motion-safe:from-[var(--background-secondary)] motion-safe:via-[var(--card)] motion-safe:to-[var(--background-secondary)] motion-safe:bg-[length:200%_100%]',
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };
