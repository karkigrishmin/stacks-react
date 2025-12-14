import { useState } from 'react';
import {
  ChevronDown,
  LogOut,
  Copy,
  ExternalLink,
  Wallet,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WalletModal } from './wallet-modal';
import { AddressDisplay } from './address-display';
import { NetworkBadge } from './network-badge';
import { BalanceDisplay } from './balance-display';
import { useWallet } from '@/hooks/use-wallet';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ConnectButtonProps {
  showBalance?: boolean;
  showNetwork?: boolean;
  label?: string;
  className?: string;
}

export function ConnectButton({
  showBalance = false,
  showNetwork = false,
  label = 'Connect Wallet',
  className,
}: ConnectButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { isConnected, isConnecting, address, network, disconnect } =
    useWallet();

  const handleCopyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    } catch {
      toast.error('Failed to copy address');
    }
  };

  const handleViewExplorer = () => {
    if (!address) return;
    const baseUrl =
      network === 'mainnet'
        ? 'https://explorer.stacks.co'
        : 'https://explorer.stacks.co/?chain=testnet';
    window.open(`${baseUrl}/address/${address}`, '_blank');
  };

  if (!isConnected) {
    return (
      <>
        <Button
          variant="primary"
          onClick={() => setModalOpen(true)}
          disabled={isConnecting}
          className={cn('gap-2', className)}
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4" />
              {label}
            </>
          )}
        </Button>
        <WalletModal open={modalOpen} onOpenChange={setModalOpen} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={cn('gap-2', className)}>
          <div className="flex items-center gap-2">
            {showNetwork && <NetworkBadge network={network} />}
            {showBalance && <BalanceDisplay />}
            {address && <AddressDisplay address={address} copyable={false} />}
          </div>
          <ChevronDown className="h-4 w-4 text-[var(--foreground-secondary)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border-[var(--border)] bg-[var(--card-elevated)]"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--foreground-tertiary)]">
              Connected
            </span>
            {address && (
              <AddressDisplay
                address={address}
                truncateLength={6}
                copyable={false}
                className="px-0"
              />
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[var(--border)]" />
        <DropdownMenuItem
          onClick={handleCopyAddress}
          className="cursor-pointer text-[var(--foreground)] focus:bg-[var(--background-secondary)] focus:text-[var(--foreground)]"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleViewExplorer}
          className="cursor-pointer text-[var(--foreground)] focus:bg-[var(--background-secondary)] focus:text-[var(--foreground)]"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[var(--border)]" />
        <DropdownMenuItem
          onClick={disconnect}
          className="focus:bg-[var(--error)]/10 cursor-pointer text-[var(--error)] focus:text-[var(--error)]"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
