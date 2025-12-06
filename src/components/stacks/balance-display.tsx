import { cn } from '@/lib/utils';
import { useBalance } from '@/hooks/use-balance';

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
    return (
      <span
        className={cn('animate-pulse text-sm text-muted-foreground', className)}
      >
        Loading...
      </span>
    );
  }

  if (isError) {
    return (
      <span className={cn('text-sm text-destructive', className)}>
        {error?.message || 'Failed to load'}
      </span>
    );
  }

  return (
    <span className={cn('text-sm font-medium', className)}>
      {balance}
      {showSymbol && <span className="ml-1 text-muted-foreground">STX</span>}
    </span>
  );
}
