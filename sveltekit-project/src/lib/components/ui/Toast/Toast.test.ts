import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Toast from './Toast.svelte';
import TestIcon from './TestIcon.svelte'; // A simple dummy component for testing the icon slot
import { t } from '$lib/stores/localeStore';
import { get } from 'svelte/store';

// Mock the store
vi.mock('$lib/stores/localeStore', () => ({
  t: {
    subscribe: (fn) => {
      fn((key) => key); // Return the key itself for simplicity in tests
      return () => {};
    }
  }
}));

describe('Toast', () => {
  // Test 1: Basic Rendering
  it('renders the message correctly', () => {
    const message = 'This is a test message';
    render(Toast, { message });
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  // Test 2: Title Prop
  it('renders the title when provided', () => {
    const title = 'Test Title';
    const message = 'This is a test message';
    render(Toast, { title, message });
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  // Test 3: Icon Prop
  it('renders the icon when provided', () => {
    render(Toast, {
      message: 'Icon test',
      icon: TestIcon
    });
    // Assuming TestIcon renders a specific text or data-testid
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  // Test 4: Manual Dismissal (Close Button)
  it('calls ondismiss when the close button is clicked', async () => {
    const ondismiss = vi.fn();
    render(Toast, { message: 'Test', ondismiss });

    // Use the key from the i18n store
    const closeButton = screen.getByLabelText('toast.close_button_label');
    await fireEvent.click(closeButton);

    expect(ondismiss).toHaveBeenCalledTimes(1);
  });

  // Test 5: Auto-Dismissal with Timer
  it('calls ondismiss after the specified duration', async () => {
    vi.useFakeTimers();
    const ondismiss = vi.fn();
    const duration = 3000;
    render(Toast, { message: 'Test', duration, ondismiss });

    expect(ondismiss).not.toHaveBeenCalled();

    // Fast-forward time
    vi.advanceTimersByTime(duration);

    expect(ondismiss).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  // Test 6: Pause and Resume Timer on Hover
  it('pauses the timer on mouseenter and resumes on mouseleave', async () => {
    vi.useFakeTimers();
    const ondismiss = vi.fn();
    const duration = 5000;
    const { container } = render(Toast, { message: 'Test', duration, ondismiss });
    const toastElement = container.firstChild;

    // Advance time by 2 seconds
    vi.advanceTimersByTime(2000);
    expect(ondismiss).not.toHaveBeenCalled();

    // Pause by hovering
    await fireEvent.mouseEnter(toastElement);

    // Advance time past the original duration; it should not have fired
    vi.advanceTimersByTime(4000);
    expect(ondismiss).not.toHaveBeenCalled();

    // Resume by leaving
    await fireEvent.mouseLeave(toastElement);

    // It should not have fired yet
    expect(ondismiss).not.toHaveBeenCalled();

    // Advance the remaining time (original duration - elapsed time during first advance)
    vi.advanceTimersByTime(3000); // 5000 - 2000 = 3000
    expect(ondismiss).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  // Test 7: Destructive Variant Class
  it('applies the correct classes for the destructive type', () => {
    const { container } = render(Toast, { message: 'Error!', type: 'error' });
    // Assert against a class that is actually present in the 'error' variant
    expect(container.firstChild).toHaveClass('border-red-500');
    expect(container.firstChild).toHaveClass('bg-red-100');
  });
});
