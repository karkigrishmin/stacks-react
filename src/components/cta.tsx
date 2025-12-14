import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, staggerItem } from '@/lib/animation/variants';
import { Button } from './ui/button';

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-bitcoin-orange/10 absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
      </div>

      <div className="container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={staggerItem}
            className="text-display-md font-bold md:text-display-lg"
          >
            Ready to build on <span className="gradient-text-bitcoin">Stacks</span>?
          </motion.h2>

          <motion.p variants={staggerItem} className="mt-4 text-body-lg text-foreground-secondary">
            Get started with stacks-kit today and ship your next Bitcoin L2 application faster than
            ever.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link to="/docs">
                Read the Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/docs/overview">View Examples</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
