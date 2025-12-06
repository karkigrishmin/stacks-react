import { useState, useEffect, useCallback, useRef } from 'react';
import { useWallet } from './use-wallet';
import { parseBalanceResponse } from '@/lib/validation';

const API_ENDPOINTS = {
  mainnet: 'https://api.hiro.so',
  testnet: 'https://api.testnet.hiro.so',
};

const REQUEST_TIMEOUT = 10000;
const MICRO_STX_DECIMALS = 6;

interface UseBalanceOptions {
  address?: string;
  enabled?: boolean;
}

interface UseBalanceReturn {
  balance: string | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function formatBalance(microStx: string): string {
  const stx = Number(microStx) / Math.pow(10, MICRO_STX_DECIMALS);
  return stx.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: MICRO_STX_DECIMALS,
  });
}

export function useBalance(options: UseBalanceOptions = {}): UseBalanceReturn {
  const { address: propAddress, enabled = true } = options;
  const { address: walletAddress, network } = useWallet();

  const address = propAddress || walletAddress;

  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!enabled || !address) {
      setBalance(null);
      return;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort();
    }, REQUEST_TIMEOUT);

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const baseUrl = API_ENDPOINTS[network];
      const response = await fetch(
        `${baseUrl}/extended/v1/address/${address}/balances`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();
      const parsed = parseBalanceResponse(json);

      setBalance(formatBalance(parsed.stx.balance));
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      const fetchError =
        err instanceof Error ? err : new Error('Failed to fetch balance');
      setError(fetchError);
      setIsError(true);
      setBalance(null);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [address, network, enabled]);

  useEffect(() => {
    fetchBalance();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchBalance]);

  const refetch = useCallback(async () => {
    await fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    isLoading,
    isError,
    error,
    refetch,
  };
}
