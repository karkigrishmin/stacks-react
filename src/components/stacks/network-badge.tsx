import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Network } from '@/stores/wallet-store';

interface NetworkBadgeProps {
  network: Network;
  className?: string;
}

export function NetworkBadge({ network, className }: NetworkBadgeProps) {
  const isMainnet = network === 'mainnet';

  return (
    <Badge
      variant={isMainnet ? 'success' : 'warning'}
      className={cn('gap-1.5', className)}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          isMainnet ? 'bg-[var(--success)]' : 'bg-[var(--warning)]'
        )}
      />
      {isMainnet ? 'Mainnet' : 'Testnet'}
    </Badge>
  );
}
