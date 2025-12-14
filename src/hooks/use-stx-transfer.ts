import { request } from '@stacks/connect';
import { useCallback, useState } from 'react';
import { parseTxResponse } from '@/lib/validation';

interface TransferParams {
  recipient: string;
  amount: string;
  memo?: string;
}

interface TransferResult {
  txId: string;
}

export function useStxTransfer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const transfer = useCallback(async (params: TransferParams): Promise<TransferResult> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await request('stx_transferStx', {
        recipient: params.recipient,
        amount: params.amount,
        memo: params.memo,
      });

      // Validate response structure with Zod
      const { txId: resultTxId } = parseTxResponse(response);
      setTxId(resultTxId);
      setIsSuccess(true);
      return { txId: resultTxId };
    } catch (err) {
      const transferError = err instanceof Error ? err : new Error('Transfer failed');
      setError(transferError);
      throw transferError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setTxId(null);
    setError(null);
  }, []);

  return { transfer, isLoading, isSuccess, txId, error, reset };
}
