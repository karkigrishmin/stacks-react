import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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

  const displayAddress = truncate
    ? truncateAddress(address, truncateLength)
    : address;

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

  return (
    <button
      onClick={handleCopy}
      disabled={!copyable}
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-sm',
        copyable && 'cursor-pointer hover:text-primary transition-colors',
        className
      )}
    >
      <span>{displayAddress}</span>
      {copyable && (
        <span className="text-muted-foreground">
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </span>
      )}
    </button>
  );
}
