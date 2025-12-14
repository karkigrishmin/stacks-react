import { CodeBlock } from '@/components/docs/code-block';

export function DocsAddressDisplay() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AddressDisplay</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A component for displaying Stacks addresses with optional truncation and copy
          functionality.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock code={`import { AddressDisplay } from 'stacks-kit';`} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <CodeBlock
          code={`import { AddressDisplay, useWallet } from 'stacks-kit';

function WalletInfo() {
  const { address } = useWallet();

  if (!address) return null;

  return <AddressDisplay address={address} />;
}`}
          language="tsx"
          filename="WalletInfo.tsx"
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
                <td className="px-4 py-2 font-mono text-xs">required</td>
                <td className="px-4 py-2 text-muted-foreground">The Stacks address to display</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">truncate</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono text-xs">true</td>
                <td className="px-4 py-2 text-muted-foreground">Whether to truncate the address</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">truncateLength</td>
                <td className="px-4 py-2 font-mono text-xs">number</td>
                <td className="px-4 py-2 font-mono text-xs">4</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Characters to show on each side when truncated
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">copyable</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 font-mono text-xs">true</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Enable click-to-copy functionality
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

        <h3 className="text-lg font-medium">Full Address (No Truncation)</h3>
        <CodeBlock
          code={`<AddressDisplay
  address="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
  truncate={false}
/>`}
          language="tsx"
        />

        <h3 className="text-lg font-medium">Custom Truncation Length</h3>
        <CodeBlock
          code={`<AddressDisplay
  address="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
  truncateLength={6}
/>
// Renders: SP2J6Z...V9EJ7`}
          language="tsx"
        />

        <h3 className="text-lg font-medium">Non-Copyable Display</h3>
        <CodeBlock
          code={`<AddressDisplay
  address="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
  copyable={false}
/>
// Renders as a span instead of a button`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Click to copy:</strong> Copies the full address to clipboard with visual
            feedback
          </li>
          <li>
            <strong>Toast notification:</strong> Shows success/error message via sonner
          </li>
          <li>
            <strong>Monospace font:</strong> Uses Geist Mono for better readability
          </li>
          <li>
            <strong>Hover state:</strong> Subtle background change on hover when copyable
          </li>
          <li>
            <strong>Tap animation:</strong> Framer Motion spring animation on click
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Styling</h2>
        <p className="text-muted-foreground">Customize the appearance with the className prop:</p>
        <CodeBlock
          code={`<AddressDisplay
  address={address}
  className="text-lg bg-muted px-3 py-2 rounded-lg"
/>`}
          language="tsx"
        />
      </div>
    </div>
  );
}
