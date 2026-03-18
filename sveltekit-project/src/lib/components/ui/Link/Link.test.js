import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { createRawSnippet } from 'svelte';
import Link from './Link.svelte';

// Helper to convert plain text into a Svelte 5 Snippet
const createSnippet = (text) => {
  return createRawSnippet(() => ({
    render: () => text, // Remove the <span> wrapper to keep the DOM flat
  }));
};

describe('Link component', () => {
  it('renders an internal link with the correct href', () => {
    render(Link, { 
      props: { 
        href: '/internal', 
        children: createSnippet('Internal Link') 
      } 
    });
    
    const link = screen.getByRole('link', { name: /internal link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/internal');
    expect(link).not.toHaveAttribute('target');
  });

  it('renders an external link with target="_blank" and rel="noopener noreferrer"', () => {
    render(Link, { 
      props: { 
        href: 'https://example.com', 
        external: true, 
        children: createSnippet('External Link') 
      } 
    });
    
    const link = screen.getByRole('link', { name: /external link/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

it('applies the primary variant class correctly', () => {
    render(Link, { 
      props: { href: '#', variant: 'primary', children: createSnippet('Primary Link') } 
    });
    
    // Get the link itself by its role, not just the text node
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-payroll-teal');
  });

  it('applies the secondary variant class correctly', () => {
    render(Link, { 
      props: { href: '#', variant: 'secondary', children: createSnippet('Secondary Link') } 
    });
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-payroll-gold');
  });

  it('merges custom classes with twMerge', () => {
    render(Link, { 
      props: { href: '#', className: 'custom-class', children: createSnippet('Custom Class') } 
    });
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
    expect(link).toHaveClass('text-payroll-teal');
  });

  it('defaults to primary variant if an invalid variant is provided', () => {
    render(Link, { 
      props: { href: '#', variant: 'invalid', children: createSnippet('Invalid Variant') } 
    });
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-payroll-teal');
  });
});    
