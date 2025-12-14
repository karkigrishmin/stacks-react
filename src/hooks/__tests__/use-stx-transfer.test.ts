import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MOCK_STX_ADDRESS, MOCK_TX_ID } from '@/test/mocks/handlers';
import { useStxTransfer } from '../use-stx-transfer';

// Mock @stacks/connect
const mockRequest = vi.fn();

vi.mock('@stacks/connect', () => ({
  request: (...args: unknown[]) => mockRequest(...args),
}));

describe('useStxTransfer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useStxTransfer());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.txId).toBeNull();
    expect(result.current.error).toBeNull();
    expect(typeof result.current.transfer).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  it('should set loading state when transferring', async () => {
    // Make request hang
    mockRequest.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useStxTransfer());

    act(() => {
      result.current.transfer({
        recipient: MOCK_STX_ADDRESS,
        amount: '1000000',
      });
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should return txId on successful transfer', async () => {
    mockRequest.mockResolvedValue({ txId: MOCK_TX_ID });

    const { result } = renderHook(() => useStxTransfer());

    await act(async () => {
      await result.current.transfer({
        recipient: MOCK_STX_ADDRESS,
        amount: '1000000',
      });
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.txId).toBe(MOCK_TX_ID);
    expect(result.current.error).toBeNull();
  });

  it('should include memo when provided', async () => {
    mockRequest.mockResolvedValue({ txId: MOCK_TX_ID });

    const { result } = renderHook(() => useStxTransfer());

    await act(async () => {
      await result.current.transfer({
        recipient: MOCK_STX_ADDRESS,
        amount: '1000000',
        memo: 'Test memo',
      });
    });

    expect(mockRequest).toHaveBeenCalledWith('stx_transferStx', {
      recipient: MOCK_STX_ADDRESS,
      amount: '1000000',
      memo: 'Test memo',
    });
  });

  it('should handle transfer errors', async () => {
    const errorMessage = 'User rejected transaction';
    mockRequest.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useStxTransfer());

    await act(async () => {
      try {
        await result.current.transfer({
          recipient: MOCK_STX_ADDRESS,
          amount: '1000000',
        });
      } catch {
        // Expected to throw
      }
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.txId).toBeNull();
    expect(result.current.error).toBeTruthy();
    expect(result.current.error?.message).toBe(errorMessage);
  });

  it('should handle invalid response (missing txId)', async () => {
    mockRequest.mockResolvedValue({});

    const { result } = renderHook(() => useStxTransfer());

    await act(async () => {
      try {
        await result.current.transfer({
          recipient: MOCK_STX_ADDRESS,
          amount: '1000000',
        });
      } catch {
        // Expected to throw
      }
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.error).toBeTruthy();
  });

  it('should reset state', async () => {
    mockRequest.mockResolvedValue({ txId: MOCK_TX_ID });

    const { result } = renderHook(() => useStxTransfer());

    // First complete a transfer
    await act(async () => {
      await result.current.transfer({
        recipient: MOCK_STX_ADDRESS,
        amount: '1000000',
      });
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.txId).toBe(MOCK_TX_ID);

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.txId).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
