import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DropdownMenuTest from './DropdownMenuTest.svelte';
import { tick } from 'svelte';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock the locale store
vi.mock('$lib/stores/localeStore', () => ({
  t: {
    subscribe: (fn: (v: (s: string) => string) => void) => {
      fn((s: string) => s);
      return () => {};
    }
  }
}));

// Mock svelte transitions
vi.mock('svelte/transition', () => ({
  slide: () => ({
    duration: 0,
    tick: (t: number) => t
  }),
  fade: () => ({
    duration: 0,
    tick: (t: number) => t
  })
}));

describe('DropdownMenu Component', () => {
  const items = [
    { label: 'Item 1', onClick: vi.fn() },
    { label: 'Item 2', onClick: vi.fn(), disabled: true },
    { label: 'Item 3', onClick: vi.fn(), variant: 'danger' as const },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders and toggles visibility on click', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    await fireEvent.click(trigger);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('closes on outside click', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await fireEvent.mouseDown(document.body);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('does not close when clicking inside the menu', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    const menu = screen.getByRole('menu');
    await fireEvent.mouseDown(menu);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes on Escape key (global)', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    await fireEvent.keyDown(document.body, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it('executes callback and closes menu on item click', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    const item1 = screen.getByText('Item 1');
    await fireEvent.click(item1);

    expect(items[0].onClick).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('does not execute callback on disabled item click', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    const item2 = screen.getByText('Item 2');
    await fireEvent.click(item2);

    expect(items[1].onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('manages focus and keyboard navigation (ArrowDown/ArrowUp)', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    // Open via Enter
    await fireEvent.keyDown(trigger, { key: 'Enter' });
    await delay(10);
    await tick();
    
    // Focus should be on the first enabled item
    const item1 = screen.getByText('Item 1').closest('button');
    expect(item1).toHaveFocus();

    // Navigate to next enabled item (Item 2 is disabled, so should skip to Item 3)
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    const item3 = screen.getByText('Item 3').closest('button');
    expect(item3).toHaveFocus();

    // Wrap around to Item 1
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(item1).toHaveFocus();

    // Navigate up
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowUp' });
    expect(item3).toHaveFocus();
  });

  it('supports Home and End keys', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    const item1 = screen.getByText('Item 1').closest('button');
    const item3 = screen.getByText('Item 3').closest('button');

    item1?.focus();
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'End' });
    expect(item3).toHaveFocus();

    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Home' });
    expect(item1).toHaveFocus();
  });

  it('closes on Tab key when focus is in menu', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    const item1 = screen.getByText('Item 1').closest('button');
    item1?.focus();

    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Tab' });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('supports ArrowDown/ArrowUp on trigger to open menu', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    // ArrowDown on trigger
    await fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    await delay(10);
    await tick();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Item 1').closest('button')).toHaveFocus();

    // Close
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    
    // ArrowUp on trigger
    await fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    await delay(10);
    await tick();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Item 3').closest('button')).toHaveFocus();
    
    // ArrowDown when already open
    await fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByText('Item 1').closest('button')).toHaveFocus();
    
    // ArrowUp when already open
    await fireEvent.keyDown(trigger, { key: 'ArrowUp' });
    expect(screen.getByText('Item 3').closest('button')).toHaveFocus();
  });

  it('supports Space/Enter on trigger to toggle', async () => {
    render(DropdownMenuTest, { props: { items } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.keyDown(trigger, { key: ' ' });
    await delay(10);
    await tick();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    await fireEvent.keyDown(trigger, { key: ' ' });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    
    await fireEvent.keyDown(trigger, { key: 'Enter' });
    await delay(10);
    await tick();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    await fireEvent.keyDown(trigger, { key: 'Enter' });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });

  it('handles empty items', async () => {
    render(DropdownMenuTest, { props: { items: [] } });
    const trigger = screen.getByRole('button', { name: /open menu/i });

    await fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    // Should not crash
  });
});
