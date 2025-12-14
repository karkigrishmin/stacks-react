import { describe, expect, it } from 'vitest';
import {
  balanceResponseSchema,
  parseBalanceResponse,
  parseReadContractResponse,
  parseTxResponse,
  parseTxStatusResponse,
  readContractResponseSchema,
  stxAddressSchema,
  stxAmountSchema,
  transferFormSchema,
  txResponseSchema,
  txStatusResponseSchema,
  validateTransferForm,
} from '../validation';

describe('validation schemas', () => {
  describe('stxAddressSchema', () => {
    it('should accept valid mainnet address (SP)', () => {
      // SP addresses need at least 38 chars after prefix
      const result = stxAddressSchema.safeParse('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
      expect(result.success).toBe(true);
    });

    it('should accept valid testnet address (ST)', () => {
      const result = stxAddressSchema.safeParse('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');
      expect(result.success).toBe(true);
    });

    it('should accept contract addresses', () => {
      const result = stxAddressSchema.safeParse(
        'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.my-contract',
      );
      expect(result.success).toBe(true);
    });

    it('should reject empty string', () => {
      const result = stxAddressSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should reject invalid prefix', () => {
      const result = stxAddressSchema.safeParse('XX000000000000000000002Q6VF78');
      expect(result.success).toBe(false);
    });

    it('should reject too short address', () => {
      const result = stxAddressSchema.safeParse('SP123');
      expect(result.success).toBe(false);
    });
  });

  describe('stxAmountSchema', () => {
    it('should accept positive integer', () => {
      const result = stxAmountSchema.safeParse('100');
      expect(result.success).toBe(true);
    });

    it('should accept positive decimal', () => {
      const result = stxAmountSchema.safeParse('100.5');
      expect(result.success).toBe(true);
    });

    it('should accept up to 6 decimal places', () => {
      const result = stxAmountSchema.safeParse('100.123456');
      expect(result.success).toBe(true);
    });

    it('should reject more than 6 decimal places', () => {
      const result = stxAmountSchema.safeParse('100.1234567');
      expect(result.success).toBe(false);
    });

    it('should reject zero', () => {
      const result = stxAmountSchema.safeParse('0');
      expect(result.success).toBe(false);
    });

    it('should reject negative amount', () => {
      const result = stxAmountSchema.safeParse('-100');
      expect(result.success).toBe(false);
    });

    it('should reject empty string', () => {
      const result = stxAmountSchema.safeParse('');
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric string', () => {
      const result = stxAmountSchema.safeParse('abc');
      expect(result.success).toBe(false);
    });
  });

  describe('transferFormSchema', () => {
    it('should accept valid transfer form data', () => {
      const result = transferFormSchema.safeParse({
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: '100',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid recipient', () => {
      const result = transferFormSchema.safeParse({
        recipient: 'invalid',
        amount: '100',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid amount', () => {
      const result = transferFormSchema.safeParse({
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: '0',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('validateTransferForm', () => {
    it('should return valid for correct data', () => {
      const result = validateTransferForm({
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: '100',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should return errors for invalid recipient', () => {
      const result = validateTransferForm({
        recipient: 'invalid',
        amount: '100',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.recipient).toBeDefined();
    });

    it('should return errors for invalid amount', () => {
      const result = validateTransferForm({
        recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        amount: '-10',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.amount).toBeDefined();
    });

    it('should return multiple errors', () => {
      const result = validateTransferForm({
        recipient: '',
        amount: '',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.recipient).toBeDefined();
      expect(result.errors.amount).toBeDefined();
    });
  });

  describe('txResponseSchema', () => {
    it('should accept valid tx response', () => {
      const result = txResponseSchema.safeParse({
        txId: '0x1234567890abcdef',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing txId', () => {
      const result = txResponseSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject empty txId', () => {
      const result = txResponseSchema.safeParse({ txId: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('parseTxResponse', () => {
    it('should parse valid response', () => {
      const response = parseTxResponse({ txId: '0x123' });
      expect(response.txId).toBe('0x123');
    });

    it('should throw on invalid response', () => {
      expect(() => parseTxResponse({})).toThrow('Invalid transaction response');
    });
  });

  describe('readContractResponseSchema', () => {
    it('should accept successful response', () => {
      const result = readContractResponseSchema.safeParse({
        okay: true,
        result: '0x0100000000000000000000000000000001',
      });
      expect(result.success).toBe(true);
    });

    it('should accept failed response with cause', () => {
      const result = readContractResponseSchema.safeParse({
        okay: false,
        cause: 'Contract error',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing okay field', () => {
      const result = readContractResponseSchema.safeParse({
        result: '0x01',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('parseReadContractResponse', () => {
    it('should parse valid response', () => {
      const response = parseReadContractResponse({
        okay: true,
        result: '0x01',
      });
      expect(response.okay).toBe(true);
      expect(response.result).toBe('0x01');
    });

    it('should throw on invalid response', () => {
      expect(() => parseReadContractResponse({ result: '0x01' })).toThrow(
        'Invalid read contract response',
      );
    });
  });

  describe('txStatusResponseSchema', () => {
    it('should accept valid status response', () => {
      const result = txStatusResponseSchema.safeParse({
        tx_id: '0x123',
        tx_status: 'success',
        block_height: 12345,
      });
      expect(result.success).toBe(true);
    });

    it('should accept status without block_height', () => {
      const result = txStatusResponseSchema.safeParse({
        tx_id: '0x123',
        tx_status: 'pending',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing tx_id', () => {
      const result = txStatusResponseSchema.safeParse({
        tx_status: 'success',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('parseTxStatusResponse', () => {
    it('should parse valid response', () => {
      const response = parseTxStatusResponse({
        tx_id: '0x123',
        tx_status: 'success',
        block_height: 100,
      });
      expect(response.tx_id).toBe('0x123');
      expect(response.tx_status).toBe('success');
      expect(response.block_height).toBe(100);
    });

    it('should throw on invalid response', () => {
      expect(() => parseTxStatusResponse({ tx_status: 'success' })).toThrow(
        'Invalid transaction status response',
      );
    });
  });

  describe('balanceResponseSchema', () => {
    it('should accept valid balance response', () => {
      const result = balanceResponseSchema.safeParse({
        stx: {
          balance: '1000000',
        },
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing stx field', () => {
      const result = balanceResponseSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject missing balance field', () => {
      const result = balanceResponseSchema.safeParse({
        stx: {},
      });
      expect(result.success).toBe(false);
    });
  });

  describe('parseBalanceResponse', () => {
    it('should parse valid response', () => {
      const response = parseBalanceResponse({
        stx: { balance: '1000000' },
      });
      expect(response.stx.balance).toBe('1000000');
    });

    it('should throw on invalid response', () => {
      expect(() => parseBalanceResponse({})).toThrow('Invalid balance response');
    });
  });
});
