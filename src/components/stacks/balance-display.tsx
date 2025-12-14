import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useBalance } from '@/hooks/use-balance';
import { Skeleton } from '@/components/ui/skeleton';
import { fadeIn } from '@/lib/animation/variants';

interface BalanceDisplayProps {
  address?: string;
  showSymbol?: boolean;
  className?: string;
}

export function BalanceDisplay({
  address,
  showSymbol = true,
  className,
}: BalanceDisplayProps) {
  const { balance, isLoading, isError, error } = useBalance({ address });

  if (!balance && !isLoading && !isError) {
    return null;
  }

  if (isLoading) {
    return <Skeleton className={cn('h-5 w-16', className)} />;
  }

  if (isError) {
    return (
      <span className={cn('text-sm text-[var(--error)]', className)}>
        {error?.message || 'Failed to load'}
      </span>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key="balance"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className={cn(
          'text-sm font-medium text-[var(--foreground)]',
          className
        )}
      >
        {balance}
        {showSymbol && (
          <span className="ml-1 text-[var(--foreground-secondary)]">STX</span>
        )}
      </motion.span>
    </AnimatePresence>
  );
}
