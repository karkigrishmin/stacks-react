import { createContext, useContext, type ReactNode } from 'react';
import { ThemeProvider, useTheme } from '@/components/theme-provider';
import { Toaster } from 'sonner';

type Theme = 'dark' | 'light' | 'system';
type Network = 'mainnet' | 'testnet';

interface StacksKitConfig {
  appName?: string;
  appDescription?: string;
  defaultNetwork?: Network;
  theme?: Theme;
}

interface StacksKitContextValue {
  appName: string;
  appDescription: string;
  defaultNetwork: Network;
}

const StacksKitContext = createContext<StacksKitContextValue | undefined>(
  undefined
);

interface StacksKitProviderProps {
  children: ReactNode;
  config?: StacksKitConfig;
}

function StacksKitProviderInner({ children, config }: StacksKitProviderProps) {
  const { resolvedTheme } = useTheme();

  const value: StacksKitContextValue = {
    appName: config?.appName ?? 'Stacks App',
    appDescription: config?.appDescription ?? 'A Stacks blockchain application',
    defaultNetwork: config?.defaultNetwork ?? 'mainnet',
  };

  return (
    <StacksKitContext.Provider value={value}>
      {children}
      <Toaster
        theme={resolvedTheme}
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          },
        }}
      />
    </StacksKitContext.Provider>
  );
}

export function StacksKitProvider({
  children,
  config,
}: StacksKitProviderProps) {
  return (
    <ThemeProvider defaultTheme={config?.theme ?? 'dark'}>
      <StacksKitProviderInner config={config}>
        {children}
      </StacksKitProviderInner>
    </ThemeProvider>
  );
}

export function useStacksKit() {
  const context = useContext(StacksKitContext);

  if (context === undefined) {
    throw new Error('useStacksKit must be used within a StacksKitProvider');
  }

  return context;
}

// Re-export useTheme for convenience
export { useTheme };
