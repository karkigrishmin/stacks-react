import { principalCV } from '@stacks/transactions';
import { useMemo } from 'react';
import { useReadContract } from './use-read-contract';
import { useWallet } from './use-wallet';

const SBTC_CONTRACTS = {
  mainnet: 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token',
  testnet: 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token',
} as const;

const SBTC_DECIMALS = 8;

interface UseSbtcBalanceOptions {
  address?: string;
  enabled?: boolean;
}

interface UseSbtcBalanceReturn {
  balance: string | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function formatSbtcBalance(rawBalance: bigint | number | string): string {
  const raw = typeof rawBalance === 'string' ? BigInt(rawBalance) : BigInt(rawBalance);
  const divisor = BigInt(10 ** SBTC_DECIMALS);
  const whole = raw / divisor;
  const fraction = raw % divisor;

  const fractionStr = fraction.toString().padStart(SBTC_DECIMALS, '0');
  const trimmedFraction = fractionStr.replace(/0+$/, '');

  if (trimmedFraction === '') {
    return whole.toLocaleString();
  }

  return `${whole.toLocaleString()}.${trimmedFraction}`;
}

export function useSbtcBalance(options: UseSbtcBalanceOptions = {}): UseSbtcBalanceReturn {
  const { address: propAddress, enabled = true } = options;
  const { address: walletAddress, network } = useWallet();

  const address = propAddress || walletAddress;
  const contract = SBTC_CONTRACTS[network];

  const args = useMemo(() => {
    if (!address) return [];
    return [principalCV(address)];
  }, [address]);

  const { data, isLoading, isError, error, refetch } = useReadContract<{ value: bigint } | bigint>({
    contract,
    functionName: 'get-balance',
    args,
    enabled: enabled && !!address,
  });

  const balance = useMemo(() => {
    if (data === null || data === undefined) return null;

    const rawValue = typeof data === 'object' && 'value' in data ? data.value : data;

    try {
      return formatSbtcBalance(rawValue);
    } catch {
      return null;
    }
  }, [data]);

  return {
    balance,
    isLoading,
    isError,
    error,
    refetch,
  };
}
