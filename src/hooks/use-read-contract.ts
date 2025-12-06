import { useState, useEffect, useCallback, useRef } from 'react';
import {
  cvToHex,
  hexToCV,
  cvToValue,
  type ClarityValue,
} from '@stacks/transactions';
import { useWallet } from './use-wallet';
import { parseReadContractResponse } from '@/lib/validation';

const API_ENDPOINTS = {
  mainnet: 'https://api.hiro.so',
  testnet: 'https://api.testnet.hiro.so',
};

const DEFAULT_SENDER = 'SP000000000000000000002Q6VF78';
const REQUEST_TIMEOUT = 10000;

interface UseReadContractOptions {
  contract: string;
  functionName: string;
  args?: ClarityValue[];
  enabled?: boolean;
}

interface UseReadContractReturn<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function parseContractId(contract: string): { address: string; name: string } {
  const parts = contract.split('.');
  if (parts.length !== 2) {
    throw new Error(
      `Invalid contract format: "${contract}". Expected "address.contract-name"`
    );
  }
  return { address: parts[0], name: parts[1] };
}

function serializeArgs(args: ClarityValue[]): string[] {
  return args.map((arg) => cvToHex(arg));
}

export function useReadContract<T = unknown>(
  options: UseReadContractOptions
): UseReadContractReturn<T> {
  const { contract, functionName, args = [], enabled = true } = options;
  const { network } = useWallet();

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled || !contract || !functionName) {
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
      const { address, name } = parseContractId(contract);
      const baseUrl = API_ENDPOINTS[network];
      const url = `${baseUrl}/v2/contracts/call-read/${address}/${name}/${functionName}`;

      const serializedArgs = serializeArgs(args);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: DEFAULT_SENDER,
          arguments: serializedArgs,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();
      const parsed = parseReadContractResponse(json);

      if (!parsed.okay) {
        throw new Error(parsed.cause || 'Contract call failed');
      }

      if (parsed.result) {
        const clarityValue = hexToCV(parsed.result);
        const value = cvToValue(clarityValue, true) as T;
        setData(value);
      } else {
        setData(null);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      const fetchError =
        err instanceof Error ? err : new Error('Failed to read contract');
      setError(fetchError);
      setIsError(true);
      setData(null);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [contract, functionName, args, network, enabled]);

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
