import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import DrawerTest from './Drawer.test.svelte';

describe('Drawer', () => {
    // ... (Your existing tests: isOpen false/true, content rendering)

    it('should call onClose when the overlay is clicked', async () => {
        const onClose = vi.fn();
        render(DrawerTest, { isOpen: true, onClose });
        const overlay = screen.getByRole('presentation');
        await fireEvent.click(overlay);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when the content is clicked (propagation test)', async () => {
        const onClose = vi.fn();
        render(DrawerTest, { isOpen: true, onClose });
        const content = screen.getByRole('dialog');
        await fireEvent.click(content);
        expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when the Escape key is pressed', async () => {
        const onClose = vi.fn();
        render(DrawerTest, { isOpen: true, onClose });
        const overlay = screen.getByRole('presentation');
        await fireEvent.keyDown(overlay, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    /** * NEW: Branch Coverage for onkeydown 
     * This covers the 'else' branch of (e.key === 'Escape')
     */
    it('should NOT call onClose when a key other than Escape is pressed', async () => {
        const onClose = vi.fn();
        render(DrawerTest, { isOpen: true, onClose });
        const overlay = screen.getByRole('presentation');
        await fireEvent.keyDown(overlay, { key: 'Enter' });
        expect(onClose).not.toHaveBeenCalled();
    });

    /** * NEW: Branch Coverage for custom classes
     * This covers the 'class: className' logic in drawerVariants
     */
    it('should apply custom classes passed via props', () => {
        const customClass = 'test-custom-class';
        render(DrawerTest, { isOpen: true, class: customClass });
        const overlay = screen.getByRole('presentation');
        expect(overlay.className).toContain(customClass);
    });

    it('should have correct accessibility attributes', () => {
        render(DrawerTest, { isOpen: true });
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    describe('positioning and transitions', () => {
        const positions = ['left', 'right', 'top', 'bottom'] as const;

        positions.forEach((pos) => {
            it(`should apply correct classes and handle transition logic for ${pos}`, () => {
                const { unmount } = render(DrawerTest, { isOpen: true, position: pos });
                const overlay = screen.getByRole('presentation');
                const content = screen.getByRole('dialog');

                // Verify Variants (variants.ts coverage)
                if (pos === 'left') expect(overlay.className).toContain('justify-start');
                if (pos === 'right') expect(overlay.className).toContain('justify-end');
                if (pos === 'top') expect(overlay.className).toContain('items-start');
                if (pos === 'bottom') expect(overlay.className).toContain('items-end');

                // Trigger unmount to exercise the 'out:fly' transition branch
                unmount();
            });
        });
    });
});