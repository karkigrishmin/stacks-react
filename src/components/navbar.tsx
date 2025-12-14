import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, BookOpen, Layers } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { ConnectButton } from './stacks/connect-button';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { fadeIn, slideDown } from '@/lib/animation/variants';

const GITHUB_URL = 'https://github.com/your-org/stacks-kit';

const navLinks = [
  { href: '#features', label: 'Features', icon: Layers },
  { href: '/docs', label: 'Docs', icon: BookOpen },
  { href: GITHUB_URL, label: 'GitHub', icon: Github, external: true },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'border-b border-border',
        'backdrop-blur-[12px]',
        'bg-background/80 dark:bg-[rgba(13,13,15,0.8)]'
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo showText />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <ConnectButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            variants={slideDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'absolute left-0 right-0 top-16 z-40',
              'border-b border-border',
              'bg-background/95 backdrop-blur-lg',
              'md:hidden'
            )}
          >
            <div className="container py-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    {...link}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 top-16 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

function NavLink({ href, label, icon: Icon, external }: NavLinkProps) {
  const className = cn(
    'flex items-center gap-2 px-3 py-2 rounded-md',
    'text-body-sm text-foreground-secondary',
    'hover:text-foreground hover:bg-background-secondary',
    'transition-colors duration-fast'
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        <Icon className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  icon: Icon,
  external,
  onClick,
}: NavLinkProps & { onClick: () => void }) {
  const className = cn(
    'flex items-center gap-3 px-4 py-3 rounded-lg',
    'text-body-md text-foreground',
    'hover:bg-background-secondary',
    'transition-colors duration-fast'
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        <Icon className="h-5 w-5 text-foreground-secondary" />
        {label}
      </a>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className} onClick={onClick}>
        <Icon className="h-5 w-5 text-foreground-secondary" />
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={className} onClick={onClick}>
      <Icon className="h-5 w-5 text-foreground-secondary" />
      {label}
    </Link>
  );
}
