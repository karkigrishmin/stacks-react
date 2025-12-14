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
          code={`npm install @stacks/connect @stacks/transactions @stacks/network`}
          language="bash"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import Styles</h2>
        <p className="text-muted-foreground">
          Import the CSS file in your app entry point (e.g., main.tsx or App.tsx):
        </p>
        <CodeBlock code={`import 'stacks-kit/styles.css';`} language="tsx" filename="main.tsx" />
        <p className="text-sm text-muted-foreground">
          This includes all component styles with light/dark theme support.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Customization</h2>
        <p className="text-muted-foreground">Customize the theme by overriding CSS variables:</p>
        <CodeBlock
          code={`:root {
  --sk-primary: #your-brand-color;
  --sk-radius-md: 12px;
}

.dark {
  --sk-background: #1a1a1a;
}`}
          language="css"
          filename="styles.css"
        />
        <p className="text-sm text-muted-foreground">
          Components also accept className props for Tailwind or custom CSS overrides.
        </p>
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
