import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@/components/stacks/connect-button';
import { WalletDemo } from '@/components/stacks/wallet-demo';
import { Logo } from '@/components/logo';

const THEME_KEY = 'stacks-kit-theme';
const INSTALL_COMMAND = 'npm create stacks-kit@latest';
const GITHUB_URL = 'https://github.com/your-org/stacks-kit';

export function HomePage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Logo showText />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <ConnectButton showBalance showNetwork />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="container py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl space-y-12 text-center">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              The React toolkit for{' '}
              <span className="bg-gradient-to-r from-[hsl(265,83%,57%)] to-[hsl(32,95%,53%)] bg-clip-text text-transparent">
                Stacks & Bitcoin L2
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect wallets, send STX, and call contracts with beautiful UI and simple hooks.
            </p>
          </div>

          {/* Install command */}
          <InstallCommand />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/docs">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Demo */}
          <div className="pt-8">
            <WalletDemo />
          </div>

          {/* Tech stack */}
          <TechStack />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          Built with stacks-kit — MIT License
        </div>
      </footer>
    </div>
  );
}

function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm">
        <span className="text-muted-foreground">$</span>
        <code>{INSTALL_COMMAND}</code>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-2"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        >
          {copied ? (
            <Check className="h-4 w-4 text-[hsl(var(--success))]" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function TechStack() {
  const techs = [
    { name: 'Stacks', color: '#5546FF' },
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'Vite', color: '#646CFF' },
  ];

  return (
    <div className="pt-8 border-t">
      <p className="text-sm text-muted-foreground mb-4">Built with</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {techs.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background text-sm"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
}
