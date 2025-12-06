import { useCallback, useEffect } from 'react';
import {
  request,
  disconnect,
  getLocalStorage,
  type StacksProvider,
} from '@stacks/connect';
import { useWalletStore, type Network } from '@/stores/wallet-store';

export function useWallet() {
  const store = useWalletStore();

  useEffect(() => {
    const storage = getLocalStorage();
    if (storage?.addresses?.stx?.[0]?.address) {
      const stxAddress = storage.addresses.stx[0].address;
      const btcAddress = storage.addresses.btc?.[0]?.address || null;
      store.setConnected(stxAddress, btcAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnect = useCallback(
    async (provider?: StacksProvider): Promise<boolean> => {
      store.setConnecting(true);
      store.setError(null);
      try {
        await request({ provider, forceWalletSelect: !provider }, 'getAddresses');
        const storage = getLocalStorage();
        const stxAddress = storage?.addresses?.stx?.[0]?.address;
        const btcAddress = storage?.addresses?.btc?.[0]?.address;

        if (stxAddress) {
          store.setConnected(stxAddress, btcAddress || null);
          return true;
        } else {
          throw new Error('No STX address found');
        }
      } catch (error) {
        let message = 'Connection failed';
        if (error instanceof Error) {
          if (
            error.message.includes("'in' operator") ||
            error.message.includes('undefined')
          ) {
            message = 'Wallet not found. Please install a Stacks wallet extension.';
          } else {
            message = error.message;
          }
        }
        store.setError(new Error(message));
        return false;
      } finally {
        store.setConnecting(false);
      }
    },
    [store]
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
    store.setDisconnected();
  }, [store]);

  const handleSetNetwork = useCallback(
    (network: Network) => {
      store.setNetwork(network);
    },
    [store]
  );

  return {
    isConnected: store.isConnected,
    isConnecting: store.isConnecting,
    address: store.address,
    btcAddress: store.btcAddress,
    network: store.network,
    error: store.error,
    connect: handleConnect,
    disconnect: handleDisconnect,
    setNetwork: handleSetNetwork,
  };
}
