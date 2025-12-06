# stacks-kit

The missing React toolkit for Stacks — like RainbowKit, but for Bitcoin L2.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

stacks-kit provides a complete set of React hooks and UI components for integrating Stacks blockchain functionality into your application. Built with TypeScript, it offers type-safe wallet connections, transaction management, and balance tracking out of the box.

## Features

- **Wallet Connection** — Connect to Leather, Xverse, and other Stacks wallets
- **7 React Hooks** — Composable hooks for wallet, balances, transfers, contracts, and transaction status
- **7 UI Components** — Pre-built, accessible components following shadcn/ui patterns
- **Transaction Tracking** — Real-time transaction status polling with automatic completion detection
- **sBTC Support** — Native support for sBTC balance fetching
- **TypeScript First** — Full type safety with strict mode enabled
- **Dark Mode** — Built-in dark mode with system preference detection
- **Documentation** — Interactive docs with live examples at `/docs`

## Quick Start

```bash
git clone https://github.com/yourusername/stacks-kit.git
cd stacks-kit
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app, or [http://localhost:5173/docs](http://localhost:5173/docs) for documentation.

## Hooks

### useWallet

Manage wallet connection state and actions.

```tsx
import { useWallet } from '@/hooks';

function WalletStatus() {
  const { isConnected, address, network, connect, disconnect } = useWallet();

  if (!isConnected) {
    return <button onClick={() => connect()}>Connect Wallet</button>;
  }

  return (
    <div>
      <p>{address}</p>
      <p>{network}</p>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

**Returns:**
| Property | Type | Description |
|----------|------|-------------|
| `isConnected` | `boolean` | Whether wallet is connected |
| `isConnecting` | `boolean` | Connection in progress |
| `address` | `string \| null` | STX address |
| `btcAddress` | `string \| null` | BTC address |
| `network` | `'mainnet' \| 'testnet'` | Current network |
| `error` | `Error \| null` | Last error |
| `connect` | `(provider?) => Promise<boolean>` | Connect wallet |
| `disconnect` | `() => void` | Disconnect wallet |
| `setNetwork` | `(network) => void` | Switch network |

---

### useBalance

Fetch STX balance for any address.

```tsx
import { useBalance } from '@/hooks';

function Balance() {
  const { balance, isLoading, refetch } = useBalance();

  if (isLoading) return <span>Loading...</span>;
  return <span>{balance} STX</span>;
}
```

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `address` | `string` | Connected wallet | Address to fetch balance for |
| `enabled` | `boolean` | `true` | Enable/disable fetching |

---

### useSbtcBalance

Fetch sBTC balance with automatic network detection.

```tsx
import { useSbtcBalance } from '@/hooks';

function SbtcBalance() {
  const { balance, isLoading } = useSbtcBalance();

  return <span>{balance ?? '0'} sBTC</span>;
}
```

---

### useStxTransfer

Send STX to any address.

```tsx
import { useStxTransfer } from '@/hooks';

function SendForm() {
  const { transfer, isLoading, txId, error, reset } = useStxTransfer();

  const handleSend = async () => {
    try {
      await transfer({
        recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9KJ3F',
        amount: '1000000', // 1 STX in microSTX
        memo: 'Payment',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send 1 STX'}
      </button>
      {txId && <p>TX: {txId}</p>}
    </div>
  );
}
```

---

### useContractCall

Call smart contract functions that modify state.

```tsx
import { useContractCall } from '@/hooks';
import { uintCV } from '@stacks/transactions';

function MintButton() {
  const { call, isLoading, txId } = useContractCall();

  const handleMint = () => {
    call({
      contract: 'SP123.my-nft',
      functionName: 'mint',
      functionArgs: [uintCV(1)],
    });
  };

  return <button onClick={handleMint} disabled={isLoading}>Mint NFT</button>;
}
```

---

### useReadContract

Read data from smart contracts without a transaction.

```tsx
import { useReadContract } from '@/hooks';

function TokenName() {
  const { data, isLoading } = useReadContract({
    contract: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token',
    functionName: 'get-name',
  });

  if (isLoading) return <span>Loading...</span>;
  return <span>{data}</span>;
}
```

**Options:**
| Option | Type | Description |
|--------|------|-------------|
| `contract` | `string` | Contract identifier (`address.name`) |
| `functionName` | `string` | Function to call |
| `args` | `ClarityValue[]` | Function arguments |
| `enabled` | `boolean` | Enable/disable fetching |

---

### useTransactionStatus

Track transaction confirmation with automatic polling.

```tsx
import { useTransactionStatus } from '@/hooks';

function TxTracker({ txId }: { txId: string }) {
  const { status, isConfirmed, isPending, blockHeight } = useTransactionStatus({ txId });

  if (isPending) return <span>Confirming...</span>;
  if (isConfirmed) return <span>Confirmed at block {blockHeight}</span>;
  return <span>Status: {status}</span>;
}
```

**Status Values:**
- `pending` — In mempool
- `success` — Confirmed
- `abort_by_response` — Contract error
- `abort_by_post_condition` — Post-condition failed
- `dropped_*` — Transaction dropped

Polling automatically stops when transaction reaches a final state.

---

## Components

### ConnectButton

Main wallet connection UI with dropdown menu.

```tsx
import { ConnectButton } from '@/components/stacks';

<ConnectButton
  showBalance
  showNetwork
  label="Connect Wallet"
/>
```

### WalletModal

Modal for wallet provider selection.

```tsx
import { WalletModal } from '@/components/stacks';

<WalletModal open={isOpen} onOpenChange={setIsOpen} />
```

### AddressDisplay

Truncated address with copy functionality.

```tsx
import { AddressDisplay } from '@/components/stacks';

<AddressDisplay
  address="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9KJ3F"
  truncateLength={4}
  copyable
/>
```

### BalanceDisplay

Auto-updating STX balance display.

```tsx
import { BalanceDisplay } from '@/components/stacks';

<BalanceDisplay address="SP..." showSymbol />
```

### NetworkBadge

Network indicator badge.

```tsx
import { NetworkBadge } from '@/components/stacks';

<NetworkBadge network="mainnet" />
```

### TransactionStatus

Visual transaction status with explorer link.

```tsx
import { TransactionStatus } from '@/components/stacks';

<TransactionStatus txId="0x123..." showExplorerLink />
```

### WalletDemo

Animated wallet connection demo for landing pages.

```tsx
import { WalletDemo } from '@/components/stacks';

<WalletDemo paused={false} />
```

---

## Project Structure

```
src/
├── components/
│   ├── docs/           # Documentation components
│   ├── stacks/         # Wallet & blockchain components
│   └── ui/             # Base UI primitives (shadcn/ui)
├── hooks/              # React hooks
├── lib/                # Utilities & validation
├── pages/              # Route components
│   └── docs/           # Documentation pages
└── stores/             # Zustand state management
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Build | Vite 6 |
| Language | TypeScript 5.7 (strict) |
| Styling | Tailwind CSS 3.4 |
| Components | Radix UI + shadcn/ui |
| State | Zustand 5 |
| Blockchain | @stacks/connect 8, @stacks/transactions 7 |
| Validation | Zod 4 |
| Package Manager | Bun |

## Scripts

```bash
bun run dev      # Start dev server at localhost:5173
bun run build    # Type-check and build for production
bun run preview  # Preview production build
bun run lint     # Run ESLint
bun run format   # Format with Prettier
```

## API Endpoints

The hooks use the Hiro API:

| Network | Base URL |
|---------|----------|
| Mainnet | `https://api.hiro.so` |
| Testnet | `https://api.testnet.hiro.so` |

## License

MIT

## Author

[@karkigrishmin](https://github.com/karkigrishmin)
