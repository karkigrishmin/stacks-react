import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { buttonTap } from '@/lib/animation/variants';

export interface CopyButtonProps {
  /** The text to copy to clipboard */
  value: string;
  /** Show text label alongside icon */
  showLabel?: boolean;
  /** Custom label text (default: "Copy" / "Copied!") */
  labels?: { copy?: string; copied?: string };
  /** Button size variant */
  size?: 'sm' | 'default' | 'icon';
  /** Button style variant */
  variant?: 'ghost' | 'outline' | 'secondary';
  /** Optional callback when copy succeeds */
  onCopy?: () => void;
  /** Additional class names */
  className?: string;
}

export function CopyButton({
  value,
  showLabel = false,
  labels = {},
  size = 'icon',
  variant = 'ghost',
  onCopy,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const copyLabel = labels.copy ?? 'Copy';
  const copiedLabel = labels.copied ?? 'Copied!';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail - clipboard API may not be available
    }
  };

  // Icon-only button using Button component
  if (!showLabel) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleCopy}
        aria-label={copied ? copiedLabel : 'Copy to clipboard'}
        className={className}
      >
        {copied ? (
          <Check className="h-4 w-4 text-[var(--success)]" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    );
  }

  // Button with label
  return (
    <motion.button
      onClick={handleCopy}
      whileTap={buttonTap}
      aria-label={copied ? copiedLabel : 'Copy to clipboard'}
      className={cn(
        'flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-caption text-[var(--foreground-tertiary)] transition-colors',
        'hover:bg-[var(--background-secondary)] hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
        className
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-[var(--success)]" />
          <span className="text-[var(--success)]">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>{copyLabel}</span>
        </>
      )}
    </motion.button>
  );
}
