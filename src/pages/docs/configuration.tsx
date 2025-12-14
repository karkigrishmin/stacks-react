import { CodeBlock } from '@/components/docs/code-block';

export function DocsConfiguration() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Configure stacks-kit for your application with themes, networks, and
          providers.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">StacksKitProvider</h2>
        <p className="text-muted-foreground">
          Wrap your application with StacksKitProvider to enable wallet
          functionality:
        </p>
        <CodeBlock
          code={`import { StacksKitProvider } from 'stacks-kit';

function App() {
  return (
    <StacksKitProvider>
      <YourApp />
    </StacksKitProvider>
  );
}`}
          language="tsx"
          filename="App.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Configuration</h2>
        <p className="text-muted-foreground">
          stacks-kit supports dark, light, and system themes. Dark mode is the
          default.
        </p>
        <CodeBlock
          code={`<StacksKitProvider theme="dark">
  {/* Dark theme (default) */}
</StacksKitProvider>

<StacksKitProvider theme="light">
  {/* Light theme */}
</StacksKitProvider>

<StacksKitProvider theme="system">
  {/* Follow system preference */}
</StacksKitProvider>`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Network Configuration</h2>
        <p className="text-muted-foreground">
          Configure the default network for your application:
        </p>
        <CodeBlock
          code={`<StacksKitProvider network="mainnet">
  {/* Connect to Stacks mainnet */}
</StacksKitProvider>

<StacksKitProvider network="testnet">
  {/* Connect to Stacks testnet */}
</StacksKitProvider>`}
          language="tsx"
        />
        <p className="text-muted-foreground">
          Users can switch networks at runtime using the ConnectButton dropdown
          menu or programmatically with the <code>setNetwork</code> function
          from <code>useWallet</code>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Provider Options</h2>
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
                <td className="px-4 py-2 font-mono text-xs">theme</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "dark" | "light" | "system"
                </td>
                <td className="px-4 py-2 font-mono text-xs">"dark"</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Default theme
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">network</td>
                <td className="px-4 py-2 font-mono text-xs">
                  "mainnet" | "testnet"
                </td>
                <td className="px-4 py-2 font-mono text-xs">"mainnet"</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Default network
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">children</td>
                <td className="px-4 py-2 font-mono text-xs">ReactNode</td>
                <td className="px-4 py-2 font-mono text-xs">required</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Application content
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Endpoints</h2>
        <p className="text-muted-foreground">
          stacks-kit uses the Hiro API for blockchain data:
        </p>
        <CodeBlock
          code={`// Mainnet
https://api.hiro.so

// Testnet
https://api.testnet.hiro.so`}
          language="bash"
        />
        <p className="text-muted-foreground">
          Balance queries, transaction status checks, and contract reads all use
          these endpoints automatically based on the selected network.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Supported Wallets</h2>
        <p className="text-muted-foreground">
          stacks-kit supports the following Stacks wallets:
        </p>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Leather</strong> - The original Stacks wallet (desktop and
            mobile)
          </li>
          <li>
            <strong>Xverse</strong> - Bitcoin and Stacks wallet with mobile
            support
          </li>
        </ul>
        <p className="text-muted-foreground">
          Wallet detection happens automatically. If a user has multiple wallets
          installed, they can choose which one to connect.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Full Example</h2>
        <CodeBlock
          code={`import { StacksKitProvider, ConnectButton } from 'stacks-kit';

function App() {
  return (
    <StacksKitProvider theme="dark" network="mainnet">
      <div className="min-h-screen bg-background">
        <header className="p-4">
          <ConnectButton />
        </header>
        <main>
          {/* Your application content */}
        </main>
      </div>
    </StacksKitProvider>
  );
}

export default App;`}
          language="tsx"
          filename="App.tsx"
        />
      </div>
    </div>
  );
}
