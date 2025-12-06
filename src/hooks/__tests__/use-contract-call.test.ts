import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContractCall } from '../use-contract-call';
import { MOCK_TX_ID } from '@/test/mocks/handlers';

// Mock @stacks/connect
const mockRequest = vi.fn();

vi.mock('@stacks/connect', () => ({
  request: (...args: unknown[]) => mockRequest(...args),
}));

describe('useContractCall', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useContractCall());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.txId).toBeNull();
    expect(result.current.error).toBeNull();
    expect(typeof result.current.call).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  it('should set loading state when calling contract', async () => {
    // Make request hang
    mockRequest.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useContractCall());

    act(() => {
      result.current.call({
        contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
        functionName: 'my-function',
      });
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should return txId on successful call', async () => {
    mockRequest.mockResolvedValue({ txId: MOCK_TX_ID });

    const { result } = renderHook(() => useContractCall());

    await act(async () => {
      await result.current.call({
        contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
        functionName: 'my-function',
      });
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.txId).toBe(MOCK_TX_ID);
    expect(result.current.error).toBeNull();
  });

  it('should pass function args to request', async () => {
    mockRequest.mockResolvedValue({ txId: MOCK_TX_ID });

    const { result } = renderHook(() => useContractCall());

    const mockArgs = [{ type: 'uint', value: 100 }];

    await act(async () => {
      await result.current.call({
        contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
        functionName: 'transfer',
        functionArgs: mockArgs as never,
      });
    });

    expect(mockRequest).toHaveBeenCalledWith('stx_callContract', {
      contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
      functionName: 'transfer',
      functionArgs: mockArgs,
    });
  });

  it('should default to empty array for functionArgs', async () => {
    mockRequest.mockResolvedValue({ txId: MOCK_TX_ID });

    const { result } = renderHook(() => useContractCall());

    await act(async () => {
      await result.current.call({
        contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
        functionName: 'get-balance',
      });
    });

    expect(mockRequest).toHaveBeenCalledWith('stx_callContract', {
      contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
      functionName: 'get-balance',
      functionArgs: [],
    });
  });

  it('should handle call errors', async () => {
    const errorMessage = 'User rejected transaction';
    mockRequest.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useContractCall());

    await act(async () => {
      try {
        await result.current.call({
          contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
          functionName: 'my-function',
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

    const { result } = renderHook(() => useContractCall());

    await act(async () => {
      try {
        await result.current.call({
          contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
          functionName: 'my-function',
        });
      } catch {
        // Expected to throw
      }
    });

    expect(result.current.error).toBeTruthy();
  });

  it('should reset state', async () => {
    mockRequest.mockResolvedValue({ txId: MOCK_TX_ID });

    const { result } = renderHook(() => useContractCall());

    // First complete a call
    await act(async () => {
      await result.current.call({
        contract: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-contract',
        functionName: 'my-function',
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
