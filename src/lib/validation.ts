import { z } from 'zod';

/**
 * Stacks address validation
 * - Must start with SP (mainnet) or ST (testnet)
 * - Standard addresses are 41 characters
 * - Contract addresses are longer (include .contract-name)
 */
export const stxAddressSchema = z
  .string()
  .min(1, 'Address is required')
  .refine(
    (addr) => /^(SP|ST)[A-Z0-9]{38,}/.test(addr),
    'Invalid STX address. Must start with SP (mainnet) or ST (testnet)',
  );

/**
 * STX amount validation
 * - Must be a positive number
 * - Maximum 6 decimal places (microSTX precision)
 * - Cannot be zero
 */
export const stxAmountSchema = z
  .string()
  .min(1, 'Amount is required')
  .refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, 'Amount must be a positive number')
  .refine((val) => {
    const parts = val.split('.');
    return parts.length === 1 || parts[1].length <= 6;
  }, 'Maximum 6 decimal places allowed');

/**
 * Transfer form validation schema
 */
export const transferFormSchema = z.object({
  recipient: stxAddressSchema,
  amount: stxAmountSchema,
});

export type TransferFormData = z.infer<typeof transferFormSchema>;

/**
 * Validate transfer form data and return errors
 */
export function validateTransferForm(data: { recipient: string; amount: string }): {
  valid: boolean;
  errors: { recipient?: string; amount?: string };
} {
  const result = transferFormSchema.safeParse(data);

  if (result.success) {
    return { valid: true, errors: {} };
  }

  const errors: { recipient?: string; amount?: string } = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as 'recipient' | 'amount';
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { valid: false, errors };
}

/**
 * Transaction response validation schema
 * Validates the response from @stacks/connect transaction requests
 */
export const txResponseSchema = z.object({
  txId: z.string().min(1, 'Transaction ID is required'),
});

export type TxResponse = z.infer<typeof txResponseSchema>;

/**
 * Parse and validate transaction response
 * @throws {Error} if response is invalid
 */
export function parseTxResponse(response: unknown): TxResponse {
  const result = txResponseSchema.safeParse(response);
  if (!result.success) {
    throw new Error('Invalid transaction response: missing or invalid txId');
  }
  return result.data;
}

/**
 * Read-only contract call response schema
 * Response from POST /v2/contracts/call-read/{address}/{name}/{function}
 */
export const readContractResponseSchema = z.object({
  okay: z.boolean(),
  result: z.string().optional(),
  cause: z.string().optional(),
});

export type ReadContractResponse = z.infer<typeof readContractResponseSchema>;

export function parseReadContractResponse(response: unknown): ReadContractResponse {
  const result = readContractResponseSchema.safeParse(response);
  if (!result.success) {
    throw new Error('Invalid read contract response');
  }
  return result.data;
}

/**
 * Transaction status response schema
 * Response from GET /extended/v1/tx/{txId}
 */
export const txStatusResponseSchema = z.object({
  tx_id: z.string(),
  tx_status: z.string(),
  block_height: z.number().optional(),
});

export type TxStatusResponse = z.infer<typeof txStatusResponseSchema>;

export function parseTxStatusResponse(response: unknown): TxStatusResponse {
  const result = txStatusResponseSchema.safeParse(response);
  if (!result.success) {
    throw new Error('Invalid transaction status response');
  }
  return result.data;
}

/**
 * Balance response schema
 * Response from GET /extended/v1/address/{address}/balances
 */
export const balanceResponseSchema = z.object({
  stx: z.object({
    balance: z.string(),
  }),
});

export type BalanceResponse = z.infer<typeof balanceResponseSchema>;

export function parseBalanceResponse(response: unknown): BalanceResponse {
  const result = balanceResponseSchema.safeParse(response);
  if (!result.success) {
    throw new Error('Invalid balance response');
  }
  return result.data;
}
