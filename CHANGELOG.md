# [1.1.0](https://github.com/karkigrishmin/stacks-react/compare/v1.0.3...v1.1.0) (2025-12-14)


### Features

* add CSS export for component styling with customizable CSS variables ([73f46c6](https://github.com/karkigrishmin/stacks-react/commit/73f46c6a56c4c77490a0b6f2eeddff5405b59672))

## [1.0.3](https://github.com/karkigrishmin/stacks-react/compare/v1.0.2...v1.0.3) (2025-12-14)


### Bug Fixes

* use React Router Link for internal navigation and add Vercel SPA rewrites ([c1e20cc](https://github.com/karkigrishmin/stacks-react/commit/c1e20ccc1416681eaafb38377bbb0a63e0942223))

## [1.0.2](https://github.com/karkigrishmin/stacks-react/compare/v1.0.1...v1.0.2) (2025-12-14)


### Bug Fixes

* update placeholder URLs, documentation links, and lint warnings ([5c4b28c](https://github.com/karkigrishmin/stacks-react/commit/5c4b28cf41857eb231edfcf634e581b2ff6bf362))

## [1.0.1](https://github.com/karkigrishmin/stacks-react/compare/v1.0.0...v1.0.1) (2025-12-14)


### Bug Fixes

* **docs:** add yarn and pnpm install commands to README ([d3c32f0](https://github.com/karkigrishmin/stacks-react/commit/d3c32f015974b5475877f77f51172dfc169872de))

# 1.0.0 (2025-12-14)


### Bug Fixes

* apply eslint-disable for empty interface types and run prettier formatting on test files ([a76b7b2](https://github.com/karkigrishmin/stacks-react/commit/a76b7b2e6b7d79fbccae17599f86ef09015e64ad))
* **ci:** add Node.js 22 setup for semantic-release compatibility ([c3b126d](https://github.com/karkigrishmin/stacks-react/commit/c3b126d83544a9372ca1546a943d4d1444f3f160))
* resolve TypeScript build errors in test files by using type-only imports and fixing property references ([4a98967](https://github.com/karkigrishmin/stacks-react/commit/4a98967e76b65fd1e4866b2ecd8b145139e81961))


### Features

* add core app structure with entry point, routing, global styles, Zustand wallet store, validation schemas, and Radix UI primitives ([c427d54](https://github.com/karkigrishmin/stacks-react/commit/c427d54a9c5bd05d8abe2398a08e5523c97a51bf))
* add design system foundation with Geist fonts, CSS variables, Framer Motion animations, and UI primitives including Button, Dialog, Badge, Card, Input, Skeleton, and CodeBlock components ([2ac75c1](https://github.com/karkigrishmin/stacks-react/commit/2ac75c1e3b091203dc8d49da3d4a61b0ec9358e1))
* add documentation pages for Configuration and 4 components (AddressDisplay, BalanceDisplay, NetworkBadge, TransactionStatus), implement Radix Collapsible for sidebar navigation with accessibility improvements (aria-labels, aria-expanded, aria-controls) ([b5227c3](https://github.com/karkigrishmin/stacks-react/commit/b5227c30503187a8332d1dc23e6e57e492eb82a4))
* add documentation site with home page, getting started guide, installation instructions, and interactive docs with live examples for all 7 hooks and 2 components ([4d36b09](https://github.com/karkigrishmin/stacks-react/commit/4d36b0905933367a41137d5788cfdccc9aa0eb39))
* add React hooks for Stacks blockchain - useWallet for connection, useBalance and useSbtcBalance for balances, useStxTransfer and useContractCall for transactions, useReadContract for read-only calls, useTransactionStatus for polling ([5b4ee02](https://github.com/karkigrishmin/stacks-react/commit/5b4ee02673c3f1022c9d42981e6905efa07b51f6))
* add Stacks UI components - ConnectButton with dropdown menu, WalletModal for provider selection, AddressDisplay, BalanceDisplay, NetworkBadge, TransactionStatus, and animated WalletDemo ([5bd10c3](https://github.com/karkigrishmin/stacks-react/commit/5bd10c3758bddbf5110ffdb3b32afcd2f07ca874))
* configure npm package publishing with tsup, semantic-release, and automated CI workflow ([d171de0](https://github.com/karkigrishmin/stacks-react/commit/d171de0d53f8c788acaf95d8ae296a4dea255f82))
* redesign wallet components with design system colors and animations, add homepage sections (Navbar, Hero, Features, CodeDemo, Stats, CTA, Footer), update Logo with Bitcoin orange branding and favicon ([959052f](https://github.com/karkigrishmin/stacks-react/commit/959052fe47ba6afb27abaa9eb25e31dcd74f882a))
