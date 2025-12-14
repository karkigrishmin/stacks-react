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
