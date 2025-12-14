import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-sm)] font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--background-secondary)] text-foreground border border-[var(--border)]',
        success:
          'bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/20',
        warning:
          'bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/20',
        error:
          'bg-[var(--error)]/15 text-[var(--error)] border border-[var(--error)]/20',
        info: 'bg-[var(--info)]/15 text-[var(--info)] border border-[var(--info)]/20',
        outline: 'bg-transparent text-foreground border border-[var(--border)]',
        primary:
          'bg-[var(--bitcoin-orange)]/15 text-[var(--bitcoin-orange)] border border-[var(--bitcoin-orange)]/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        default: 'px-2.5 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
