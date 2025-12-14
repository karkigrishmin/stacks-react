import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animation/variants';
import { Button } from './ui/button';
import { CopyButton } from './ui/copy-button';

const INSTALL_COMMAND = 'npm create stacks-kit@latest';
const GITHUB_URL = 'https://github.com/your-org/stacks-kit';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="bg-hero-gradient pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative py-20 md:py-28 lg:py-36">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl space-y-8 text-center"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-secondary px-4 py-1.5 text-body-sm text-foreground-secondary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              Now with Stacks Connect v8
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-display-lg font-bold tracking-tight md:text-display-xl"
          >
            The React toolkit for <span className="gradient-text-brand">Stacks & Bitcoin L2</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="mx-auto max-w-2xl text-body-lg text-foreground-secondary"
          >
            Connect wallets, send STX, and interact with smart contracts using beautiful UI
            components and simple React hooks.
          </motion.p>

          {/* Install command */}
          <motion.div variants={staggerItem}>
            <InstallCommand />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild>
              <a href="/docs">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function InstallCommand() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-mono text-body-sm">
        <span className="text-foreground-tertiary">$</span>
        <code className="text-foreground">{INSTALL_COMMAND}</code>
        <CopyButton value={INSTALL_COMMAND} className="ml-2 h-8 w-8" />
      </div>
    </div>
  );
}
