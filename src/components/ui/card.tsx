import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';
import { cardHover } from '@/lib/animation/variants';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-[var(--radius-lg)] border transition-all duration-[var(--duration-normal)]',
  {
    variants: {
      variant: {
        default: 'bg-card border-[var(--border)]',
        elevated:
          'bg-[var(--card-elevated)] border-[var(--border-strong)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]',
        gradient:
          'bg-card border-transparent bg-clip-padding [background:linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(135deg,rgba(247,147,26,0.3),transparent_50%)_border-box]',
        glow: 'bg-card border-[var(--bitcoin-orange)]/20 hover:shadow-[0_0_30px_rgba(247,147,26,0.1)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'ref'>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        whileHover={hover ? cardHover : undefined}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-heading-lg tracking-tight', className)} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-body-sm text-[var(--foreground-secondary)]', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
