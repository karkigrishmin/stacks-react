import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  useTransactionStatus,
  type TxStatus,
} from '@/hooks/use-transaction-status';
import { useWallet } from '@/hooks/use-wallet';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { fadeIn } from '@/lib/animation/variants';

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

type StatusConfig = {
  icon: React.ReactNode;
  text: string;
  variant: 'default' | 'success' | 'error' | 'warning' | 'info';
};

function getStatusConfig(status: TxStatus | null): StatusConfig {
  switch (status) {
    case 'pending':
      return {
        icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
        text: 'Confirming...',
        variant: 'default',
      };
    case 'success':
      return {
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        text: 'Confirmed',
        variant: 'success',
      };
    case 'abort_by_response':
    case 'abort_by_post_condition':
      return {
        icon: <XCircle className="h-3.5 w-3.5" />,
        text: 'Failed',
        variant: 'error',
      };
    case 'dropped_replace_by_fee':
    case 'dropped_replace_across_fork':
    case 'dropped_too_expensive':
    case 'dropped_stale_garbage_collect':
      return {
        icon: <XCircle className="h-3.5 w-3.5" />,
        text: 'Dropped',
        variant: 'warning',
      };
    case 'not_found':
      return {
        icon: <HelpCircle className="h-3.5 w-3.5" />,
        text: 'Not found',
        variant: 'default',
      };
    default:
      return {
        icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
        text: 'Loading...',
        variant: 'default',
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
        <Badge variant="error" className="gap-1.5">
          <XCircle className="h-3.5 w-3.5" />
          Error checking status
        </Badge>
      </div>
    );
  }

  const config =
    isLoading && !status ? getStatusConfig(null) : getStatusConfig(status);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status || 'loading'}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn('flex items-center gap-2 text-sm', className)}
      >
        <Badge variant={config.variant} className="gap-1.5">
          {config.icon}
          {config.text}
        </Badge>
        {showExplorerLink && txId && (
          <a
            href={getExplorerUrl(txId, network)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[var(--foreground-tertiary)] transition-colors hover:text-[var(--bitcoin-orange)]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="sr-only">View on explorer</span>
          </a>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
