import { useState, useCallback } from 'react';
import { request } from '@stacks/connect';
import type { ClarityValue } from '@stacks/transactions';
import { parseTxResponse } from '@/lib/validation';

interface ContractCallParams {
  contract: `${string}.${string}`;
  functionName: string;
  functionArgs?: ClarityValue[];
}

interface ContractCallResult {
  txId: string;
}

export function useContractCall() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const call = useCallback(
    async (params: ContractCallParams): Promise<ContractCallResult> => {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      try {
        const response = await request('stx_callContract', {
          contract: params.contract,
          functionName: params.functionName,
          functionArgs: params.functionArgs || [],
        });

        // Validate response structure with Zod
        const { txId: resultTxId } = parseTxResponse(response);
        setTxId(resultTxId);
        setIsSuccess(true);
        return { txId: resultTxId };
      } catch (err) {
        const callError =
          err instanceof Error ? err : new Error('Contract call failed');
        setError(callError);
        throw callError;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setTxId(null);
    setError(null);
  }, []);

  return { call, isLoading, isSuccess, txId, error, reset };
}
