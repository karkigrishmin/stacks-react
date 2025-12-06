import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useWalletStore, type WalletStore } from '@/stores/wallet-store';
import { beforeEach } from 'vitest';

// Initial store state for resetting between tests
const initialStoreState: Omit<
  WalletStore,
  | 'setConnecting'
  | 'setConnected'
  | 'setDisconnected'
  | 'setNetwork'
  | 'setError'
> = {
  isConnected: false,
  isConnecting: false,
  address: null,
  btcAddress: null,
  network: 'mainnet',
  error: null,
};

// Reset store before each test
export function resetWalletStore() {
  useWalletStore.setState(initialStoreState);
}

// Setup function to call in test files
export function setupStoreReset() {
  beforeEach(() => {
    resetWalletStore();
  });
}

// Set connected state for testing
export function setConnectedState(
  address: string,
  btcAddress: string | null = null
) {
  useWalletStore.setState({
    isConnected: true,
    isConnecting: false,
    address,
    btcAddress,
    error: null,
  });
}

// Custom wrapper with providers
function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

// Custom render with providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Helper to wait for async state updates
export const waitForStateUpdate = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// Helper to create mock Stacks transaction
export function createMockTransaction(overrides = {}) {
  return {
    txId: '0x' + '1234567890abcdef'.repeat(4),
    tx_status: 'pending',
    tx_type: 'contract_call',
    sender_address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    ...overrides,
  };
}

// Helper to create mock balance response
export function createMockBalance(stxAmount: number, sbtcAmount = 0) {
  return {
    stx: {
      balance: String(stxAmount * 1_000_000), // Convert to micro-STX
      locked: '0',
    },
    fungible_tokens:
      sbtcAmount > 0
        ? {
            'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token':
              {
                balance: String(sbtcAmount * 100_000_000), // Convert to satoshis
              },
          }
        : {},
  };
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { customRender as render };
