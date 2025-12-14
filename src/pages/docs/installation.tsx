import { CodeBlock } from '@/components/docs/code-block';

export function DocsInstallation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Add stacks-kit to your existing React project.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>React 18 or later</li>
          <li>Node.js 18 or later</li>
          <li>npm, yarn, pnpm, or bun</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Install Package</h2>
        <p className="text-muted-foreground">Choose your package manager:</p>
        <div className="space-y-3">
          <CodeBlock code="npm install stacks-kit" language="bash" />
          <CodeBlock code="yarn add stacks-kit" language="bash" />
          <CodeBlock code="pnpm add stacks-kit" language="bash" />
          <CodeBlock code="bun add stacks-kit" language="bash" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Peer Dependencies</h2>
        <p className="text-muted-foreground">
          stacks-kit requires the following peer dependencies:
        </p>
        <CodeBlock
          code={`npm install @stacks/connect @stacks/connect-ui @stacks/transactions`}
          language="bash"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">TypeScript</h2>
        <p className="text-muted-foreground">
          stacks-kit is written in TypeScript and includes type definitions out of the box. No
          additional setup required.
        </p>
      </div>
    </div>
  );
}
