import { cn } from '@/lib/utils';
import { useTransactionStatus, type TxStatus } from '@/hooks/use-transaction-status';
import { useWallet } from '@/hooks/use-wallet';
import { Loader2, CheckCircle2, XCircle, HelpCircle, ExternalLink } from 'lucide-react';

interface TransactionStatusProps {
  txId: string | null;
  className?: string;
  showExplorerLink?: boolean;
}

function getExplorerUrl(txId: string, network: 'mainnet' | 'testnet'): string {
  const base = 'https://explorer.stacks.co';
  const chainParam = network === 'testnet' ? '?chain=testnet' : '';
  return `${base}/txid/${txId}${chainParam}`;
}

function getStatusConfig(status: TxStatus | null): {
  icon: React.ReactNode;
  text: string;
  className: string;
} {
  switch (status) {
    case 'pending':
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        text: 'Confirming...',
        className: 'text-muted-foreground',
      };
    case 'success':
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        text: 'Confirmed',
        className: 'text-green-600 dark:text-green-500',
      };
    case 'abort_by_response':
    case 'abort_by_post_condition':
      return {
        icon: <XCircle className="h-4 w-4" />,
        text: 'Failed',
        className: 'text-destructive',
      };
    case 'dropped_replace_by_fee':
    case 'dropped_replace_across_fork':
    case 'dropped_too_expensive':
    case 'dropped_stale_garbage_collect':
      return {
        icon: <XCircle className="h-4 w-4" />,
        text: 'Dropped',
        className: 'text-yellow-600 dark:text-yellow-500',
      };
    case 'not_found':
      return {
        icon: <HelpCircle className="h-4 w-4" />,
        text: 'Not found',
        className: 'text-muted-foreground',
      };
    default:
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        text: 'Loading...',
        className: 'text-muted-foreground',
      };
  }
}

export function TransactionStatus({
  txId,
  className,
  showExplorerLink = true,
}: TransactionStatusProps) {
  const { status, isLoading, error } = useTransactionStatus({ txId });
  const { network } = useWallet();

  if (!txId) {
    return null;
  }

  if (error) {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <XCircle className="h-4 w-4 text-destructive" />
        <span className="text-destructive">Error checking status</span>
      </div>
    );
  }

  const config = isLoading && !status
    ? getStatusConfig(null)
    : getStatusConfig(status);

  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      <span className={config.className}>{config.icon}</span>
      <span className={config.className}>{config.text}</span>
      {showExplorerLink && txId && (
        <a
          href={getExplorerUrl(txId, network)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          <span className="sr-only">View on explorer</span>
        </a>
      )}
    </div>
  );
}
