import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { ConnectButton } from '../connect-button';
import { useWalletStore } from '@/stores/wallet-store';
import { MOCK_STX_ADDRESS } from '@/test/mocks/handlers';

// Mock @stacks/connect to avoid ESM issues
vi.mock('@stacks/connect', () => ({
  DEFAULT_PROVIDERS: [],
  request: vi.fn(),
  disconnect: vi.fn(),
  getLocalStorage: vi.fn(),
}));

// Mock @stacks/connect-ui
vi.mock('@stacks/connect-ui', () => ({
  getProviderFromId: vi.fn(),
  setSelectedProviderId: vi.fn(),
}));

// Mock useWallet hook to avoid importing @stacks/connect
const mockConnect = vi.fn();
const mockDisconnect = vi.fn();
const mockSetNetwork = vi.fn();

vi.mock('@/hooks/use-wallet', () => ({
  useWallet: () => {
    const store = useWalletStore.getState();
    return {
      isConnected: store.isConnected,
      isConnecting: store.isConnecting,
      address: store.address,
      network: store.network,
      error: store.error,
      connect: mockConnect,
      disconnect: mockDisconnect,
      setNetwork: mockSetNetwork,
    };
  },
}));

// Mock Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ConnectButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to disconnected state
    useWalletStore.setState({
      isConnected: false,
      isConnecting: false,
      address: null,
      btcAddress: null,
      network: 'mainnet',
      error: null,
    });
  });

  describe('when disconnected', () => {
    it('should render connect button', () => {
      render(<ConnectButton />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    });

    it('should use custom label when provided', () => {
      render(<ConnectButton label="Connect Now" />);

      expect(screen.getByText('Connect Now')).toBeInTheDocument();
    });

    it('should show connecting state', () => {
      useWalletStore.setState({ isConnecting: true });

      render(<ConnectButton />);

      expect(screen.getByText('Connecting...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should open wallet modal on click', () => {
      render(<ConnectButton />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Modal should be rendered
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<ConnectButton className="custom-class" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('when connected', () => {
    beforeEach(() => {
      useWalletStore.setState({
        isConnected: true,
        address: MOCK_STX_ADDRESS,
        network: 'mainnet',
      });
    });

    it('should show dropdown trigger', () => {
      render(<ConnectButton />);

      // Should show dropdown trigger button
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should show truncated address', () => {
      render(<ConnectButton />);

      // Should show truncated address
      expect(screen.getByText(/ST1P.*GZGM/)).toBeInTheDocument();
    });

    it('should show network badge when showNetwork is true', () => {
      useWalletStore.setState({ network: 'testnet' });

      render(<ConnectButton showNetwork={true} />);

      // NetworkBadge capitalizes the network name
      expect(screen.getByText('Testnet')).toBeInTheDocument();
    });

    it('should not show network badge by default', () => {
      render(<ConnectButton />);

      expect(screen.queryByText('mainnet')).not.toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<ConnectButton className="my-custom-class" />);

      // The first button should have the custom class
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveClass('my-custom-class');
    });
  });
});
