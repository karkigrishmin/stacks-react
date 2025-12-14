import { CodeBlock } from '@/components/docs/code-block';

export function DocsConnectButton() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ConnectButton</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A pre-styled button component for wallet connection with dropdown menu.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock code={`import { ConnectButton } from 'stacks-kit';`} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <CodeBlock
          code={`function App() {
  return (
    <header>
      <ConnectButton />
    </header>
  );
}`}
          language="tsx"
          filename="App.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">With Options</h2>
        <CodeBlock
          code={`<ConnectButton
  label="Connect Wallet"
  showBalance
  showNetwork
/>`}
          language="tsx"
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
                <td className="px-4 py-2 font-mono text-xs">label</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 font-mono text-xs">"Connect"</td>
                <td className="px-4 py-2 text-muted-foreground">Button text when disconnected</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">showBalance</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono text-xs">false</td>
                <td className="px-4 py-2 text-muted-foreground">Show STX balance when connected</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">showNetwork</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono text-xs">false</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Show network badge (mainnet/testnet)
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
        <h2 className="text-2xl font-semibold">Behavior</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Disconnected:</strong> Shows connect button that opens WalletModal
          </li>
          <li>
            <strong>Connecting:</strong> Shows loading spinner
          </li>
          <li>
            <strong>Connected:</strong> Shows truncated address with dropdown menu
          </li>
          <li>
            <strong>Dropdown menu:</strong> Copy address, switch network, disconnect
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Customization</h2>
        <p className="text-muted-foreground">
          For full control over styling and behavior, use the useWallet hook directly:
        </p>
        <CodeBlock
          code={`import { useWallet } from 'stacks-kit';

function CustomConnectButton() {
  const { isConnected, address, connect, disconnect } = useWallet();

  if (isConnected) {
    return (
      <button onClick={disconnect}>
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button onClick={() => connect()}>
      Connect Wallet
    </button>
  );
}`}
          language="tsx"
          filename="CustomConnectButton.tsx"
        />
      </div>
    </div>
  );
}
