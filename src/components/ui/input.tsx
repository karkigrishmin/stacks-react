import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-[var(--radius-md)] border bg-[var(--background-secondary)] px-4 py-2 text-body-md text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--foreground-tertiary)] focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-[var(--border)] focus-visible:border-[var(--bitcoin-orange)] focus-visible:ring-[var(--bitcoin-orange)]/30',
        error:
          'border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/30',
      },
      inputSize: {
        default: 'h-10',
        sm: 'h-9 text-body-sm px-3',
        lg: 'h-12 text-body-lg px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, leftIcon, rightIcon, error, ...props }, ref) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;
    const effectiveVariant = error ? 'error' : variant;

    return (
      <div className="relative w-full">
        {hasLeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-tertiary)]">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant: effectiveVariant, inputSize, className }),
            hasLeftIcon && 'pl-10',
            hasRightIcon && 'pr-10',
          )}
          ref={ref}
          {...props}
        />
        {hasRightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-tertiary)]">
            {rightIcon}
          </div>
        )}
        {error && <p className="mt-1.5 text-caption text-[var(--error)]">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
