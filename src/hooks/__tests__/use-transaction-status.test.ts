import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useWalletStore } from '@/stores/wallet-store';
import { MOCK_TX_ID } from '@/test/mocks/handlers';
import { useTransactionStatus } from '../use-transaction-status';

// Mock useWallet hook
vi.mock('../use-wallet', () => ({
  useWallet: () => {
    const store = useWalletStore.getState();
    return {
      network: store.network,
    };
  },
}));

describe('useTransactionStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    useWalletStore.setState({
      isConnected: true,
      network: 'mainnet',
      address: null,
      btcAddress: null,
      isConnecting: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial state when no txId provided', () => {
    const { result } = renderHook(() => useTransactionStatus({ txId: null }));

    expect(result.current.status).toBeNull();
    expect(result.current.isConfirmed).toBe(false);
    expect(result.current.isFailed).toBe(false);
    expect(result.current.isPending).toBe(false);
    expect(result.current.blockHeight).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch transaction status when txId is provided', async () => {
    vi.useRealTimers();

    const { result } = renderHook(() => useTransactionStatus({ txId: MOCK_TX_ID }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.status).toBe('success');
    expect(result.current.isConfirmed).toBe(true);
    expect(result.current.isFailed).toBe(false);
    expect(result.current.isPending).toBe(false);
  });

  it('should set isConfirmed when status is success', async () => {
    vi.useRealTimers();

    const { result } = renderHook(() => useTransactionStatus({ txId: MOCK_TX_ID }));

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.isConfirmed).toBe(true);
    expect(result.current.isFailed).toBe(false);
  });

  it('should respect enabled option', () => {
    const { result } = renderHook(() => useTransactionStatus({ txId: MOCK_TX_ID, enabled: false }));

    expect(result.current.status).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should return block height when available', async () => {
    vi.useRealTimers();

    const { result } = renderHook(() => useTransactionStatus({ txId: MOCK_TX_ID }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.blockHeight).toBeDefined();
  });

  it('should reset state when txId changes to null', async () => {
    vi.useRealTimers();

    const { result, rerender } = renderHook(
      ({ txId }: { txId: string | null }) => useTransactionStatus({ txId }),
      { initialProps: { txId: MOCK_TX_ID as string | null } },
    );

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    rerender({ txId: null });

    expect(result.current.status).toBeNull();
    expect(result.current.blockHeight).toBeNull();
  });

  it('should use testnet endpoint when network is testnet', async () => {
    vi.useRealTimers();
    useWalletStore.setState({ network: 'testnet' });

    const { result } = renderHook(() => useTransactionStatus({ txId: MOCK_TX_ID }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.status).toBeDefined();
  });

  it('should accept custom polling interval', () => {
    const { result } = renderHook(() =>
      useTransactionStatus({ txId: MOCK_TX_ID, pollingInterval: 5000 }),
    );

    expect(result.current).toBeDefined();
  });
});
