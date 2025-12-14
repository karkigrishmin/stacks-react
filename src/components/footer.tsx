import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './logo';

const GITHUB_URL = 'https://github.com/karkigrishmin/stacks-react';

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
    {
      label: 'GitHub Discussions',
      href: `${GITHUB_URL}/discussions`,
      external: true,
    },
    {
      label: 'GitHub Issues',
      href: `${GITHUB_URL}/issues`,
      external: true,
    },
  ],
};

const socialLinks = [{ label: 'GitHub', href: GITHUB_URL, icon: Github }];

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
