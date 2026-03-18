import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { writable } from 'svelte/store';
import Breadcrumb from './Breadcrumb.svelte';

vi.mock('$lib/stores/localeStore', () => {
  const t = writable((key: string) => {
    const translations: Record<string, string> = {
      'breadcrumb.label': 'Translated Breadcrumb',
      'nav.home': 'Home Translation',
    };
    return translations[key] || key;
  });
  return { t };
});

describe('Breadcrumb', () => {
  const items = [
    { label: 'nav.home', path: '/' },
    { label: 'Payroll', path: '/payroll' },
    { label: 'Pay Runs', path: '/payroll/pay-runs' }
  ];

  it('is wrapped in a <nav> element with aria-label="Breadcrumb" (AC 5)', () => {
    render(Breadcrumb, { items });
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Translated Breadcrumb');
    expect(nav.tagName).toBe('NAV');
  });

  it('labels are displayed in the correct order (AC 1)', () => {
    render(Breadcrumb, { items });
    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(3);
    expect(breadcrumbItems[0]).toHaveTextContent('Home Translation');
    expect(breadcrumbItems[1]).toHaveTextContent('Payroll');
    expect(breadcrumbItems[2]).toHaveTextContent('Pay Runs');
  });

  it('all items except the last one are clickable links (AC 2)', () => {
    render(Breadcrumb, { items });
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[0]).toHaveTextContent('Home Translation');
    expect(links[1]).toHaveAttribute('href', '/payroll');
    expect(links[1]).toHaveTextContent('Payroll');
  });

  it('the last item is plain text and not a link (AC 3)', () => {
    render(Breadcrumb, { items });
    
    const lastItemText = screen.getByText('Pay Runs');
    expect(lastItemText.tagName).toBe('SPAN');
    expect(lastItemText).toHaveAttribute('aria-current', 'page');
    expect(lastItemText.closest('a')).toBeNull();
  });

  it('separators are present between navigation items (AC 4)', () => {
    const { container } = render(Breadcrumb, { items });
    
    // There are 3 items, so there should be 2 separators.
    const separators = container.querySelectorAll('span[aria-hidden="true"]');
    expect(separators).toHaveLength(2);
    separators.forEach(separator => {
      expect(separator).toHaveTextContent('/');
    });
  });

  it('applies custom className', () => {
    render(Breadcrumb, { items, className: 'custom-class' });
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-class');
  });

  it('renders correctly without items prop', () => {
    render(Breadcrumb);
    const nav = screen.getByRole('navigation');
    const list = nav.querySelector('ol');
    expect(list?.children).toHaveLength(0);
  });
});
