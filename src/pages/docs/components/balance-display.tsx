import { CodeBlock } from '@/components/docs/code-block';

export function DocsBalanceDisplay() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BalanceDisplay</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A component for displaying STX balance with loading states and error handling.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock code={`import { BalanceDisplay } from 'stacks-kit';`} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <p className="text-muted-foreground">
          When used without an address prop, BalanceDisplay automatically uses the connected wallet
          address:
        </p>
        <CodeBlock
          code={`import { BalanceDisplay, useWallet } from 'stacks-kit';

function WalletBalance() {
  const { isConnected } = useWallet();

  if (!isConnected) return null;

  return <BalanceDisplay />;
}`}
          language="tsx"
          filename="WalletBalance.tsx"
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
                <td className="px-4 py-2 font-mono text-xs">address</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono text-xs">-</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Address to fetch balance for (uses connected wallet if not provided)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">showSymbol</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono text-xs">true</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Show "STX" suffix after the balance
                </td>
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
        <h2 className="text-2xl font-semibold">Examples</h2>

        <h3 className="text-lg font-medium">With Specific Address</h3>
        <CodeBlock
          code={`<BalanceDisplay
  address="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
/>`}
          language="tsx"
        />

        <h3 className="text-lg font-medium">Without Symbol</h3>
        <CodeBlock
          code={`<BalanceDisplay showSymbol={false} />
// Renders: 1,234.56 (without "STX")`}
          language="tsx"
        />

        <h3 className="text-lg font-medium">Custom Styling</h3>
        <CodeBlock
          code={`<BalanceDisplay
  className="text-2xl font-bold text-bitcoin-orange"
/>`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">States</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Loading:</strong> Shows a skeleton shimmer animation
          </li>
          <li>
            <strong>Error:</strong> Displays error message in red
          </li>
          <li>
            <strong>Success:</strong> Shows formatted balance with fade-in animation
          </li>
          <li>
            <strong>No address:</strong> Returns null (renders nothing)
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Hook</h2>
        <p className="text-muted-foreground">
          For more control over balance fetching, use the <code>useBalance</code> hook directly:
        </p>
        <CodeBlock
          code={`import { useBalance } from 'stacks-kit';

function CustomBalanceDisplay() {
  const { balance, isLoading, isError, error, refetch } = useBalance();

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error?.message}</span>;

  return (
    <div>
      <span>{balance} STX</span>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`}
          language="tsx"
          filename="CustomBalanceDisplay.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Details</h2>
        <p className="text-muted-foreground">Balance is fetched from the Hiro API endpoint:</p>
        <CodeBlock
          code={`// Mainnet
GET https://api.hiro.so/extended/v1/address/{address}/balances

// Testnet
GET https://api.testnet.hiro.so/extended/v1/address/{address}/balances`}
          language="bash"
        />
        <p className="text-muted-foreground">
          The balance is automatically formatted with proper decimal places (6 decimals for STX) and
          includes thousands separators.
        </p>
      </div>
    </div>
  );
}
