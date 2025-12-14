import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  { title: 'Getting Started', href: '/docs' },
  { title: 'Installation', href: '/docs/installation' },
  { title: 'Configuration', href: '/docs/configuration' },
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
      { title: 'AddressDisplay', href: '/docs/components/address-display' },
      { title: 'BalanceDisplay', href: '/docs/components/balance-display' },
      { title: 'NetworkBadge', href: '/docs/components/network-badge' },
      {
        title: 'TransactionStatus',
        href: '/docs/components/transaction-status',
      },
    ],
  },
];

export function Sidebar() {
  return (
    <nav className="w-64 shrink-0 border-r" aria-label="Documentation">
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
        <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
          <Collapsible.Trigger className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-md">
            {item.title}
            <ChevronDown
              className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
              aria-hidden="true"
            />
          </Collapsible.Trigger>
          <Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
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
                          : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground',
                      )
                    }
                  >
                    {subItem.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
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
              : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground',
          )
        }
      >
        {item.title}
      </NavLink>
    </li>
  );
}
