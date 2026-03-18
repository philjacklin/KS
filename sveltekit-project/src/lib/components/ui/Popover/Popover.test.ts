import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PopoverTestHost from './PopoverTestHost.svelte';

// Mock svelte/transition to bypass JSDOM animation hangs
vi.mock('svelte/transition', () => ({
    slide: () => ({ duration: 0 }),
    fade: () => ({ duration: 0 })
}));

// Mock animate for JSDOM compatibility
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
    Element.prototype.animate = vi.fn().mockImplementation(() => ({
        finished: Promise.resolve(),
        cancel: vi.fn(),
        onfinish: null,
    }));
}

describe('Popover', () => {
    const setup = (props = {}) => {
        const utils = render(PopoverTestHost, props);
        return {
            user: userEvent.setup(),
            // Targets the DIV wrapper with the Svelte logic specifically
            getWrapper: () => utils.container.querySelector('[aria-haspopup="dialog"]') as HTMLElement,
            ...utils
        };
    };

    it('should not be visible initially', () => {
        setup();
        expect(screen.queryByText('Popover Content')).toBeNull();
    });

    it('should appear on click', async () => {
        const { user, getWrapper } = setup();
        await user.click(getWrapper());
        expect(await screen.findByText('Popover Content')).toBeInTheDocument();
    });

    it('should disappear on second click', async () => {
        const { user, getWrapper } = setup();
        const wrapper = getWrapper();

        await user.click(wrapper);
        await screen.findByText('Popover Content');
        
        await user.click(wrapper);
        await waitFor(() => expect(screen.queryByText('Popover Content')).toBeNull());
    });

    it('should appear on Enter key press', async () => {
        const { user, getWrapper } = setup();
        const wrapper = getWrapper();

        wrapper.focus();
        await user.keyboard('{Enter}');

        expect(await screen.findByText('Popover Content')).toBeInTheDocument();
    });

    it('should apply custom className to the trigger', () => {
        const { getWrapper } = setup({ className: 'custom-trigger-class' });
        expect(getWrapper()).toHaveClass('custom-trigger-class');
    });

    it('should apply custom contentClass to the popover', async () => {
        const { user, getWrapper } = setup({ contentClass: 'custom-content-class' });
        await user.click(getWrapper());

        const popover = await screen.findByRole('dialog');
        expect(popover).toHaveClass('custom-content-class');
    });
});