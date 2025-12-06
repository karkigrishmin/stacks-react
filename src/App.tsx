import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HomePage } from '@/pages/home';
import { DocsLayout } from '@/components/docs/docs-layout';
import { DocsOverview } from '@/pages/docs/overview';
import { DocsInstallation } from '@/pages/docs/installation';
import { DocsUseWallet } from '@/pages/docs/hooks/use-wallet';
import { DocsUseBalance } from '@/pages/docs/hooks/use-balance';
import { DocsUseStxTransfer } from '@/pages/docs/hooks/use-stx-transfer';
import { DocsUseContractCall } from '@/pages/docs/hooks/use-contract-call';
import { DocsUseReadContract } from '@/pages/docs/hooks/use-read-contract';
import { DocsUseTransactionStatus } from '@/pages/docs/hooks/use-transaction-status';
import { DocsUseSbtcBalance } from '@/pages/docs/hooks/use-sbtc-balance';
import { DocsConnectButton } from '@/pages/docs/components/connect-button';
import { DocsWalletModal } from '@/pages/docs/components/wallet-modal';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsOverview />} />
          <Route path="installation" element={<DocsInstallation />} />
          <Route path="hooks/use-wallet" element={<DocsUseWallet />} />
          <Route path="hooks/use-balance" element={<DocsUseBalance />} />
          <Route
            path="hooks/use-stx-transfer"
            element={<DocsUseStxTransfer />}
          />
          <Route
            path="hooks/use-contract-call"
            element={<DocsUseContractCall />}
          />
          <Route
            path="hooks/use-read-contract"
            element={<DocsUseReadContract />}
          />
          <Route
            path="hooks/use-transaction-status"
            element={<DocsUseTransactionStatus />}
          />
          <Route
            path="hooks/use-sbtc-balance"
            element={<DocsUseSbtcBalance />}
          />
          <Route
            path="components/connect-button"
            element={<DocsConnectButton />}
          />
          <Route path="components/wallet-modal" element={<DocsWalletModal />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  );
}

export default App;
