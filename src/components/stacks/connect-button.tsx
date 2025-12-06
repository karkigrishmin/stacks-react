import { useState } from 'react';
import { ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react';
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
          onClick={() => setModalOpen(true)}
          disabled={isConnecting}
          className={cn(className)}
        >
          {isConnecting ? 'Connecting...' : label}
        </Button>
        <WalletModal open={modalOpen} onOpenChange={setModalOpen} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn('gap-2', className)}>
          <div className="flex items-center gap-2">
            {showNetwork && <NetworkBadge network={network} />}
            {showBalance && <BalanceDisplay />}
            {address && (
              <AddressDisplay address={address} copyable={false} />
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Connected</span>
            {address && (
              <AddressDisplay
                address={address}
                truncateLength={6}
                copyable={false}
              />
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleViewExplorer}>
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={disconnect}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
