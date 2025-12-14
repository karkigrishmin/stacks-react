import { cn } from '@/lib/utils';

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: 'text-base', gap: 'gap-2' },
  md: { icon: 32, text: 'text-lg', gap: 'gap-2.5' },
  lg: { icon: 40, text: 'text-xl', gap: 'gap-3' },
};

export function Logo({ showText = true, size = 'md', className }: LogoProps) {
  const { icon, text, gap } = sizes[size];

  return (
    <div className={cn('flex items-center', gap, className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="11" y="13" width="16" height="12" rx="3" fill="#E8850F" />
        <rect x="5" y="6" width="16" height="12" rx="3" fill="#F7931A" />
      </svg>

      {showText && (
        <span className={cn('font-semibold tracking-tight', text)}>
          stacks-kit
        </span>
      )}
    </div>
  );
}

export function LogoIcon({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="11" y="13" width="16" height="12" rx="3" fill="#E8850F" />
      <rect x="5" y="6" width="16" height="12" rx="3" fill="#F7931A" />
    </svg>
  );
}
