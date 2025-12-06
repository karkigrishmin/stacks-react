import { useState } from 'react';
import { CodeBlock } from '@/components/docs/code-block';
import { useReadContract } from '@/hooks/use-read-contract';
import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

function LiveExample() {
  const { network } = useWallet();
  const [contract, setContract] = useState(
    network === 'mainnet'
      ? 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token'
      : 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip010-token'
  );
  const [functionName, setFunctionName] = useState('get-name');

  const { data, isLoading, isError, error, refetch } = useReadContract({
    contract,
    functionName,
    enabled: !!contract && !!functionName,
  });

  return (
    <div className="rounded-lg border p-4 space-y-4">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Contract</label>
          <input
            type="text"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            placeholder="SP...contract-name"
            className="w-full px-3 py-2 text-sm rounded-md border bg-background font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Function</label>
          <input
            type="text"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder="get-name"
            className="w-full px-3 py-2 text-sm rounded-md border bg-background font-mono"
          />
        </div>
      </div>

      <div className="rounded-md bg-muted/50 p-3">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Calling contract...
          </div>
        ) : isError ? (
          <p className="text-sm text-destructive">{error?.message}</p>
        ) : data !== null ? (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Result:</p>
            <pre className="text-sm font-mono bg-background p-2 rounded overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter contract and function to call
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Try functions like: get-name, get-symbol, get-decimals, get-total-supply
      </p>
    </div>
  );
}

export function DocsUseReadContract() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">useReadContract</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hook for calling read-only functions on Clarity smart contracts.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock
          code={`import { useReadContract } from 'stacks-kit';`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`import { principalCV } from '@stacks/transactions';

function TokenBalance({ address }: { address: string }) {
  const { data, isLoading, isError } = useReadContract({
    contract: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token',
    functionName: 'get-balance',
    args: [principalCV(address)],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading balance</p>;

  return <p>Balance: {data?.value?.toString()}</p>;
}`}
          language="tsx"
          filename="TokenBalance.tsx"
        />
      </div>

      <LiveExample />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Options</h2>
        <div className="rounded-lg border overflow-hidden">
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
                <td className="px-4 py-2 font-mono text-xs">contract</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Contract identifier (address.contract-name)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">functionName</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Read-only function to call
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">args</td>
                <td className="px-4 py-2 font-mono text-xs">ClarityValue[]</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Function arguments (optional)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">enabled</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether to execute the call. Defaults to true.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Return Value</h2>
        <div className="rounded-lg border overflow-hidden">
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
                <td className="px-4 py-2 font-mono text-xs">data</td>
                <td className="px-4 py-2 font-mono text-xs">T | null</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Deserialized return value from contract
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isLoading</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether the call is in progress
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
                  Error object if call failed
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">refetch</td>
                <td className="px-4 py-2 font-mono text-xs">() =&gt; Promise</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Function to manually refetch data
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Clarity Value Types</h2>
        <p className="text-muted-foreground">
          Use these functions from @stacks/transactions to create arguments:
        </p>
        <CodeBlock
          code={`import {
  uintCV,          // Unsigned integer
  intCV,           // Signed integer
  bufferCV,        // Buffer/bytes
  stringAsciiCV,   // ASCII string
  stringUtf8CV,    // UTF-8 string
  principalCV,     // Principal (address)
  boolCV,          // Boolean
  listCV,          // List
  tupleCV,         // Tuple/object
  noneCV,          // None (optional empty)
  someCV,          // Some (optional with value)
} from '@stacks/transactions';`}
          language="tsx"
        />
      </div>
    </div>
  );
}
