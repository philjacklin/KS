import { render, screen, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AccordionTest from './AccordionTest.svelte';

describe('Accordion Component', () => {
  it('renders correctly with multiple items', () => {
    render(AccordionTest);
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();
    expect(screen.getByText('Header 3')).toBeInTheDocument();
  });

  it('toggles visibility when clicking headers', async () => {
    render(AccordionTest);
    const header1 = screen.getByText('Header 1').closest('button');
    const content1 = screen.getByText('Content 1').closest('[role="region"]');

    // Initially closed
    expect(header1).toHaveAttribute('aria-expanded', 'false');
    expect(content1).toHaveAttribute('aria-hidden', 'true');
    expect(content1).toHaveAttribute('hidden');

    // Click to open
    await fireEvent.click(header1!);
    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(content1).toHaveAttribute('aria-hidden', 'false');
    expect(content1).not.toHaveAttribute('hidden');

    // Click to close
    await fireEvent.click(header1!);
    expect(header1).toHaveAttribute('aria-expanded', 'false');
    expect(content1).toHaveAttribute('aria-hidden', 'true');
    expect(content1).toHaveAttribute('hidden');
  });

  it('allows multiple items to be open when allowMultiple is true', async () => {
    render(AccordionTest, { props: { allowMultiple: true } });
    const header1 = screen.getByText('Header 1').closest('button');
    const header2 = screen.getByText('Header 2').closest('button');

    await fireEvent.click(header1!);
    await fireEvent.click(header2!);

    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(header2).toHaveAttribute('aria-expanded', 'true');

    // Untoggle one
    await fireEvent.click(header1!);
    expect(header1).toHaveAttribute('aria-expanded', 'false');
    expect(header2).toHaveAttribute('aria-expanded', 'true');
  });

  it('only allows one item to be open when allowMultiple is false', async () => {
    render(AccordionTest, { props: { allowMultiple: false } });
    const header1 = screen.getByText('Header 1').closest('button');
    const header2 = screen.getByText('Header 2').closest('button');

    await fireEvent.click(header1!);
    expect(header1).toHaveAttribute('aria-expanded', 'true');

    await fireEvent.click(header2!);
    expect(header1).toHaveAttribute('aria-expanded', 'false');
    expect(header2).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles visibility with Enter and Space keys', async () => {
    const user = userEvent.setup();
    render(AccordionTest);
    const header1 = screen.getByText('Header 1').closest('button');

    header1?.focus();
    await user.keyboard('{Enter}');
    expect(header1).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard(' ');
    expect(header1).toHaveAttribute('aria-expanded', 'false');
  });

  it('navigates between headers with arrow keys', async () => {
    const user = userEvent.setup();
    render(AccordionTest);
    const header1 = screen.getByText('Header 1').closest('button');
    const header2 = screen.getByText('Header 2').closest('button');
    const header3 = screen.getByText('Header 3').closest('button');

    header1?.focus();
    expect(header1).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(header2).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(header3).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(header1).toHaveFocus(); // Wraps around

    await user.keyboard('{ArrowUp}');
    expect(header3).toHaveFocus(); // Wraps around

    await user.keyboard('{Home}');
    expect(header1).toHaveFocus();

    await user.keyboard('{End}');
    expect(header3).toHaveFocus();
  });

  it('moves focus through headers using Tab key', async () => {
    const user = userEvent.setup();
    render(AccordionTest);
    const header1 = screen.getByText('Header 1').closest('button');
    const header2 = screen.getByText('Header 2').closest('button');
    const header3 = screen.getByText('Header 3').closest('button');

    await user.tab();
    expect(header1).toHaveFocus();

    await user.tab();
    expect(header2).toHaveFocus();

    await user.tab();
    expect(header3).toHaveFocus();
  });

  it('calls onValueChange when an item is toggled', async () => {
    const onValueChange = vi.fn();
    render(AccordionTest, { props: { onValueChange } });
    const header1 = screen.getByText('Header 1').closest('button');

    await fireEvent.click(header1!);
    expect(onValueChange).toHaveBeenCalledWith(['item-1']);
  });

  it('works without onValueChange prop', async () => {
    render(AccordionTest, { props: { onValueChange: undefined } });
    const header1 = screen.getByText('Header 1').closest('button');

    await fireEvent.click(header1!);
    expect(header1).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects initial value prop', () => {
    render(AccordionTest, { props: { value: ['item-2'] } });
    const header2 = screen.getByText('Header 2').closest('button');
    expect(header2).toHaveAttribute('aria-expanded', 'true');
  });

  it('hits edge cases in keyboard navigation', async () => {
    render(AccordionTest);
    const accordion = document.querySelector('[aria-multiselectable]');
    
    // Target is not a header (hits line 59)
    await fireEvent.keyDown(accordion!, { key: 'ArrowDown' });
    
    // Target is a header but not in the container (hits line 64)
    const fakeButton = document.createElement('button');
    fakeButton.id = 'accordion-header-fake';
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    Object.defineProperty(event, 'target', { value: fakeButton });
    accordion!.dispatchEvent(event);
  });
});
