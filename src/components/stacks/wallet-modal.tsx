import { useEffect, useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { useWalletStore } from '@/stores/wallet-store';
import { Loader2, ExternalLink } from 'lucide-react';
import { DEFAULT_PROVIDERS, type WebBTCProvider } from '@stacks/connect';
import { getProviderFromId, setSelectedProviderId } from '@stacks/connect-ui';

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
    return DEFAULT_PROVIDERS.filter(
      (p) => p.id !== 'WalletConnectProvider'
    ).map((provider) => ({
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
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to this app
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          {providers.map((provider) => {
            const isThisConnecting = connectingId === provider.id;

            return (
              <Button
                key={provider.id}
                variant="outline"
                className="h-auto justify-start gap-3 p-4"
                onClick={() =>
                  provider.isInstalled
                    ? handleConnect(provider)
                    : handleInstall(provider)
                }
                disabled={isConnecting}
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-muted">
                  {provider.icon && (
                    <img
                      src={provider.icon}
                      alt={provider.name}
                      className="h-8 w-8"
                    />
                  )}
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="font-semibold">{provider.name}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {provider.isInstalled ? (
                    isThisConnecting && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )
                  ) : (
                    <>
                      <span className="text-xs text-muted-foreground">
                        Install
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {error && (
          <p className="text-center text-sm text-destructive">
            {error.message}
          </p>
        )}

        <p className="text-center text-xs text-muted-foreground">
          By connecting, you agree to the Terms of Service
        </p>
      </DialogContent>
    </Dialog>
  );
}
