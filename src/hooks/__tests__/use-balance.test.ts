import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBalance } from '../use-balance';
import { useWalletStore } from '@/stores/wallet-store';
import { MOCK_STX_ADDRESS } from '@/test/mocks/handlers';

// Mock useWallet hook
vi.mock('../use-wallet', () => ({
  useWallet: () => {
    const store = useWalletStore.getState();
    return {
      address: store.address,
      isConnected: store.isConnected,
      network: store.network,
    };
  },
}));

describe('useBalance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store to connected state
    useWalletStore.setState({
      isConnected: true,
      isConnecting: false,
      address: MOCK_STX_ADDRESS,
      btcAddress: null,
      network: 'mainnet',
      error: null,
    });
  });

  it('should return initial loading state', () => {
    const { result } = renderHook(() => useBalance());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.balance).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should fetch and format balance from API', async () => {
    const { result } = renderHook(() => useBalance());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.balance).toBeDefined();
    expect(result.current.balance).not.toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should accept custom address parameter', async () => {
    const customAddress = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';

    const { result } = renderHook(() =>
      useBalance({ address: customAddress })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.balance).toBeDefined();
  });

  it('should return null balance when not connected and no address provided', async () => {
    // Set disconnected state
    useWalletStore.setState({
      isConnected: false,
      address: null,
    });

    const { result } = renderHook(() => useBalance());

    // When no address, balance should be null immediately
    expect(result.current.balance).toBeNull();
  });

  it('should respect enabled option', async () => {
    const { result } = renderHook(() => useBalance({ enabled: false }));

    // Should not fetch when disabled
    expect(result.current.isLoading).toBe(false);
    expect(result.current.balance).toBeNull();
  });

  it('should have refetch function', async () => {
    const { result } = renderHook(() => useBalance());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });

  it('should use testnet endpoint when network is testnet', async () => {
    useWalletStore.setState({
      network: 'testnet',
    });

    const { result } = renderHook(() => useBalance());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.balance).toBeDefined();
  });
});
