import * as React from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';

export interface CodeBlockProps {
  code: string;
  language?: Language;
  showLineNumbers?: boolean;
  className?: string;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    { code, language = 'typescript', showLineNumbers = false, className },
    ref
  ) => {
    // Custom theme using CSS variables from design system
    const customTheme = {
      ...themes.nightOwl,
      plain: {
        color: 'var(--code-text)',
        backgroundColor: 'var(--code-bg)',
      },
      styles: [
        ...themes.nightOwl.styles,
        {
          types: ['keyword'],
          style: { color: 'var(--code-keyword)' },
        },
        {
          types: ['string', 'attr-value'],
          style: { color: 'var(--code-string)' },
        },
        {
          types: ['function', 'class-name'],
          style: { color: 'var(--code-function)' },
        },
        {
          types: ['comment'],
          style: {
            color: 'var(--code-comment)',
            fontStyle: 'italic' as const,
          },
        },
        {
          types: ['number', 'boolean'],
          style: { color: 'var(--code-number)' },
        },
        {
          types: ['operator', 'punctuation'],
          style: { color: 'var(--code-operator)' },
        },
        {
          types: ['variable', 'constant'],
          style: { color: 'var(--code-variable)' },
        },
      ],
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--code-bg)]',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2">
          <span className="text-caption text-[var(--foreground-tertiary)]">
            {language}
          </span>
          <CopyButton value={code} showLabel />
        </div>

        {/* Code */}
        <Highlight theme={customTheme} code={code.trim()} language={language}>
          {({
            className: preClassName,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <pre
              className={cn(
                preClassName,
                'overflow-x-auto p-4 font-mono text-body-sm'
              )}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-8 select-none text-right text-[var(--foreground-tertiary)]">
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
    );
  }
);
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };
