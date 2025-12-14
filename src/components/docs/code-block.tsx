import { Highlight, themes } from 'prism-react-renderer';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/ui/copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  return (
    <div className="bg-muted/30 relative overflow-hidden rounded-lg border">
      {filename && (
        <div className="flex items-center justify-between border-b px-4 py-2 text-sm text-muted-foreground">
          <span className="font-mono">{filename}</span>
        </div>
      )}
      <div className="relative">
        <CopyButton
          value={code}
          className="absolute right-2 top-2 z-10 h-8 w-8 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
        />
        <Highlight
          theme={themes.oneDark}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(className, 'overflow-x-auto p-4 text-sm')}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
