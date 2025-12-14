import { cn } from '@/lib/utils';

interface WalletDemoProps {
  className?: string;
  paused?: boolean;
}

export function WalletDemo({ className, paused = false }: WalletDemoProps) {
  return (
    <div className={cn('relative mx-auto w-full max-w-sm', 'group', className)}>
      {/* Glow effect */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[hsl(var(--stacks-purple))] to-[hsl(var(--bitcoin-orange))] opacity-20 blur-2xl" />

      {/* Demo container */}
      <div
        className={cn(
          'relative overflow-hidden rounded-xl border bg-card shadow-xl',
          '[animation:wallet-demo_6s_ease-in-out_infinite]',
          paused && '[animation-play-state:paused]',
          'group-hover:[animation-play-state:paused]',
          'group-focus-within:[animation-play-state:paused]'
        )}
      >
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Connect Wallet</h3>
          <p className="text-sm text-muted-foreground">
            Choose a wallet to connect
          </p>
        </div>

        {/* Wallet options */}
        <div className="space-y-3 p-4">
          {/* Leather wallet */}
          <div
            className={cn(
              'relative flex items-center gap-3 rounded-lg border bg-background p-4',
              '[animation:wallet-demo-wallet-1_6s_ease-in-out_infinite]',
              paused && '[animation-play-state:paused]',
              'group-hover:[animation-play-state:paused]'
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <LeatherIcon />
            </div>
            <span className="font-semibold">Leather</span>

            {/* Selected highlight */}
            <div
              className={cn(
                'pointer-events-none absolute inset-0 rounded-lg border-2 border-[hsl(var(--stacks-purple))]',
                '[animation:wallet-demo-select_6s_ease-in-out_infinite]',
                paused && '[animation-play-state:paused]',
                'group-hover:[animation-play-state:paused]'
              )}
            />

            {/* Loading spinner */}
            <div
              className={cn(
                'absolute right-4 h-4 w-4',
                '[animation:wallet-demo-loading_6s_ease-in-out_infinite]',
                paused && '[animation-play-state:paused]',
                'group-hover:[animation-play-state:paused]'
              )}
            >
              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground border-t-transparent [animation:wallet-demo-spin_0.6s_linear_infinite]" />
            </div>
          </div>

          {/* Xverse wallet */}
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg border bg-background p-4',
              '[animation:wallet-demo-wallet-2_6s_ease-in-out_infinite]',
              paused && '[animation-play-state:paused]',
              'group-hover:[animation-play-state:paused]'
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <XverseIcon />
            </div>
            <span className="font-semibold">Xverse</span>
          </div>
        </div>

        {/* Success state overlay */}
        <div
          className={cn(
            'bg-card/95 absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm',
            '[animation:wallet-demo-success_6s_ease-in-out_infinite]',
            paused && '[animation-play-state:paused]',
            'group-hover:[animation-play-state:paused]'
          )}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--success))] text-white">
            <CheckIcon />
          </div>
          <p className="mb-1 font-semibold">Connected</p>
          <p className="font-mono text-sm text-muted-foreground">
            SP2J6...8V3PB
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Balance: 1,234.56 STX
          </p>
        </div>
      </div>
    </div>
  );
}

function LeatherIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#F5A623" />
      <path
        d="M7 8h10M7 12h10M7 16h6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XverseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#EE7A30" />
      <path
        d="M7 7l10 10M17 7l-10 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12l5 5L19 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
