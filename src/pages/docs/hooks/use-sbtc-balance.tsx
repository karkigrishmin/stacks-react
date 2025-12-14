import { Loader2, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '@/components/docs/code-block';
import { Button } from '@/components/ui/button';
import { useSbtcBalance } from '@/hooks/use-sbtc-balance';
import { useWallet } from '@/hooks/use-wallet';

function LiveExample() {
  const { isConnected, address, network, setNetwork } = useWallet();
  const [customAddress, setCustomAddress] = useState('');
  const { balance, isLoading, isError, error, refetch } = useSbtcBalance({
    address: customAddress || undefined,
  });

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Live Example</h3>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-md border text-xs">
            <button
              onClick={() => setNetwork('mainnet')}
              className={`px-2 py-1 ${network === 'mainnet' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              Mainnet
            </button>
            <button
              onClick={() => setNetwork('testnet')}
              className={`px-2 py-1 ${network === 'testnet' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              Testnet
            </button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
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
            Connect wallet or enter an address to see sBTC balance
          </p>
        ) : isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading sBTC balance...
          </div>
        ) : isError ? (
          <p className="text-sm text-destructive">{error?.message}</p>
        ) : (
          <div className="space-y-1">
            <p className="text-2xl font-bold">{balance ?? '0'} sBTC</p>
            <p className="text-xs text-muted-foreground">{customAddress || address}</p>
          </div>
        )}
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p>
          <span className="font-medium">Contract ({network}):</span>{' '}
          <code className="rounded bg-muted px-1">
            {network === 'mainnet'
              ? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token'
              : 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token'}
          </code>
        </p>
      </div>
    </div>
  );
}

export function DocsUseSbtcBalance() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">useSbtcBalance</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hook for fetching sBTC (Bitcoin on Stacks) balance for any address.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock code={`import { useSbtcBalance } from 'stacks-kit';`} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`function SbtcBalance() {
  const { balance, isLoading, isError } = useSbtcBalance();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading balance</p>;

  return <p>sBTC Balance: {balance}</p>;
}`}
          language="tsx"
          filename="SbtcBalance.tsx"
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
                  Address to check. Defaults to connected wallet.
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
                  Formatted sBTC balance (8 decimals)
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
                <td className="px-4 py-2 text-muted-foreground">Whether an error occurred</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">error</td>
                <td className="px-4 py-2 font-mono text-xs">Error | null</td>
                <td className="px-4 py-2 text-muted-foreground">Error object if fetch failed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">refetch</td>
                <td className="px-4 py-2 font-mono text-xs">() =&gt; Promise</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Function to manually refetch balance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Network Auto-Detection</h2>
        <p className="text-muted-foreground">
          The hook automatically uses the correct sBTC contract based on the current network:
        </p>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Network</th>
                <th className="px-4 py-2 text-left font-medium">Contract</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2">Mainnet</td>
                <td className="px-4 py-2 font-mono text-xs">
                  SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Testnet</td>
                <td className="px-4 py-2 font-mono text-xs">
                  ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">About sBTC</h2>
        <p className="text-muted-foreground">
          sBTC is a 1:1 Bitcoin-backed token on Stacks. It's a SIP-010 fungible token with 8 decimal
          places (matching Bitcoin's satoshi precision). This hook uses the useReadContract hook
          internally to call the get-balance function on the sBTC contract.
        </p>
      </div>
    </div>
  );
}
