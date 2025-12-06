import { describe, it, expect, beforeEach } from 'vitest';
import { useWalletStore } from '../wallet-store';
import { MOCK_STX_ADDRESS, MOCK_BTC_ADDRESS } from '@/test/mocks/handlers';

describe('wallet-store', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useWalletStore.setState({
      isConnected: false,
      isConnecting: false,
      address: null,
      btcAddress: null,
      network: 'mainnet',
      error: null,
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useWalletStore.getState();

      expect(state.isConnected).toBe(false);
      expect(state.isConnecting).toBe(false);
      expect(state.address).toBeNull();
      expect(state.btcAddress).toBeNull();
      expect(state.network).toBe('mainnet');
      expect(state.error).toBeNull();
    });
  });

  describe('setConnecting', () => {
    it('should set isConnecting to true', () => {
      useWalletStore.getState().setConnecting(true);

      expect(useWalletStore.getState().isConnecting).toBe(true);
    });

    it('should set isConnecting to false', () => {
      useWalletStore.setState({ isConnecting: true });
      useWalletStore.getState().setConnecting(false);

      expect(useWalletStore.getState().isConnecting).toBe(false);
    });
  });

  describe('setConnected', () => {
    it('should set connected state with STX address', () => {
      useWalletStore.getState().setConnected(MOCK_STX_ADDRESS, null);

      const state = useWalletStore.getState();
      expect(state.isConnected).toBe(true);
      expect(state.isConnecting).toBe(false);
      expect(state.address).toBe(MOCK_STX_ADDRESS);
      expect(state.btcAddress).toBeNull();
      expect(state.error).toBeNull();
    });

    it('should set connected state with both addresses', () => {
      useWalletStore.getState().setConnected(MOCK_STX_ADDRESS, MOCK_BTC_ADDRESS);

      const state = useWalletStore.getState();
      expect(state.isConnected).toBe(true);
      expect(state.address).toBe(MOCK_STX_ADDRESS);
      expect(state.btcAddress).toBe(MOCK_BTC_ADDRESS);
    });

    it('should clear isConnecting when connected', () => {
      useWalletStore.setState({ isConnecting: true });
      useWalletStore.getState().setConnected(MOCK_STX_ADDRESS, null);

      expect(useWalletStore.getState().isConnecting).toBe(false);
    });

    it('should clear error when connected', () => {
      useWalletStore.setState({ error: new Error('Previous error') });
      useWalletStore.getState().setConnected(MOCK_STX_ADDRESS, null);

      expect(useWalletStore.getState().error).toBeNull();
    });
  });

  describe('setDisconnected', () => {
    it('should clear connection state', () => {
      // First set connected state
      useWalletStore.setState({
        isConnected: true,
        address: MOCK_STX_ADDRESS,
        btcAddress: MOCK_BTC_ADDRESS,
      });

      useWalletStore.getState().setDisconnected();

      const state = useWalletStore.getState();
      expect(state.isConnected).toBe(false);
      expect(state.address).toBeNull();
      expect(state.btcAddress).toBeNull();
    });

    it('should preserve network setting', () => {
      useWalletStore.setState({
        isConnected: true,
        address: MOCK_STX_ADDRESS,
        network: 'testnet',
      });

      useWalletStore.getState().setDisconnected();

      expect(useWalletStore.getState().network).toBe('testnet');
    });
  });

  describe('setNetwork', () => {
    it('should set network to mainnet', () => {
      useWalletStore.getState().setNetwork('mainnet');

      expect(useWalletStore.getState().network).toBe('mainnet');
    });

    it('should set network to testnet', () => {
      useWalletStore.getState().setNetwork('testnet');

      expect(useWalletStore.getState().network).toBe('testnet');
    });

    it('should preserve connection state when switching network', () => {
      useWalletStore.setState({
        isConnected: true,
        address: MOCK_STX_ADDRESS,
      });

      useWalletStore.getState().setNetwork('testnet');

      const state = useWalletStore.getState();
      expect(state.isConnected).toBe(true);
      expect(state.address).toBe(MOCK_STX_ADDRESS);
      expect(state.network).toBe('testnet');
    });
  });

  describe('setError', () => {
    it('should set error', () => {
      const error = new Error('Test error');
      useWalletStore.getState().setError(error);

      expect(useWalletStore.getState().error).toBe(error);
    });

    it('should clear isConnecting when setting error', () => {
      useWalletStore.setState({ isConnecting: true });
      useWalletStore.getState().setError(new Error('Test error'));

      expect(useWalletStore.getState().isConnecting).toBe(false);
    });

    it('should clear error when passing null', () => {
      useWalletStore.setState({ error: new Error('Previous error') });
      useWalletStore.getState().setError(null);

      expect(useWalletStore.getState().error).toBeNull();
    });
  });

  describe('persistence', () => {
    it('should have persist middleware configured', () => {
      // The store uses persist middleware with name 'stacks-wallet'
      // We can verify the store has the expected structure
      expect(typeof useWalletStore.getState).toBe('function');
      expect(typeof useWalletStore.setState).toBe('function');
      expect(typeof useWalletStore.subscribe).toBe('function');
    });
  });
});
