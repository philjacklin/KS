import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from './Sidebar.svelte';
import { createRawSnippet } from 'svelte';
import userEvent from '@testing-library/user-event';

// Mock locale store
vi.mock('$lib/stores/localeStore', () => {
  return {
    t: {
      subscribe: (run: (v: any) => void) => {
        run((key: string) => {
          const translations: Record<string, string> = {
            'sidebar.aria_label': 'Primary Navigation',
          };
          return translations[key] || key;
        });
        return () => { };
      }
    }
  };
});

describe('Sidebar Component', () => {
  it('renders a nav element with aria-label="Primary Navigation"', () => {
    render(Sidebar);
    const nav = screen.getByRole('navigation', { name: /primary navigation/i });
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');
  });

  it('has default visibility and 240px width on desktop', () => {
    const { container } = render(Sidebar);
    const aside = container.querySelector('aside');
    // The variant root slot has w-[240px]
    expect(aside).toHaveClass('w-[240px]');
    // Default isOpen is false, which should have lg:translate-x-0 (desktop visibility)
    expect(aside).toHaveClass('lg:translate-x-0');
    // And -translate-x-full (mobile hidden)
    expect(aside).toHaveClass('-translate-x-full');
  });

  it('renders children correctly', () => {
    const childrenSnippet = createRawSnippet(() => ({
      render: () => '<span>Test Child</span>',
    }));

    render(Sidebar, { props: { children: childrenSnippet } });
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('verifies tab focus order', async () => {
    const user = userEvent.setup();
    const childrenSnippet = createRawSnippet(() => ({
      render: () => `
        <div>
          <a href="/dashboard">Dashboard</a>
          <a href="/payroll">Payroll</a>
        </div>
      `,
    }));

    render(Sidebar, { props: { children: childrenSnippet } });
    
    const dashboardLink = screen.getByRole('link', { name: /^Dashboard$/ });
    const payrollLink = screen.getByRole('link', { name: /^Payroll$/ });

    // Verify Tab Focus Order
    await user.tab();
    expect(dashboardLink).toHaveFocus();
    await user.tab();
    expect(payrollLink).toHaveFocus();
  });

  it('verifies aria-current="page" application on active routes', () => {
    const childrenSnippet = createRawSnippet(() => ({
      render: () => `
        <div>
          <a href="/active" aria-current="page">Active Page</a>
          <a href="/inactive">Inactive Page</a>
        </div>
      `,
    }));

    render(Sidebar, { props: { children: childrenSnippet } });
    
    const activeLink = screen.getByRole('link', { name: /^Active Page$/ });
    expect(activeLink).toHaveAttribute('aria-current', 'page');
    
    const inactiveLink = screen.getByRole('link', { name: /^Inactive Page$/ });
    expect(inactiveLink).not.toHaveAttribute('aria-current');
  });

  it('applies isOpen true variant correctly', () => {
    const { container } = render(Sidebar, { props: { isOpen: true } });
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('translate-x-0');
    expect(aside).not.toHaveClass('-translate-x-full');
  });

  it('applies custom className', () => {
    const { container } = render(Sidebar, { props: { className: 'my-custom-sidebar' } });
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('my-custom-sidebar');
  });
});
