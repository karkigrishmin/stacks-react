import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  { title: 'Getting Started', href: '/docs' },
  { title: 'Installation', href: '/docs/installation' },
  {
    title: 'Hooks',
    items: [
      { title: 'useWallet', href: '/docs/hooks/use-wallet' },
      { title: 'useBalance', href: '/docs/hooks/use-balance' },
      { title: 'useStxTransfer', href: '/docs/hooks/use-stx-transfer' },
      { title: 'useContractCall', href: '/docs/hooks/use-contract-call' },
      { title: 'useReadContract', href: '/docs/hooks/use-read-contract' },
      {
        title: 'useTransactionStatus',
        href: '/docs/hooks/use-transaction-status',
      },
      { title: 'useSbtcBalance', href: '/docs/hooks/use-sbtc-balance' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'ConnectButton', href: '/docs/components/connect-button' },
      { title: 'WalletModal', href: '/docs/components/wallet-modal' },
    ],
  },
];

export function Sidebar() {
  return (
    <nav className="w-64 shrink-0 border-r">
      <div className="sticky top-0 h-screen overflow-y-auto p-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <NavItemComponent key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(true);

  if (item.items) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {item.title}
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        {isOpen && (
          <ul className="ml-3 space-y-1 border-l pl-3">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavLink
                  to={subItem.href!}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-md px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )
                  }
                >
                  {subItem.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={item.href!}
        end
        className={({ isActive }) =>
          cn(
            'block rounded-md px-3 py-2 text-sm transition-colors',
            isActive
              ? 'bg-muted font-medium text-foreground'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          )
        }
      >
        {item.title}
      </NavLink>
    </li>
  );
}
