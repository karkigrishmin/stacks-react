import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { buttonTap } from '@/lib/animation/variants';
import { cn } from '@/lib/utils';

interface AddressDisplayProps {
  address: string;
  truncate?: boolean;
  truncateLength?: number;
  copyable?: boolean;
  className?: string;
}

function truncateAddress(address: string, length: number = 4): string {
  if (address.length <= length * 2 + 3) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

export function AddressDisplay({
  address,
  truncate = true,
  truncateLength = 4,
  copyable = true,
  className,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const displayAddress = truncate ? truncateAddress(address, truncateLength) : address;

  const handleCopy = async () => {
    if (!copyable) return;

    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy address');
    }
  };

  // Use span when not copyable to avoid button-in-button nesting issues
  if (!copyable) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-mono text-sm text-[var(--foreground)]',
          className,
        )}
      >
        {displayAddress}
      </span>
    );
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={buttonTap}
      aria-label="Copy address to clipboard"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 font-mono text-sm text-[var(--foreground)] transition-colors',
        'cursor-pointer hover:bg-[var(--background-secondary)] active:bg-[var(--background-secondary)]',
        className,
      )}
    >
      <span>{displayAddress}</span>
      <span className="text-[var(--foreground-tertiary)]">
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[var(--success)]" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </span>
    </motion.button>
  );
}
