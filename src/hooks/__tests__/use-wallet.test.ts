import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useWallet } from '../use-wallet';
import { useWalletStore } from '@/stores/wallet-store';
import { MOCK_STX_ADDRESS, MOCK_BTC_ADDRESS } from '@/test/mocks/handlers';

// Mock @stacks/connect
const mockRequest = vi.fn();
const mockDisconnect = vi.fn();
const mockGetLocalStorage = vi.fn();

vi.mock('@stacks/connect', () => ({
  request: (...args: unknown[]) => mockRequest(...args),
  disconnect: () => mockDisconnect(),
  getLocalStorage: () => mockGetLocalStorage(),
}));

describe('useWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLocalStorage.mockReturnValue(null);
    // Reset store state
    useWalletStore.setState({
      isConnected: false,
      isConnecting: false,
      address: null,
      btcAddress: null,
      network: 'mainnet',
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return disconnected state initially', () => {
    const { result } = renderHook(() => useWallet());

    expect(result.current.isConnected).toBe(false);
    expect(result.current.isConnecting).toBe(false);
    expect(result.current.address).toBeNull();
    expect(result.current.btcAddress).toBeNull();
    expect(result.current.network).toBe('mainnet');
    expect(result.current.error).toBeNull();
  });

  it('should have connect and disconnect functions', () => {
    const { result } = renderHook(() => useWallet());

    expect(typeof result.current.connect).toBe('function');
    expect(typeof result.current.disconnect).toBe('function');
    expect(typeof result.current.setNetwork).toBe('function');
  });

  it('should set loading state appropriately during connection', async () => {
    // Test that isConnecting is false after connection completes
    mockRequest.mockResolvedValue({});
    mockGetLocalStorage.mockReturnValue({
      addresses: {
        stx: [{ address: MOCK_STX_ADDRESS }],
      },
    });

    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    // After connection, isConnecting should be false
    expect(result.current.isConnecting).toBe(false);
    expect(result.current.isConnected).toBe(true);
  });

  it('should handle successful connection', async () => {
    mockRequest.mockResolvedValue({});
    mockGetLocalStorage.mockReturnValue({
      addresses: {
        stx: [{ address: MOCK_STX_ADDRESS }],
        btc: [{ address: MOCK_BTC_ADDRESS }],
      },
    });

    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    expect(result.current.isConnected).toBe(true);
    expect(result.current.address).toBe(MOCK_STX_ADDRESS);
    expect(result.current.btcAddress).toBe(MOCK_BTC_ADDRESS);
    expect(result.current.isConnecting).toBe(false);
  });

  it('should handle connection without BTC address', async () => {
    mockRequest.mockResolvedValue({});
    mockGetLocalStorage.mockReturnValue({
      addresses: {
        stx: [{ address: MOCK_STX_ADDRESS }],
      },
    });

    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    expect(result.current.isConnected).toBe(true);
    expect(result.current.address).toBe(MOCK_STX_ADDRESS);
    expect(result.current.btcAddress).toBeNull();
  });

  it('should handle connection error when no address returned', async () => {
    mockRequest.mockResolvedValue({});
    mockGetLocalStorage.mockReturnValue({
      addresses: { stx: [] },
    });

    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    expect(result.current.isConnected).toBe(false);
    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe('No STX address found');
  });

  it('should handle wallet not found error', async () => {
    mockRequest.mockRejectedValue(new Error("Cannot use 'in' operator"));

    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    expect(result.current.isConnected).toBe(false);
    expect(result.current.error?.message).toContain('Wallet not found');
  });

  it('should handle disconnect', () => {
    // First set connected state
    useWalletStore.setState({
      isConnected: true,
      address: MOCK_STX_ADDRESS,
      btcAddress: MOCK_BTC_ADDRESS,
    });

    const { result } = renderHook(() => useWallet());

    act(() => {
      result.current.disconnect();
    });

    expect(mockDisconnect).toHaveBeenCalled();
    expect(result.current.isConnected).toBe(false);
    expect(result.current.address).toBeNull();
    expect(result.current.btcAddress).toBeNull();
  });

  it('should switch network', () => {
    const { result } = renderHook(() => useWallet());

    act(() => {
      result.current.setNetwork('testnet');
    });

    expect(result.current.network).toBe('testnet');

    act(() => {
      result.current.setNetwork('mainnet');
    });

    expect(result.current.network).toBe('mainnet');
  });

  it('should recover session from localStorage on mount', async () => {
    mockGetLocalStorage.mockReturnValue({
      addresses: {
        stx: [{ address: MOCK_STX_ADDRESS }],
        btc: [{ address: MOCK_BTC_ADDRESS }],
      },
    });

    const { result } = renderHook(() => useWallet());

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });

    expect(result.current.address).toBe(MOCK_STX_ADDRESS);
    expect(result.current.btcAddress).toBe(MOCK_BTC_ADDRESS);
  });
});
