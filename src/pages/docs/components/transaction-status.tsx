import { CodeBlock } from '@/components/docs/code-block';

export function DocsTransactionStatus() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">TransactionStatus</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A component for displaying the status of a Stacks transaction with real-time updates and
          explorer link.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock code={`import { TransactionStatus } from 'stacks-kit';`} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <CodeBlock
          code={`import { TransactionStatus, useStxTransfer } from 'stacks-kit';

function SendSTX() {
  const { send, txId, isLoading } = useStxTransfer();

  const handleSend = async () => {
    await send({
      recipient: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
      amount: 1000000, // 1 STX in microSTX
    });
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isLoading}>
        Send 1 STX
      </button>
      <TransactionStatus txId={txId} />
    </div>
  );
}`}
          language="tsx"
          filename="SendSTX.tsx"
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
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">txId</td>
                <td className="px-4 py-2 font-mono text-xs">string | null</td>
                <td className="px-4 py-2 font-mono text-xs">required</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Transaction ID to check status for
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">showExplorerLink</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono text-xs">true</td>
                <td className="px-4 py-2 text-muted-foreground">Show link to Stacks Explorer</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono text-xs">-</td>
                <td className="px-4 py-2 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status Types</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Badge</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">pending</td>
                <td className="px-4 py-2 text-muted-foreground">Default (spinning icon)</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction is in the mempool</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">success</td>
                <td className="px-4 py-2 text-muted-foreground">Success (green)</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction confirmed on-chain</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">abort_by_response</td>
                <td className="px-4 py-2 text-muted-foreground">Error (red)</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction failed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">abort_by_post_condition</td>
                <td className="px-4 py-2 text-muted-foreground">Error (red)</td>
                <td className="px-4 py-2 text-muted-foreground">Post-condition check failed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">dropped_replace_by_fee</td>
                <td className="px-4 py-2 text-muted-foreground">Warning (yellow)</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Replaced by higher fee transaction
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">not_found</td>
                <td className="px-4 py-2 text-muted-foreground">Default (question icon)</td>
                <td className="px-4 py-2 text-muted-foreground">Transaction not found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <h3 className="text-lg font-medium">Without Explorer Link</h3>
        <CodeBlock
          code={`<TransactionStatus
  txId={txId}
  showExplorerLink={false}
/>`}
          language="tsx"
        />

        <h3 className="text-lg font-medium">With Contract Call</h3>
        <CodeBlock
          code={`import { TransactionStatus, useContractCall } from 'stacks-kit';

function MintNFT() {
  const { call, txId, isLoading, reset } = useContractCall();

  const handleMint = async () => {
    await call({
      contractAddress: 'SP2...',
      contractName: 'my-nft',
      functionName: 'mint',
      functionArgs: [],
    });
  };

  return (
    <div className="space-y-4">
      <button onClick={handleMint} disabled={isLoading}>
        Mint NFT
      </button>
      <TransactionStatus txId={txId} />
      {txId && (
        <button onClick={reset} className="text-sm text-muted-foreground">
          Clear
        </button>
      )}
    </div>
  );
}`}
          language="tsx"
          filename="MintNFT.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Hook</h2>
        <p className="text-muted-foreground">
          For more control, use the <code>useTransactionStatus</code> hook directly:
        </p>
        <CodeBlock
          code={`import { useTransactionStatus } from 'stacks-kit';

function CustomTxStatus({ txId }: { txId: string }) {
  const { status, isLoading, error, refetch } = useTransactionStatus({ txId });

  if (isLoading) return <span>Checking status...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    <div>
      <span>Status: {status}</span>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`}
          language="tsx"
          filename="CustomTxStatus.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Auto-polling:</strong> Automatically checks status every few seconds while
            pending
          </li>
          <li>
            <strong>Animated transitions:</strong> Smooth badge transitions using Framer Motion
          </li>
          <li>
            <strong>Explorer integration:</strong> Direct link to Stacks Explorer with correct
            network
          </li>
          <li>
            <strong>Semantic badges:</strong> Color-coded badges for different status types
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Explorer URLs</h2>
        <p className="text-muted-foreground">
          The component automatically generates the correct explorer URL based on the current
          network:
        </p>
        <CodeBlock
          code={`// Mainnet
https://explorer.stacks.co/txid/{txId}

// Testnet
https://explorer.stacks.co/txid/{txId}?chain=testnet`}
          language="bash"
        />
      </div>
    </div>
  );
}
