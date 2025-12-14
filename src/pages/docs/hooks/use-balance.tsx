import { useState } from 'react';
import { CodeBlock } from '@/components/docs/code-block';
import { useBalance } from '@/hooks/use-balance';
import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

function LiveExample() {
  const { isConnected, address } = useWallet();
  const [customAddress, setCustomAddress] = useState('');
  const { balance, isLoading, isError, error, refetch } = useBalance({
    address: customAddress || undefined,
  });

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Live Example</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          Address (leave empty to use connected wallet)
        </label>
        <input
          type="text"
          value={customAddress}
          onChange={(e) => setCustomAddress(e.target.value)}
          placeholder={address || 'SP... or ST...'}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="bg-muted/50 rounded-md p-3">
        {!isConnected && !customAddress ? (
          <p className="text-sm text-muted-foreground">
            Connect wallet or enter an address to see balance
          </p>
        ) : isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading balance...
          </div>
        ) : isError ? (
          <p className="text-sm text-destructive">{error?.message}</p>
        ) : (
          <div className="space-y-1">
            <p className="text-2xl font-bold">{balance} STX</p>
            <p className="text-xs text-muted-foreground">
              {customAddress || address}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function DocsUseBalance() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">useBalance</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hook for fetching STX balance for any Stacks address.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock
          code={`import { useBalance } from 'stacks-kit';`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`function BalanceDisplay() {
  const { balance, isLoading, isError, error, refetch } = useBalance();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <p>Balance: {balance} STX</p>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}`}
          language="tsx"
          filename="BalanceDisplay.tsx"
        />
      </div>

      <LiveExample />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Options</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Option</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">address</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Address to fetch balance for. Defaults to connected wallet.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">enabled</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether to fetch balance. Defaults to true.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Return Value</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Property</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">balance</td>
                <td className="px-4 py-2 font-mono text-xs">string | null</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Formatted STX balance (e.g., "1,234.56")
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isLoading</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether balance is being fetched
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isError</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether an error occurred
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">error</td>
                <td className="px-4 py-2 font-mono text-xs">Error | null</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Error object if fetch failed
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">refetch</td>
                <td className="px-4 py-2 font-mono text-xs">
                  () =&gt; Promise
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Function to manually refetch balance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Fetching Any Address</h2>
        <p className="text-muted-foreground">
          You can fetch the balance of any address by passing it as an option:
        </p>
        <CodeBlock
          code={`const { balance } = useBalance({
  address: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
});`}
          language="tsx"
        />
      </div>
    </div>
  );
}
