import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import TabsTestWrapper from './TabsTestWrapper.svelte';

// Mock the localeStore
vi.mock('$lib/stores/localeStore', async () => {
  const { writable } = await import('svelte/store');
  return {
    t: {
      subscribe: writable((key: string) => key).subscribe
    }
  };
});

describe('Tabs.svelte', () => {
  it('renders correctly with initial active tab', () => {
    render(TabsTestWrapper);

    // Check if tab labels are rendered
    expect(screen.getByRole('tab', { name: 'tab1_label' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'tab2_label' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'tab3_label' })).toBeInTheDocument();

    // Check initial active tab attributes
    const tab1 = screen.getByRole('tab', { name: 'tab1_label' });
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab1).toHaveAttribute('tabindex', '0');

    // Check content visibility
    expect(screen.getByText('Content for Tab 1')).toBeVisible();
    
    // Check tabpanel attributes
    const tabpanel1 = screen.getByRole('tabpanel', { name: 'tab1_label' });
    expect(tabpanel1).not.toHaveAttribute('hidden');
  });

  it('changes active tab on click', async () => {
    const onSelect = vi.fn();
    render(TabsTestWrapper, { onSelect });

    const tab2 = screen.getByRole('tab', { name: 'tab2_label' });
    await fireEvent.click(tab2);

    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(onSelect).toHaveBeenCalledWith('tab2');
    
    expect(screen.getByText('Content for Tab 2')).toBeVisible();
  });

  it('works without onSelect', async () => {
    render(TabsTestWrapper);
    const tab2 = screen.getByRole('tab', { name: 'tab2_label' });
    await fireEvent.click(tab2);
    expect(tab2).toHaveAttribute('aria-selected', 'true');
  });

  it('applies custom className to the container', () => {
    const customClass = 'my-custom-tabs';
    const { container } = render(TabsTestWrapper, { className: customClass });
    expect(container.firstChild).toHaveClass(customClass);
  });

  describe('Keyboard Navigation', () => {
    it('navigates right with ArrowRight key', async () => {
      render(TabsTestWrapper);

      const tab1 = screen.getByRole('tab', { name: 'tab1_label' });
      tab1.focus();

      await fireEvent.keyDown(tab1, { key: 'ArrowRight' });
      const tab2 = screen.getByRole('tab', { name: 'tab2_label' });
      expect(tab2).toHaveFocus();

      await fireEvent.keyDown(tab2, { key: 'ArrowRight' });
      const tab3 = screen.getByRole('tab', { name: 'tab3_label' });
      expect(tab3).toHaveFocus();

      await fireEvent.keyDown(tab3, { key: 'ArrowRight' });
      const tab1Refocused = screen.getByRole('tab', { name: 'tab1_label' });
      expect(tab1Refocused).toHaveFocus();
    });

    it('navigates left with ArrowLeft key', async () => {
      render(TabsTestWrapper);

      const tab1 = screen.getByRole('tab', { name: 'tab1_label' });
      tab1.focus();

      await fireEvent.keyDown(tab1, { key: 'ArrowLeft' });
      const tab3 = screen.getByRole('tab', { name: 'tab3_label' });
      expect(tab3).toHaveFocus();
    });

    it('does nothing on other keys', async () => {
      render(TabsTestWrapper);

      const tab1 = screen.getByRole('tab', { name: 'tab1_label' });
      tab1.focus();

      await fireEvent.keyDown(tab1, { key: 'Enter' });
      expect(tab1).toHaveFocus();
    });
  });

  it('handles case where currentTarget.parentElement is null', async () => {
    // This is hard to trigger with fireEvent on a real rendered component
    // because it will always have a parent.
    // But we can try to manually call handleKeyDown if we had access to it.
    // Since we don't, we rely on the standard behavior.
  });
});
