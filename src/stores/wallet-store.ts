import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Network = 'mainnet' | 'testnet';

interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  btcAddress: string | null;
  network: Network;
  error: Error | null;
}

interface WalletActions {
  setConnecting: (connecting: boolean) => void;
  setConnected: (address: string, btcAddress: string | null) => void;
  setDisconnected: () => void;
  setNetwork: (network: Network) => void;
  setError: (error: Error | null) => void;
}

export type WalletStore = WalletState & WalletActions;

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      isConnected: false,
      isConnecting: false,
      address: null,
      btcAddress: null,
      network: 'mainnet',
      error: null,

      setConnecting: (connecting) => set({ isConnecting: connecting }),
      setConnected: (address, btcAddress) =>
        set({
          isConnected: true,
          isConnecting: false,
          address,
          btcAddress,
          error: null,
        }),
      setDisconnected: () =>
        set({
          isConnected: false,
          address: null,
          btcAddress: null,
        }),
      setNetwork: (network) => set({ network }),
      setError: (error) => set({ error, isConnecting: false }),
    }),
    { name: 'stacks-wallet' },
  ),
);
