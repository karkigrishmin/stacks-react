import { motion } from 'framer-motion';
import { Download, Star, Wallet, Code } from 'lucide-react';
import { Card } from './ui/card';
import { staggerContainer, staggerItem } from '@/lib/animation/variants';

const stats = [
  {
    icon: Download,
    value: '0',
    label: 'NPM Downloads',
    color: 'text-bitcoin-orange',
  },
  {
    icon: Star,
    value: '0',
    label: 'GitHub Stars',
    color: 'text-warning',
  },
  {
    icon: Wallet,
    value: '5+',
    label: 'Wallets Supported',
    color: 'text-stacks-purple',
  },
  {
    icon: Code,
    value: '7',
    label: 'React Hooks',
    color: 'text-success',
  },
];

export function Stats() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
}

function StatCard({ icon: Icon, value, label, color }: StatCardProps) {
  return (
    <Card variant="gradient" className="p-6 text-center">
      <div className="mb-3 inline-flex rounded-lg bg-background-secondary p-3">
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div className="text-display-md font-bold">{value}</div>
      <div className="mt-1 text-body-sm text-foreground-secondary">{label}</div>
    </Card>
  );
}
