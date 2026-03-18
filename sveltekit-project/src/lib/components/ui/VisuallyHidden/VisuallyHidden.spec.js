import { render, screen } from '@testing-library/svelte';
import { expect, it, describe } from 'vitest';
import VisuallyHidden from './VisuallyHidden.svelte';
import { createRawSnippet } from 'svelte';

describe('VisuallyHidden', () => {
  it('renders the slot content', () => {
    // FIX: Wrap the text in an HTML tag
    const children = createRawSnippet(() => ({
      render: () => '<span>Hidden Content</span>'
    }));

    render(VisuallyHidden, { props: { children } });

    expect(screen.getByText('Hidden Content')).toBeTruthy();
  });

  it('renders the component with the correct styles', () => {
    // FIX: Wrap the text in an HTML tag
    const children = createRawSnippet(() => ({
      render: () => '<span>test</span>'
    }));

    render(VisuallyHidden, { 
      props: { children, className: 'custom-class' } 
    });

    // Note: getByText('test') will find the span, 
    // but the classes are likely on the VisuallyHidden wrapper.
    const element = screen.getByText('test').parentElement; 
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveClass('absolute');
  });
});