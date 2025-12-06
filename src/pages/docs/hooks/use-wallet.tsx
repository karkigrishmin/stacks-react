import { CodeBlock } from '@/components/docs/code-block';

export function DocsUseWallet() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">useWallet</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hook for managing wallet connection state and actions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock
          code={`import { useWallet } from 'stacks-kit';`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`function WalletStatus() {
  const {
    isConnected,
    isConnecting,
    address,
    network,
    connect,
    disconnect,
    setNetwork,
    error,
  } = useWallet();

  if (isConnecting) {
    return <p>Connecting...</p>;
  }

  if (!isConnected) {
    return <button onClick={() => connect()}>Connect Wallet</button>;
  }

  return (
    <div>
      <p>Address: {address}</p>
      <p>Network: {network}</p>
      <button onClick={() => setNetwork('testnet')}>
        Switch to Testnet
      </button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}`}
          language="tsx"
          filename="WalletStatus.tsx"
        />
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
                <td className="px-4 py-2 font-mono text-xs">isConnected</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">Whether a wallet is connected</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isConnecting</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">Whether connection is in progress</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">address</td>
                <td className="px-4 py-2 font-mono text-xs">string | null</td>
                <td className="px-4 py-2 text-muted-foreground">Connected wallet address</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">network</td>
                <td className="px-4 py-2 font-mono text-xs">'mainnet' | 'testnet'</td>
                <td className="px-4 py-2 text-muted-foreground">Current network</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">connect</td>
                <td className="px-4 py-2 font-mono text-xs">(provider?) =&gt; Promise</td>
                <td className="px-4 py-2 text-muted-foreground">Connect to wallet</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">disconnect</td>
                <td className="px-4 py-2 font-mono text-xs">() =&gt; void</td>
                <td className="px-4 py-2 text-muted-foreground">Disconnect wallet</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">setNetwork</td>
                <td className="px-4 py-2 font-mono text-xs">(network) =&gt; void</td>
                <td className="px-4 py-2 text-muted-foreground">Switch network</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">error</td>
                <td className="px-4 py-2 font-mono text-xs">Error | null</td>
                <td className="px-4 py-2 text-muted-foreground">Connection error if any</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Connecting with a Specific Provider</h2>
        <p className="text-muted-foreground">
          You can pass a provider to the connect function to connect to a specific wallet:
        </p>
        <CodeBlock
          code={`import { getProviderFromId } from '@stacks/connect-ui';

const leatherProvider = getProviderFromId('LeatherProvider');
await connect(leatherProvider);`}
          language="tsx"
        />
      </div>
    </div>
  );
}
