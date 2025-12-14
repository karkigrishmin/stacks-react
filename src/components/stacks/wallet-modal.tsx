import { DEFAULT_PROVIDERS, type WebBTCProvider } from '@stacks/connect';
import { getProviderFromId, setSelectedProviderId } from '@stacks/connect-ui';
import { motion } from 'framer-motion';
import { ExternalLink, Loader2, Wallet } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useWallet } from '@/hooks/use-wallet';
import { staggerContainer, staggerItem } from '@/lib/animation/variants';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/stores/wallet-store';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ProviderWithStatus = WebBTCProvider & { isInstalled: boolean };

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { connect, isConnecting, error } = useWallet();
  const setError = useWalletStore((state) => state.setError);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const providers = useMemo<ProviderWithStatus[]>(() => {
    if (typeof window === 'undefined') return [];
    return DEFAULT_PROVIDERS.filter((p) => p.id !== 'WalletConnectProvider').map((provider) => ({
      ...provider,
      isInstalled: !!getProviderFromId(provider.id),
    }));
  }, []);

  useEffect(() => {
    if (open) {
      setError(null);
      setConnectingId(null);
    }
  }, [open, setError]);

  const handleConnect = async (provider: ProviderWithStatus) => {
    setConnectingId(provider.id);
    setSelectedProviderId(provider.id);
    const stacksProvider = getProviderFromId(provider.id);
    const success = await connect(stacksProvider);
    setConnectingId(null);
    if (success) {
      onOpenChange(false);
    }
  };

  const handleInstall = (provider: WebBTCProvider) => {
    const url = provider.chromeWebStoreUrl || provider.webUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--bitcoin-orange-muted)]">
              <Wallet className="h-5 w-5 text-[var(--bitcoin-orange)]" />
            </div>
            <div>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>Choose a wallet to connect to this app</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2 py-4"
        >
          {providers.map((provider) => {
            const isThisConnecting = connectingId === provider.id;

            return (
              <motion.button
                key={provider.id}
                variants={staggerItem}
                onClick={() =>
                  provider.isInstalled ? handleConnect(provider) : handleInstall(provider)
                }
                disabled={isConnecting}
                aria-label={
                  provider.isInstalled ? `Connect to ${provider.name}` : `Install ${provider.name}`
                }
                className={cn(
                  'flex w-full items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-4 text-left transition-all',
                  'hover:border-[var(--border-strong)] hover:bg-[var(--background-secondary)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  'disabled:pointer-events-none disabled:opacity-50',
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[var(--background-secondary)]">
                  {provider.icon && (
                    <img src={provider.icon} alt={provider.name} className="h-8 w-8" />
                  )}
                </div>
                <div className="flex flex-1 flex-col items-start">
                  <span className="font-semibold text-[var(--foreground)]">{provider.name}</span>
                  {provider.isInstalled && (
                    <Badge variant="success" size="sm" className="mt-1">
                      Installed
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {provider.isInstalled ? (
                    isThisConnecting && (
                      <Loader2 className="h-4 w-4 animate-spin text-[var(--bitcoin-orange)]" />
                    )
                  ) : (
                    <Badge variant="outline" size="sm" className="gap-1">
                      Install
                      <ExternalLink className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {error && <p className="text-center text-sm text-[var(--error)]">{error.message}</p>}

        <p className="text-center text-xs text-[var(--foreground-tertiary)]">
          By connecting, you agree to the Terms of Service
        </p>
      </DialogContent>
    </Dialog>
  );
}
