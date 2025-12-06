import { cn } from '@/lib/utils';
import type { Network } from '@/stores/wallet-store';

interface NetworkBadgeProps {
  network: Network;
  className?: string;
}

export function NetworkBadge({ network, className }: NetworkBadgeProps) {
  const isMainnet = network === 'mainnet';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        isMainnet
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        className
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          isMainnet ? 'bg-green-500' : 'bg-yellow-500'
        )}
      />
      {isMainnet ? 'Mainnet' : 'Testnet'}
    </div>
  );
}
