import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animation/variants';
import { WalletDemo } from './stacks/wallet-demo';
import { CodeBlock } from './ui/code-block';

const exampleCode = `import { useWallet } from 'stacks-kit';

function App() {
  const {
    isConnected,
    address,
    connect,
    disconnect
  } = useWallet();

  return (
    <div>
      {isConnected ? (
        <>
          <p>Connected: {address}</p>
          <button onClick={disconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <button onClick={connect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}`;

export function CodeDemo() {
  return (
    <section className="border-y border-border bg-background-secondary py-16 md:py-24">
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
              Simple, powerful <span className="text-stacks-purple">hooks</span>
            </h2>
            <p className="mt-4 text-body-lg text-foreground-secondary">
              Get started in minutes with intuitive React hooks and components.
            </p>
          </motion.div>

          {/* Code + Demo grid */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Code example */}
            <motion.div variants={staggerItem}>
              <CodeBlock code={exampleCode} language="tsx" showLineNumbers />
            </motion.div>

            {/* Live demo */}
            <motion.div variants={staggerItem} className="flex items-center justify-center">
              <WalletDemo />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
