import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReadContract } from '../use-read-contract';
import { useWalletStore } from '@/stores/wallet-store';

// Mock useWallet hook
vi.mock('../use-wallet', () => ({
  useWallet: () => {
    const store = useWalletStore.getState();
    return {
      network: store.network,
    };
  },
}));

describe('useReadContract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useWalletStore.setState({
      isConnected: true,
      network: 'mainnet',
      address: null,
      btcAddress: null,
      isConnecting: false,
      error: null,
    });
  });

  it('should return initial loading state', () => {
    const { result } = renderHook(() =>
      useReadContract({
        contract: 'SP000000000000000000002Q6VF78.test-contract',
        functionName: 'get-value',
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should not fetch when disabled', () => {
    const { result } = renderHook(() =>
      useReadContract({
        contract: 'SP000000000000000000002Q6VF78.test-contract',
        functionName: 'get-value',
        enabled: false,
      })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should have refetch function', () => {
    const { result } = renderHook(() =>
      useReadContract({
        contract: 'SP000000000000000000002Q6VF78.test-contract',
        functionName: 'get-value',
        enabled: false,
      })
    );

    expect(typeof result.current.refetch).toBe('function');
  });

  it('should not fetch when contract is empty', () => {
    const { result } = renderHook(() =>
      useReadContract({
        contract: '',
        functionName: 'get-value',
      })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should not fetch when functionName is empty', () => {
    const { result } = renderHook(() =>
      useReadContract({
        contract: 'SP000000000000000000002Q6VF78.test-contract',
        functionName: '',
      })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('should use network from wallet', () => {
    useWalletStore.setState({ network: 'testnet' });

    const { result } = renderHook(() =>
      useReadContract({
        contract: 'ST000000000000000000002AMW42H.test-contract',
        functionName: 'get-value',
        enabled: false,
      })
    );

    // Hook should be initialized properly
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should accept args parameter', () => {
    const { result } = renderHook(() =>
      useReadContract({
        contract: 'SP000000000000000000002Q6VF78.test-contract',
        functionName: 'get-balance',
        args: [],
        enabled: false,
      })
    );

    expect(result.current.data).toBeNull();
    expect(typeof result.current.refetch).toBe('function');
  });
});
