# stacks-kit

React toolkit for Stacks blockchain. Think RainbowKit, but for Bitcoin L2.

## Install

```bash
git clone https://github.com/yourusername/stacks-kit.git
cd stacks-kit
bun install
bun run dev
```

Open http://localhost:5173 for the demo, or http://localhost:5173/docs for documentation.

## What's Included

**Hooks** — `useWallet`, `useBalance`, `useSbtcBalance`, `useStxTransfer`, `useContractCall`, `useReadContract`, `useTransactionStatus`

**Components** — `ConnectButton`, `WalletModal`, `AddressDisplay`, `BalanceDisplay`, `NetworkBadge`, `TransactionStatus`

## Usage

### Connect a Wallet

```tsx
import { useWallet } from '@/hooks';

function App() {
  const { isConnected, address, connect, disconnect } = useWallet();

  if (!isConnected) {
    return <button onClick={() => connect()}>Connect</button>;
  }

  return (
    <div>
      <p>{address}</p>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

### Fetch Balance

```tsx
import { useBalance } from '@/hooks';

function Balance() {
  const { balance, isLoading } = useBalance();

  if (isLoading) return <span>Loading...</span>;
  return <span>{balance} STX</span>;
}
```

### Send STX

```tsx
import { useStxTransfer } from '@/hooks';

function SendButton() {
  const { transfer, isLoading, txId } = useStxTransfer();

  const send = () => {
    transfer({
      recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9KJ3F',
      amount: '1000000', // 1 STX
    });
  };

  return (
    <div>
      <button onClick={send} disabled={isLoading}>Send 1 STX</button>
      {txId && <p>TX: {txId}</p>}
    </div>
  );
}
```

### Call a Contract

```tsx
import { useContractCall } from '@/hooks';
import { uintCV } from '@stacks/transactions';

function MintButton() {
  const { call, isLoading } = useContractCall();

  const mint = () => {
    call({
      contract: 'SP123.my-nft',
      functionName: 'mint',
      functionArgs: [uintCV(1)],
    });
  };

  return <button onClick={mint} disabled={isLoading}>Mint</button>;
}
```

### Pre-built UI

```tsx
import { ConnectButton } from '@/components/stacks';

// Full-featured connect button with dropdown
<ConnectButton showBalance showNetwork />
```

```tsx
import { AddressDisplay } from '@/components/stacks';

// Truncated address with copy
<AddressDisplay address="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQ9KJ3F" copyable />
```

## Project Structure

```
src/
├── components/
│   ├── stacks/    # Wallet & blockchain components
│   └── ui/        # Base UI primitives
├── hooks/         # React hooks
├── stores/        # Zustand state
└── pages/docs/    # Documentation
```

## Scripts

```bash
bun run dev           # Dev server
bun run build         # Production build
bun run test          # Run tests (watch mode)
bun run test:run      # Run tests once
bun run test:coverage # Coverage report
bun run check         # Lint + format check
bun run check:fix     # Lint + format + auto-fix
```

## Tech

- React 18, TypeScript, Vite
- Tailwind CSS, Radix UI, Framer Motion
- @stacks/connect, @stacks/transactions
- Zustand for state, Zod for validation
- Biome for linting/formatting
- Vitest + Testing Library + MSW

## Contributing

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new hook
fix: resolve wallet connection issue
docs: update README
```

Git hooks (Lefthook) run automatically on commit to check formatting and validate commit messages.

## License

MIT
