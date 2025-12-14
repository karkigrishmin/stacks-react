import { Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './logo';

const GITHUB_URL = 'https://github.com/your-org/stacks-kit';
const TWITTER_URL = 'https://twitter.com/stacks';
const DISCORD_URL = 'https://discord.gg/stacks';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Examples', href: '/docs/overview' },
    { label: 'Changelog', href: `${GITHUB_URL}/releases` },
  ],
  resources: [
    { label: 'Getting Started', href: '/docs' },
    { label: 'API Reference', href: '/docs/hooks/use-wallet' },
    { label: 'GitHub', href: GITHUB_URL, external: true },
    {
      label: 'NPM',
      href: 'https://npmjs.com/package/stacks-kit',
      external: true,
    },
  ],
  community: [
    { label: 'Discord', href: DISCORD_URL, external: true },
    { label: 'Twitter', href: TWITTER_URL, external: true },
    {
      label: 'GitHub Discussions',
      href: `${GITHUB_URL}/discussions`,
      external: true,
    },
  ],
};

const socialLinks = [
  { label: 'GitHub', href: GITHUB_URL, icon: Github },
  { label: 'Twitter', href: TWITTER_URL, icon: Twitter },
  { label: 'Discord', href: DISCORD_URL, icon: DiscordIcon },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo showText />
            <p className="mt-4 max-w-xs text-body-sm text-foreground-secondary">
              The React toolkit for building applications on Stacks and Bitcoin L2. Simple hooks,
              beautiful UI.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-tertiary transition-colors hover:text-foreground"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Product" links={footerLinks.product} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
          <FooterColumn title="Community" links={footerLinks.community} />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-body-sm text-foreground-tertiary">
            © {currentYear} stacks-kit. MIT License.
          </p>
          <div className="flex items-center gap-6 text-body-sm text-foreground-tertiary">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-body-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : link.href.startsWith('#') ? (
              <a
                href={link.href}
                className="text-body-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                to={link.href}
                className="text-body-sm text-foreground-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
