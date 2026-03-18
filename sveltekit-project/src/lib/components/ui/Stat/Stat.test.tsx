import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Stat from './Stat.svelte';
import '@testing-library/jest-dom';

// Mock locale store
vi.mock('$lib/stores/localeStore', () => {
  return {
    t: {
      subscribe: (run: (v: any) => void) => {
        run((key: string) => {
          const translations: Record<string, string> = {
            'stat.total_payroll': 'Total Payroll',
            'stat.payroll_statistic': 'Payroll Statistic',
          };
          return translations[key] || key;
        });
        return () => { };
      }
    }
  };
});

describe('Stat Component', () => {
  it('renders correctly with default props', () => {
    render(Stat, { props: { label: 'stat.total_payroll', value: 1234.56 } });
    
    // Check label
    expect(screen.getByText('Total Payroll')).toBeInTheDocument();
    
    // Check formatted value (default en-US, USD)
    // The format might contain non-breaking space or other characters
    const valueElement = screen.getByText(/\$1,234.56/);
    expect(valueElement).toBeInTheDocument();
    
    // Check default aria-label
    const section = screen.getByLabelText('Payroll Statistic');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
  });

  it('renders with custom aria-label', () => {
    render(Stat, { props: { label: 'stat.total_payroll', value: 1000, ariaLabel: 'custom.label' } });
    expect(screen.getByLabelText('custom.label')).toBeInTheDocument();
  });

  it('renders with custom currency and locale', () => {
    render(Stat, { props: { 
      label: 'stat.total_payroll', 
      value: 1234.56, 
      currency: 'EUR', 
      locale: 'de-DE' 
    } });
    
    // de-DE locale for EUR should be "1.234,56 €"
    // Use a regex to match the value and the currency symbol
    // Svelte 5  seems to react to changes.
    // Note: some environments use different space characters for currency formatting
    expect(screen.getByText(/1\.234,56/)).toBeInTheDocument();
    expect(screen.getByText(/€/)).toBeInTheDocument();
  });

  it('renders trend indicators', () => {
    const { rerender } = render(Stat, { props: { label: 'stat.total_payroll', value: 1000, trend: 'up' } });
    let svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('path')?.getAttribute('d')).toBe('M7 11l5-5 5 5M12 18V6');

    rerender({ label: 'stat.total_payroll', value: 1000, trend: 'down' });
    svg = document.querySelector('svg');
    expect(svg?.querySelector('path')?.getAttribute('d')).toBe('M7 13l5 5 5-5M12 6v12');

    rerender({ label: 'stat.total_payroll', value: 1000, trend: 'neutral' });
    svg = document.querySelector('svg');
    expect(svg?.querySelector('path')?.getAttribute('d')).toBe('M5 12h14');
  });

  it('applies variant styles', () => {
    const { container, rerender } = render(Stat, { props: { label: 'stat.total_payroll', value: 1000, variant: 'default' } });
    let section = container.querySelector('section');
    expect(section).toHaveClass('border-payroll-gold');

    rerender({ label: 'stat.total_payroll', value: 1000, variant: 'cyan' });
    section = container.querySelector('section');
    expect(section).toHaveClass('border-payroll-cyan');
  });

  it('applies custom className', () => {
    const { container } = render(Stat, { props: { label: 'stat.total_payroll', value: 1000, className: 'custom-class' } });
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });
  
  it('does not render trend indicator when trend is not provided', () => {
    render(Stat, { props: { label: 'stat.total_payroll', value: 1000 } });
    const svg = document.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });
});
