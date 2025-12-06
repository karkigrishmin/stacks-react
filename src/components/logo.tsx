import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className, showText = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="stacks-kit logo"
      >
        <rect
          x="4"
          y="6"
          width="24"
          height="6"
          rx="2"
          fill="currentColor"
          opacity="0.4"
        />
        <rect
          x="4"
          y="13"
          width="24"
          height="6"
          rx="2"
          fill="currentColor"
          opacity="0.7"
        />
        <rect
          x="4"
          y="20"
          width="24"
          height="6"
          rx="2"
          fill="currentColor"
          opacity="1"
        />
      </svg>
      {showText && <span className="font-semibold">stacks-kit</span>}
    </div>
  );
}
