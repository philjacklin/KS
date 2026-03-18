import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { writable } from 'svelte/store';
import Alert from './Alert.svelte';

// Correct the mock path to match the actual import path in the component.
vi.mock('../../../stores/localeStore.js', () => {
    const t = (key: string) => {
        const translations: { [key: string]: string } = {
            'alert.dismiss': 'Dismiss',
            'default.message': 'This is a default message.',
            'alert.title': 'Alert Title',
            'alert.message': 'This is an alert message.',
            'success.message': 'Success!',
            'warning.message': 'Warning!',
            'error.message': 'Error!',
            'inline.message': 'This is an inline alert.'
        };
        return translations[key] || key;
    };
    // The component uses {(...)}, so it expects 't' to be a readable store.
    // The store's value is the translation function itself.
    return {
        t: writable(t)
    };
});

describe('Alert', () => {
  it('renders with default props (info type)', () => {
    render(Alert, { message: 'default.message' });
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    // Correct class assertion based on variants.ts
    expect(alertElement).toHaveClass('bg-payroll-teal');
    expect(screen.getByText('This is a default message.')).toBeInTheDocument();
  });

  it('renders a title and a message', () => {
    render(Alert, { title: 'alert.title', message: 'alert.message' });
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('This is an alert message.')).toBeInTheDocument();
  });

  it('renders as success type', () => {
    render(Alert, { type: 'success', message: 'success.message' });
    const alertElement = screen.getByRole('alert');
    // Class assertion is correct based on variants.ts
    expect(alertElement).toHaveClass('bg-status-approved');
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('renders as warning type', () => {
    render(Alert, { type: 'warning', message: 'warning.message' });
    const alertElement = screen.getByRole('alert');
    // Correct class assertion based on variants.ts
    expect(alertElement).toHaveClass('bg-status-destructive');
    expect(screen.getByText('Warning!')).toBeInTheDocument();
  });

  it('renders as error type', () => {
    render(Alert, { type: 'error', message: 'error.message' });
    const alertElement = screen.getByRole('alert');
    // Correct class assertion based on variants.ts
    expect(alertElement).toHaveClass('bg-status-failed');
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('is dismissible when the dismissible prop is true', async () => {
    render(Alert, { message: 'default.message', dismissible: true });
    
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();

    // With the mock fixed, we can now find the button by its translated ARIA label.
    const dismissButton = screen.getByLabelText('Dismiss');
    expect(dismissButton).toBeInTheDocument();

    await fireEvent.click(dismissButton);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('is not dismissible when the dismissible prop is false', () => {
    render(Alert, { message: 'default.message', dismissible: false });
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();
  });

  it('renders with inline-specific styles when inline prop is true', () => {
    render(Alert, { message: 'inline.message', inline: true });
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    // The variants file specifies 'mb-4' for inline: false, so this checks that the margin is removed.
    expect(alertElement).not.toHaveClass('mb-4');
    // Check that the inline-specific classes are applied.
    expect(alertElement).toHaveClass('shadow-none');
    expect(alertElement).toHaveClass('border-0');
  });
});

