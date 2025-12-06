import { http, HttpResponse } from 'msw';

// Stacks API base URLs
const MAINNET_API = 'https://api.hiro.so';
const TESTNET_API = 'https://api.testnet.hiro.so';

// Mock wallet addresses for testing
export const MOCK_STX_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
export const MOCK_BTC_ADDRESS = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq';
export const MOCK_TX_ID =
  '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

// Mock balance response matching balanceResponseSchema
const mockBalanceResponse = {
  stx: {
    balance: '1000000000', // 1000 STX in micro-STX
    locked: '0',
    unlock_height: 0,
    total_sent: '0',
    total_received: '1000000000',
  },
  fungible_tokens: {
    'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token': {
      balance: '100000000', // 1 sBTC in satoshis
      total_sent: '0',
      total_received: '100000000',
    },
  },
  non_fungible_tokens: {},
};

// Mock transaction status response matching txStatusResponseSchema
const mockTxStatusResponse = {
  tx_id: MOCK_TX_ID,
  tx_status: 'success',
  tx_type: 'contract_call',
  block_height: 12345,
};

// Mock read-only contract response matching readContractResponseSchema
const mockReadOnlyResponse = {
  okay: true,
  result: '0x0100000000000000000000000000000001', // Clarity uint 1
};

export const handlers = [
  // Account balance - mainnet
  http.get(`${MAINNET_API}/extended/v1/address/:address/balances`, () => {
    return HttpResponse.json(mockBalanceResponse);
  }),

  // Account balance - testnet
  http.get(`${TESTNET_API}/extended/v1/address/:address/balances`, () => {
    return HttpResponse.json(mockBalanceResponse);
  }),

  // Broadcast transaction - mainnet
  http.post(`${MAINNET_API}/v2/transactions`, () => {
    return HttpResponse.json({ txId: MOCK_TX_ID });
  }),

  // Broadcast transaction - testnet
  http.post(`${TESTNET_API}/v2/transactions`, () => {
    return HttpResponse.json({ txId: MOCK_TX_ID });
  }),

  // Read-only contract call - mainnet
  http.post(
    `${MAINNET_API}/v2/contracts/call-read/:address/:contract/:function`,
    () => {
      return HttpResponse.json(mockReadOnlyResponse);
    }
  ),

  // Read-only contract call - testnet
  http.post(
    `${TESTNET_API}/v2/contracts/call-read/:address/:contract/:function`,
    () => {
      return HttpResponse.json(mockReadOnlyResponse);
    }
  ),

  // Transaction status - mainnet
  http.get(`${MAINNET_API}/extended/v1/tx/:txid`, ({ params }) => {
    return HttpResponse.json({
      ...mockTxStatusResponse,
      tx_id: params.txid,
    });
  }),

  // Transaction status - testnet
  http.get(`${TESTNET_API}/extended/v1/tx/:txid`, ({ params }) => {
    return HttpResponse.json({
      ...mockTxStatusResponse,
      tx_id: params.txid,
    });
  }),
];
