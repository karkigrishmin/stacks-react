import { CodeBlock } from '@/components/docs/code-block';

export function DocsWalletModal() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">WalletModal</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A modal dialog for selecting and connecting to Stacks wallets.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock
          code={`import { WalletModal } from 'stacks-kit';`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`import { useState } from 'react';
import { WalletModal } from 'stacks-kit';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Connect Wallet
      </button>

      <WalletModal
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}`}
          language="tsx"
          filename="App.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Props</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Prop</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">open</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Controls modal visibility
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">onOpenChange</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (open: boolean) =&gt; void
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Callback when open state changes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Supported Wallets</h2>
        <p className="text-muted-foreground">
          The modal automatically detects and displays available wallet
          providers:
        </p>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Leather</strong> - Full-featured Stacks wallet (formerly
            Hiro Wallet)
          </li>
          <li>
            <strong>Xverse</strong> - Bitcoin and Stacks multi-chain wallet
          </li>
        </ul>
        <p className="mt-4 text-muted-foreground">
          If a wallet is not installed, the modal shows an "Install" link that
          opens the wallet's extension page.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Behavior</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>Shows loading spinner while connecting</li>
          <li>Displays error messages if connection fails</li>
          <li>Automatically closes on successful connection</li>
          <li>
            Accessible: keyboard navigation, focus trap, screen reader support
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">With ConnectButton</h2>
        <p className="text-muted-foreground">
          The ConnectButton component manages the modal internally. You only
          need to use WalletModal directly if you want custom trigger behavior.
        </p>
        <CodeBlock
          code={`// This handles modal state automatically
<ConnectButton />

// Equivalent to:
const [isOpen, setIsOpen] = useState(false);
<>
  <button onClick={() => setIsOpen(true)}>Connect</button>
  <WalletModal open={isOpen} onOpenChange={setIsOpen} />
</>`}
          language="tsx"
        />
      </div>
    </div>
  );
}
