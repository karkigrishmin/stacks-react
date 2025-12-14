import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonHover, buttonTap } from '@/lib/animation/variants';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--bitcoin-orange)] text-[var(--primary-foreground)] hover:bg-[var(--bitcoin-orange-light)] active:bg-[var(--bitcoin-orange-dark)]',
        secondary:
          'bg-transparent text-foreground border border-[var(--border)] hover:bg-[var(--background-secondary)] hover:border-[var(--border-strong)]',
        ghost:
          'bg-transparent text-foreground hover:bg-[var(--background-secondary)]',
        outline:
          'bg-transparent text-[var(--bitcoin-orange)] border border-[var(--bitcoin-orange)] hover:bg-[var(--bitcoin-orange-muted)]',
        destructive: 'bg-[var(--error)] text-white hover:bg-[var(--error)]/90',
        link: 'text-[var(--bitcoin-orange)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends
    Omit<HTMLMotionProps<'button'>, 'ref'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...(props as React.ComponentPropsWithoutRef<typeof Slot>)}
        />
      );
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={buttonHover}
        whileTap={buttonTap}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
