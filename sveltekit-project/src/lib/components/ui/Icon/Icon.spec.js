// src/lib/components/Icon.spec.js
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Icon from './Icon.svelte';

// Mock SVG data for testing
const mockSvg = '<svg data-testid="mock-svg" width="24" height="24"><path d="M12 2L2 22h20L12 2z"/></svg>';

describe('Icon.svelte', () => {
  it('correctly injects the SVG string into the DOM', () => {
    render(Icon, { props: { svg: mockSvg } });
    const svgElement = screen.getByTestId('mock-svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.tagName).toBe('svg');
  });

  it('updates the container width and height based on the size prop', () => {
    render(Icon, { props: { svg: mockSvg, size: '48px' } });
    const iconContainer = screen.getByTestId('icon-container');
    expect(iconContainer).toHaveStyle('width: 48px');
    expect(iconContainer).toHaveStyle('height: 48px');
  });

  it('sets aria-label and role="img" when alt prop is provided', () => {
    render(Icon, { props: { svg: mockSvg, alt: 'A descriptive label' } });
    const container = screen.getByRole('img');
    expect(container).toHaveAttribute('aria-label', 'A descriptive label');
    expect(container).not.toHaveAttribute('aria-hidden');
  });

  it('sets aria-hidden="true" when alt prop is not provided', () => {
    render(Icon, { props: { svg: mockSvg } });
    const iconContainer = screen.getByTestId('icon-container');
    
    expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    expect(iconContainer).not.toHaveAttribute('aria-label');
    
    // Change line 36 from:
    // expect(iconContainer).not.toHaveAttribute('role');
    // To:
    expect(iconContainer).toHaveAttribute('role', 'presentation'); 
  });

  it('correctly merges classes from className prop', () => {
    render(Icon, {
      props: {
        svg: mockSvg,
        className: 'custom-class1 custom-class2',
      },
    });
    const iconContainer = screen.getByTestId('icon-container');
    expect(iconContainer).toHaveClass('custom-class1');
    expect(iconContainer).toHaveClass('custom-class2');
  });

  it('filters out falsy values from className prop', () => {
    render(Icon, {
      props: {
        svg: mockSvg,
        className: ['custom-class', null, undefined, false, 'another-class'].join(' '),
      },
    });
    const iconContainer = screen.getByTestId('icon-container');
    expect(iconContainer).toHaveClass('custom-class');
    expect(iconContainer).toHaveClass('another-class');
    expect(iconContainer.classList.contains('null')).toBe(false);
    expect(iconContainer.classList.contains('undefined')).toBe(false);
  });
});
