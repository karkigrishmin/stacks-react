import { useCallback, useEffect, useRef, useState } from 'react';
import { parseTxStatusResponse } from '@/lib/validation';
import { useWallet } from './use-wallet';

const API_ENDPOINTS = {
  mainnet: 'https://api.hiro.so',
  testnet: 'https://api.testnet.hiro.so',
};

const DEFAULT_POLLING_INTERVAL = 3000;
const REQUEST_TIMEOUT = 10000;

export type TxStatus =
  | 'pending'
  | 'success'
  | 'abort_by_response'
  | 'abort_by_post_condition'
  | 'dropped_replace_by_fee'
  | 'dropped_replace_across_fork'
  | 'dropped_too_expensive'
  | 'dropped_stale_garbage_collect'
  | 'not_found';

interface UseTransactionStatusOptions {
  txId: string | null;
  pollingInterval?: number;
  enabled?: boolean;
}

interface UseTransactionStatusReturn {
  status: TxStatus | null;
  isConfirmed: boolean;
  isFailed: boolean;
  isPending: boolean;
  blockHeight: number | null;
  isLoading: boolean;
  error: Error | null;
}

function isFinalStatus(status: TxStatus): boolean {
  return status === 'success' || status.startsWith('abort_') || status.startsWith('dropped_');
}

export function useTransactionStatus(
  options: UseTransactionStatusOptions,
): UseTransactionStatusReturn {
  const { txId, pollingInterval = DEFAULT_POLLING_INTERVAL, enabled = true } = options;
  const { network } = useWallet();

  const [status, setStatus] = useState<TxStatus | null>(null);
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchStatus = useCallback(async (): Promise<boolean> => {
    if (!txId) {
      return true;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort();
    }, REQUEST_TIMEOUT);

    try {
      const baseUrl = API_ENDPOINTS[network];
      const response = await fetch(`${baseUrl}/extended/v1/tx/${txId}`, {
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 404) {
        setStatus('not_found');
        setBlockHeight(null);
        return false;
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();
      const parsed = parseTxStatusResponse(json);

      const txStatus = parsed.tx_status as TxStatus;
      setStatus(txStatus);
      setBlockHeight(parsed.block_height ?? null);
      setError(null);

      return isFinalStatus(txStatus);
    } catch (err) {
      clearTimeout(timeoutId);

      if (err instanceof Error && err.name === 'AbortError') {
        return false;
      }

      const fetchError =
        err instanceof Error ? err : new Error('Failed to fetch transaction status');
      setError(fetchError);
      return false;
    }
  }, [txId, network]);

  useEffect(() => {
    if (!enabled || !txId) {
      setStatus(null);
      setBlockHeight(null);
      setError(null);
      return;
    }

    const startPolling = async () => {
      setIsLoading(true);
      const isFinal = await fetchStatus();
      setIsLoading(false);

      if (isFinal) {
        return;
      }

      intervalRef.current = setInterval(async () => {
        const isFinalNow = await fetchStatus();
        if (isFinalNow && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, pollingInterval);
    };

    startPolling();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      abortControllerRef.current?.abort();
    };
  }, [txId, enabled, pollingInterval, fetchStatus]);

  const isConfirmed = status === 'success';
  const isFailed =
    status !== null && (status.startsWith('abort_') || status.startsWith('dropped_'));
  const isPending = status === 'pending';

  return {
    status,
    isConfirmed,
    isFailed,
    isPending,
    blockHeight,
    isLoading,
    error,
  };
}
