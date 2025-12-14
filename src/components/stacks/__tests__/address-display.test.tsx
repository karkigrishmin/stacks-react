import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/test-utils';
import { AddressDisplay } from '../address-display';
import { MOCK_STX_ADDRESS } from '@/test/mocks/handlers';

describe('AddressDisplay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the address', () => {
    render(<AddressDisplay address={MOCK_STX_ADDRESS} />);

    // Should show truncated address by default
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should truncate address by default', () => {
    render(<AddressDisplay address={MOCK_STX_ADDRESS} />);

    const button = screen.getByRole('button');
    // Default truncate length is 4, so should show first 4 and last 4 chars
    expect(button).toHaveTextContent('ST1P...GZGM');
  });

  it('should respect custom truncateLength', () => {
    render(<AddressDisplay address={MOCK_STX_ADDRESS} truncateLength={6} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('ST1PQH...TPGZGM');
  });

  it('should show full address when truncate is false', () => {
    render(<AddressDisplay address={MOCK_STX_ADDRESS} truncate={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(MOCK_STX_ADDRESS);
  });

  it('should show copy icon when copyable', () => {
    render(<AddressDisplay address={MOCK_STX_ADDRESS} copyable={true} />);

    // The button should be enabled
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should not show copy icon when not copyable', () => {
    render(<AddressDisplay address={MOCK_STX_ADDRESS} copyable={false} />);

    // When not copyable, it renders as a span (not a button)
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('ST1P...GZGM')).toBeInTheDocument();
  });

  it('should copy address to clipboard on click', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText: mockWriteText });

    render(<AddressDisplay address={MOCK_STX_ADDRESS} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(MOCK_STX_ADDRESS);
    });
  });

  it('should copy full address even when displayed truncated', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText: mockWriteText });

    render(<AddressDisplay address={MOCK_STX_ADDRESS} truncate={true} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      // Should copy the full address, not the truncated one
      expect(mockWriteText).toHaveBeenCalledWith(MOCK_STX_ADDRESS);
    });
  });

  it('should not copy when copyable is false', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText: mockWriteText });

    render(<AddressDisplay address={MOCK_STX_ADDRESS} copyable={false} />);

    // When not copyable, it renders as a span (not clickable)
    const addressText = screen.getByText('ST1P...GZGM');
    fireEvent.click(addressText);

    expect(mockWriteText).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(
      <AddressDisplay address={MOCK_STX_ADDRESS} className="custom-class" />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should not truncate short addresses', () => {
    const shortAddress = 'ST1ABC';
    render(<AddressDisplay address={shortAddress} />);

    const button = screen.getByRole('button');
    // Short addresses shouldn't be truncated
    expect(button).toHaveTextContent(shortAddress);
  });
});
