import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Spinner from './Spinner.svelte';

// Mock the localeStore to ensure predictable test results
// We mock the store interface directly to avoid hoisting issues with imports
vi.mock('$lib/stores/localeStore', () => {
  return {
    t: {
      subscribe: (fn: (val: (key: string) => string) => void) => {
        fn((key: string) => key);
        return () => {};
      }
    }
  };
});

describe('Spinner', () => {
  it('renders with default attributes and classes', () => {
    const { container } = render(Spinner);
    const divElement = container.querySelector('div');
    const svgElement = container.querySelector('svg');

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveAttribute('role', 'status');
    expect(divElement).toHaveAttribute('aria-live', 'polite');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('animate-spin');
    // Default size from variants.ts is 'md' -> h-8 w-8
    expect(svgElement).toHaveClass('h-8');
    expect(svgElement).toHaveClass('w-8');
    // Default color from variants.ts is 'current' -> text-current
    expect(svgElement).toHaveClass('text-current');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('stroke', 'currentColor');
    expect(svgElement).toHaveAttribute('stroke-width', '2');
    expect(svgElement).toHaveAttribute('stroke-linecap', 'round');
    expect(svgElement).toHaveAttribute('stroke-linejoin', 'round');

    // The text is visually hidden, so we find it by its content and selector
    const spanElement = screen.getByText('spinner.loading', { selector: 'span.sr-only' });
    expect(spanElement).toBeInTheDocument();
  });

  it('renders with different size prop according to variants', () => {
    const { container: smContainer } = render(Spinner, { size: 'sm' });
    const smSvg = smContainer.querySelector('svg');
    expect(smSvg).toHaveClass('h-4');
    expect(smSvg).toHaveClass('w-4');

    const { container: mdContainer } = render(Spinner, { size: 'md' });
    const mdSvg = mdContainer.querySelector('svg');
    expect(mdSvg).toHaveClass('h-8');
    expect(mdSvg).toHaveClass('w-8');

    const { container: lgContainer } = render(Spinner, { size: 'lg' });
    const lgSvg = lgContainer.querySelector('svg');
    expect(lgSvg).toHaveClass('h-12');
    expect(lgSvg).toHaveClass('w-12');
  });

  it('renders with different color prop according to variants', () => {
    const { container: primaryContainer } = render(Spinner, { color: 'primary' });
    expect(primaryContainer.querySelector('svg')).toHaveClass('text-payroll-teal');

    const { container: secondaryContainer } = render(Spinner, { color: 'secondary' });
    expect(secondaryContainer.querySelector('svg')).toHaveClass('text-payroll-gold');

    const { container: highlightContainer } = render(Spinner, { color: 'highlight' });
    expect(highlightContainer.querySelector('svg')).toHaveClass('text-payroll-cyan');

    const { container: whiteContainer } = render(Spinner, { color: 'white' });
    expect(whiteContainer.querySelector('svg')).toHaveClass('text-white');

    const { container: blackContainer } = render(Spinner, { color: 'black' });
    expect(blackContainer.querySelector('svg')).toHaveClass('text-black');

    const { container: currentContainer } = render(Spinner, { color: 'current' });
    expect(currentContainer.querySelector('svg')).toHaveClass('text-current');
  });

  it('renders with a custom label prop', () => {
    const labelText = 'Custom Loading Message';
    render(Spinner, { label: labelText });
    const spanElement = screen.getByText(labelText, { selector: 'span.sr-only' });
    expect(spanElement).toBeInTheDocument();
  });

  it('renders with an additional className prop', () => {
    const customClass = 'extra-class';
    const { container } = render(Spinner, { className: customClass });
    const svgElement = container.querySelector('svg');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass(customClass);
    // Ensure existing classes are still present
    expect(svgElement).toHaveClass('animate-spin');
    expect(svgElement).toHaveClass('h-8'); // default size
    expect(svgElement).toHaveClass('w-8'); // default size
  });

  it('always has the animation class', () => {
    const { container: defaultContainer } = render(Spinner);
    expect(defaultContainer.querySelector('svg')).toHaveClass('animate-spin');

    const { container: sizedContainer } = render(Spinner, { size: 'lg' });
    expect(sizedContainer.querySelector('svg')).toHaveClass('animate-spin');

    const { container: coloredContainer } = render(Spinner, { color: 'secondary' });
    expect(coloredContainer.querySelector('svg')).toHaveClass('animate-spin');
  });
});
