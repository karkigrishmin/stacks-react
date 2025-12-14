import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '@/components/docs/code-block';
import { TransactionStatus } from '@/components/stacks/transaction-status';
import { useTransactionStatus } from '@/hooks/use-transaction-status';

function LiveExample() {
  const [txId, setTxId] = useState('');

  const { status, isConfirmed, isFailed, isPending, blockHeight, isLoading } = useTransactionStatus(
    {
      txId: txId || null,
    },
  );

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="font-medium">Live Example</h3>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Transaction ID</label>
        <input
          type="text"
          value={txId}
          onChange={(e) => setTxId(e.target.value)}
          placeholder="0x..."
          className="w-full rounded-md border bg-background px-3 py-2 font-mono text-sm"
        />
      </div>

      {txId && (
        <div className="bg-muted/50 space-y-3 rounded-md p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            {isLoading && !status ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <TransactionStatus txId={txId} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Raw status:</span>
              <span className="ml-2 font-mono">{status || '—'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Block height:</span>
              <span className="ml-2 font-mono">{blockHeight || '—'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">isConfirmed:</span>
              <span className="ml-2 font-mono">{String(isConfirmed)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">isFailed:</span>
              <span className="ml-2 font-mono">{String(isFailed)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">isPending:</span>
              <span className="ml-2 font-mono">{String(isPending)}</span>
            </div>
          </div>
        </div>
      )}

      {!txId && (
        <p className="text-sm text-muted-foreground">
          Paste a transaction ID to see its status. The hook will poll until the transaction is
          confirmed or failed.
        </p>
      )}
    </div>
  );
}

export function DocsUseTransactionStatus() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">useTransactionStatus</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hook for tracking transaction confirmation status with automatic polling.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock code={`import { useTransactionStatus } from 'stacks-kit';`} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`function TransactionTracker({ txId }: { txId: string }) {
  const {
    status,
    isConfirmed,
    isFailed,
    isPending,
    blockHeight,
    isLoading,
    error,
  } = useTransactionStatus({ txId });

  if (isLoading) return <p>Checking status...</p>;
  if (isConfirmed) return <p>Confirmed in block {blockHeight}!</p>;
  if (isFailed) return <p>Transaction failed: {status}</p>;
  if (isPending) return <p>Waiting for confirmation...</p>;

  return <p>Status: {status}</p>;
}`}
          language="tsx"
          filename="TransactionTracker.tsx"
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
                <td className="px-4 py-2 font-mono text-xs">txId</td>
                <td className="px-4 py-2 font-mono text-xs">string | null</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction ID to track</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">pollingInterval</td>
                <td className="px-4 py-2 font-mono text-xs">number</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Polling interval in ms. Defaults to 3000.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">enabled</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether to poll. Defaults to true when txId exists.
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
                <td className="px-4 py-2 font-mono text-xs">status</td>
                <td className="px-4 py-2 font-mono text-xs">TxStatus | null</td>
                <td className="px-4 py-2 text-muted-foreground">Current transaction status</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isConfirmed</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">True if status is 'success'</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isFailed</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  True if status is abort_* or dropped_*
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isPending</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">True if status is 'pending'</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">blockHeight</td>
                <td className="px-4 py-2 font-mono text-xs">number | null</td>
                <td className="px-4 py-2 text-muted-foreground">Block height if confirmed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isLoading</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">True during initial fetch</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">error</td>
                <td className="px-4 py-2 font-mono text-xs">Error | null</td>
                <td className="px-4 py-2 text-muted-foreground">Error if fetch failed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Transaction Status Values</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">pending</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction is in mempool</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">success</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction confirmed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">abort_by_response</td>
                <td className="px-4 py-2 text-muted-foreground">Contract returned error</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">abort_by_post_condition</td>
                <td className="px-4 py-2 text-muted-foreground">Post-condition failed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">dropped_*</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Transaction dropped from mempool
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">not_found</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction not found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Auto-Stop Behavior</h2>
        <p className="text-muted-foreground">
          Polling automatically stops when the transaction reaches a final state (success, abort_*,
          or dropped_*). This prevents unnecessary API calls after the transaction outcome is known.
        </p>
      </div>
    </div>
  );
}
