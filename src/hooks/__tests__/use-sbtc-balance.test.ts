import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSbtcBalance } from '../use-sbtc-balance';
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

// Mock useReadContract hook
const mockUseReadContract = vi.fn();

vi.mock('../use-read-contract', () => ({
  useReadContract: (options: { enabled?: boolean }) => mockUseReadContract(options),
}));

describe('useSbtcBalance', () => {
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

  it('should return loading state initially', () => {
    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSbtcBalance());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.balance).toBeNull();
  });

  it('should format sBTC balance correctly', async () => {
    // Mock 1 sBTC (100000000 satoshis)
    mockUseReadContract.mockReturnValue({
      data: { value: BigInt('100000000') },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSbtcBalance());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.balance).toBe('1');
  });

  it('should format fractional sBTC balance', async () => {
    // Mock 0.5 sBTC (50000000 satoshis)
    mockUseReadContract.mockReturnValue({
      data: { value: BigInt('50000000') },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSbtcBalance());

    expect(result.current.balance).toBe('0.5');
  });

  it('should handle bigint data directly', async () => {
    mockUseReadContract.mockReturnValue({
      data: BigInt('250000000'), // 2.5 sBTC
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSbtcBalance());

    expect(result.current.balance).toBe('2.5');
  });

  it('should return null balance when data is null', () => {
    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSbtcBalance());

    expect(result.current.balance).toBeNull();
  });

  it('should pass error from useReadContract', () => {
    const error = new Error('Contract read failed');
    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useSbtcBalance());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(error);
  });

  it('should use mainnet contract for mainnet network', () => {
    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderHook(() => useSbtcBalance());

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        contract: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token',
        functionName: 'get-balance',
      })
    );
  });

  it('should use testnet contract for testnet network', () => {
    useWalletStore.setState({ network: 'testnet' });

    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderHook(() => useSbtcBalance());

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        contract: 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token',
      })
    );
  });

  it('should accept custom address parameter', () => {
    const customAddress = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';

    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderHook(() => useSbtcBalance({ address: customAddress }));

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
      })
    );
  });

  it('should respect enabled option', () => {
    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderHook(() => useSbtcBalance({ enabled: false }));

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      })
    );
  });

  it('should have refetch function', () => {
    const mockRefetch = vi.fn();
    mockUseReadContract.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useSbtcBalance());

    expect(result.current.refetch).toBe(mockRefetch);
  });
});
