import { CodeBlock } from '@/components/docs/code-block';

export function DocsOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Learn how to integrate stacks-kit into your React application.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What is stacks-kit?</h2>
        <p className="text-muted-foreground">
          stacks-kit is a React toolkit for building applications on the Stacks blockchain. It
          provides hooks, components, and utilities for wallet connection, STX transfers, and smart
          contract interactions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Start</h2>
        <p className="text-muted-foreground">Add stacks-kit to your React project:</p>
        <CodeBlock
          code="npm install stacks-kit @stacks/connect @stacks/transactions @stacks/network"
          language="bash"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>Simple wallet connection with Leather and Xverse support</li>
          <li>React hooks for common blockchain operations</li>
          <li>Beautiful, customizable UI components</li>
          <li>TypeScript-first with full type safety</li>
          <li>Dark mode support out of the box</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <CodeBlock
          code={`import { ConnectButton, useWallet } from 'stacks-kit';

function App() {
  const { isConnected, address } = useWallet();

  return (
    <div>
      <ConnectButton />
      {isConnected && <p>Connected: {address}</p>}
    </div>
  );
}`}
          language="tsx"
          filename="App.tsx"
        />
      </div>
    </div>
  );
}
