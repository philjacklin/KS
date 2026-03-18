import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Layout from './Layout.svelte';

describe('Layout.svelte', () => {
  // Helper to create a snippet compatible with Svelte 5 tests
  const createSnippet = (html: string) => createRawSnippet(() => ({
    render: () => html
  }));

  it('renders with default props', () => {
    render(Layout, {
      props: {
        children: createSnippet('<div>Child</div>')
      }
    });

    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid', 'grid-cols-1');
    expect(grid).toHaveStyle('gap: 1rem');
  });

  it('renders with custom `cols`', () => {
    render(Layout, {
      props: {
        cols: 4,
        children: createSnippet('<div>Child</div>')
      }
    });

    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toHaveClass('grid-cols-4');
  });

  it('sanitizes `cols` prop, defaulting to 1 for invalid values', () => {
    render(Layout, {
      props: {
        cols: -1,
        children: createSnippet('<div>Child</div>')
      }
    });
    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toHaveClass('grid-cols-1');
  });

  it('renders with a custom `gap`', () => {
    render(Layout, {
      props: {
        gap: '2rem',
        children: createSnippet('<div>Child</div>')
      }
    });

    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toHaveStyle('gap: 2rem');
  });

  it('applies responsive column classes correctly', () => {
    render(Layout, {
      props: {
        sm: 2,
        md: 3,
        lg: 4,
        xl: 6,
        children: createSnippet('<div>Child</div>')
      }
    });

    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toHaveClass('sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'xl:grid-cols-6');
  });

  it('applies the container class when `container` is true', () => {
    render(Layout, {
      props: {
        container: true,
        children: createSnippet('<div>Child</div>')
      }
    });

    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toHaveClass('container', 'mx-auto');
  });

  it('merges external classes using the `className` prop', () => {
    render(Layout, {
      props: {
        className: 'custom-class another-class',
        children: createSnippet('<div>Child</div>')
      }
    });

    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toHaveClass('custom-class', 'another-class');
  });

  it('renders children content correctly', () => {
    render(Layout, {
      props: {
        // Wrapped in a single div to satisfy Svelte 5's preference for single-element returns in raw snippets
        children: createSnippet('<div><div>Child 1</div><div>Child 2</div></div>')
      }
    });

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('handles a combination of all props', () => {
    render(Layout, {
      props: {
        cols: 2,
        gap: '1.5rem',
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
        container: true,
        className: 'extra-styles',
        children: createSnippet('<span>Content</span>')
      }
    });

    const grid = screen.getByRole('grid', { hidden: true });
    expect(grid).toHaveClass(
      'grid',
      'grid-cols-2',
      'sm:grid-cols-3',
      'md:grid-cols-4',
      'lg:grid-cols-5',
      'xl:grid-cols-6',
      'container',
      'mx-auto',
      'extra-styles'
    );
    expect(grid).toHaveStyle('gap: 1.5rem');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});