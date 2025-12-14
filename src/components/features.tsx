import { motion } from 'framer-motion';
import { Code2, FileCode, Globe, Palette, Send, Wallet } from 'lucide-react';
import { cardHover, staggerContainer, staggerItem } from '@/lib/animation/variants';
import { Card } from './ui/card';

const features = [
  {
    icon: Wallet,
    title: 'Wallet Connection',
    description: 'Connect to Leather, Xverse, and other Stacks wallets with a beautiful modal UI.',
  },
  {
    icon: Send,
    title: 'STX Transfers',
    description:
      'Send STX tokens with built-in loading states, error handling, and transaction tracking.',
  },
  {
    icon: Code2,
    title: 'Contract Calls',
    description:
      'Call smart contract functions with automatic Clarity value encoding and type safety.',
  },
  {
    icon: FileCode,
    title: 'TypeScript First',
    description:
      'Full TypeScript support with inferred types for hooks, components, and contract interactions.',
  },
  {
    icon: Palette,
    title: 'Beautiful UI',
    description:
      'Pre-built components with dark mode, animations, and customizable styles using CSS variables.',
  },
  {
    icon: Globe,
    title: 'Network Support',
    description:
      'Easily switch between mainnet and testnet with automatic API endpoint configuration.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          {/* Section header */}
          <motion.div variants={staggerItem} className="text-center">
            <h2 className="text-display-md font-bold">
              Everything you need to build on <span className="text-bitcoin-orange">Stacks</span>
            </h2>
            <p className="mt-4 text-body-lg text-foreground-secondary">
              A complete toolkit for integrating Stacks blockchain into your React applications.
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div whileHover={cardHover}>
      <Card
        variant="elevated"
        className="hover:border-bitcoin-orange/30 h-full p-6 transition-colors"
      >
        <div className="bg-bitcoin-orange/10 mb-4 inline-flex rounded-lg p-3">
          <Icon className="text-bitcoin-orange h-6 w-6" />
        </div>
        <h3 className="text-heading-sm font-semibold">{title}</h3>
        <p className="mt-2 text-body-sm text-foreground-secondary">{description}</p>
      </Card>
    </motion.div>
  );
}
