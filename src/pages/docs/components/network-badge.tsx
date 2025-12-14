import { CodeBlock } from '@/components/docs/code-block';

export function DocsNetworkBadge() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">NetworkBadge</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A badge component that displays the current Stacks network (mainnet or
          testnet).
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock
          code={`import { NetworkBadge } from 'stacks-kit';`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <CodeBlock
          code={`import { NetworkBadge, useWallet } from 'stacks-kit';

function NetworkIndicator() {
  const { network } = useWallet();

  return <NetworkBadge network={network} />;
}`}
          language="tsx"
          filename="NetworkIndicator.tsx"
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
                <td className="px-4 py-2 font-mono text-xs">network</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "mainnet" | "testnet"
                </td>
                <td className="px-4 py-2 font-mono text-xs">required</td>
                <td className="px-4 py-2 text-muted-foreground">
                  The network to display
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono text-xs">-</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Appearance</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Mainnet:</strong> Green badge with success variant and green
            indicator dot
          </li>
          <li>
            <strong>Testnet:</strong> Yellow/amber badge with warning variant
            and yellow indicator dot
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <h3 className="text-lg font-medium">Mainnet Badge</h3>
        <CodeBlock code={`<NetworkBadge network="mainnet" />`} language="tsx" />

        <h3 className="text-lg font-medium">Testnet Badge</h3>
        <CodeBlock code={`<NetworkBadge network="testnet" />`} language="tsx" />

        <h3 className="text-lg font-medium">In a Header</h3>
        <CodeBlock
          code={`function Header() {
  const { network, isConnected } = useWallet();

  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      <div className="flex items-center gap-4">
        {isConnected && <NetworkBadge network={network} />}
        <ConnectButton />
      </div>
    </header>
  );
}`}
          language="tsx"
          filename="Header.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ConnectButton Integration</h2>
        <p className="text-muted-foreground">
          The ConnectButton component has a built-in <code>showNetwork</code>{' '}
          prop that displays the NetworkBadge:
        </p>
        <CodeBlock
          code={`<ConnectButton showNetwork />
// Automatically shows NetworkBadge when connected`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Switching Networks</h2>
        <p className="text-muted-foreground">
          Users can switch networks using the <code>setNetwork</code> function
          from <code>useWallet</code>:
        </p>
        <CodeBlock
          code={`import { useWallet } from 'stacks-kit';

function NetworkSwitcher() {
  const { network, setNetwork } = useWallet();

  return (
    <div className="flex items-center gap-2">
      <NetworkBadge network={network} />
      <button
        onClick={() =>
          setNetwork(network === 'mainnet' ? 'testnet' : 'mainnet')
        }
      >
        Switch Network
      </button>
    </div>
  );
}`}
          language="tsx"
          filename="NetworkSwitcher.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Styling</h2>
        <p className="text-muted-foreground">
          The badge uses the design system Badge component with semantic color
          variants. You can add custom classes:
        </p>
        <CodeBlock
          code={`<NetworkBadge
  network={network}
  className="text-xs px-2"
/>`}
          language="tsx"
        />
      </div>
    </div>
  );
}
