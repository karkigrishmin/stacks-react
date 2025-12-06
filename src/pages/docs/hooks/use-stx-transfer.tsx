import { CodeBlock } from '@/components/docs/code-block';

export function DocsUseStxTransfer() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">useStxTransfer</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hook for sending STX tokens to another address.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock
          code={`import { useStxTransfer } from 'stacks-kit';`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`function SendSTX() {
  const { transfer, isLoading, isSuccess, txId, error, reset } = useStxTransfer();

  const handleSend = async () => {
    try {
      const result = await transfer({
        recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        amount: '1000000', // 1 STX in microSTX
        memo: 'Payment for services',
      });
      console.log('Transaction ID:', result.txId);
    } catch (err) {
      console.error('Transfer failed:', err);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <p>Transfer successful!</p>
        <p>Transaction ID: {txId}</p>
        <button onClick={reset}>Send Another</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleSend} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send 1 STX'}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}`}
          language="tsx"
          filename="SendSTX.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">With Transaction Tracking</h2>
        <p className="text-muted-foreground">
          Combine with useTransactionStatus to track confirmation:
        </p>
        <CodeBlock
          code={`import { useStxTransfer, useTransactionStatus } from 'stacks-kit';
import { TransactionStatus } from 'stacks-kit/components';

function SendWithTracking() {
  const { transfer, isLoading, txId, error, reset } = useStxTransfer();
  const { isConfirmed, isPending } = useTransactionStatus({ txId });

  const handleSend = async () => {
    await transfer({
      recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
      amount: '1000000',
    });
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isLoading || isPending}>
        {isLoading ? 'Signing...' : isPending ? 'Confirming...' : 'Send 1 STX'}
      </button>

      {txId && <TransactionStatus txId={txId} />}

      {isConfirmed && (
        <div>
          <p>Transaction confirmed!</p>
          <button onClick={reset}>Send Another</button>
        </div>
      )}

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}`}
          language="tsx"
          filename="SendWithTracking.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Parameters</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Parameter</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">recipient</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Stacks address to send to
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">amount</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Amount in microSTX (1 STX = 1,000,000 microSTX)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">memo</td>
                <td className="px-4 py-2 font-mono text-xs">string?</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Optional memo (max 34 bytes)
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
                <td className="px-4 py-2 font-mono text-xs">transfer</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (params) =&gt; Promise
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Function to initiate transfer
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isLoading</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether transfer is in progress
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isSuccess</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether transfer succeeded
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">txId</td>
                <td className="px-4 py-2 font-mono text-xs">string | null</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Transaction ID if successful
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">error</td>
                <td className="px-4 py-2 font-mono text-xs">Error | null</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Error if transfer failed
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">reset</td>
                <td className="px-4 py-2 font-mono text-xs">() =&gt; void</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Reset state for new transfer
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
