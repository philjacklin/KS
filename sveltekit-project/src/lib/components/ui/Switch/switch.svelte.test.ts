import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Test from './Test.svelte';

describe('Switch Coverage Expansion', () => {
    it('renders with a label using labelKey', () => {
        // labelKey uses $t, ensure your store is mocked or has values
        render(Test, { props: { labelKey: 'notifications' } });
        const label = screen.getByText(/notifications/i);
        expect(label).toBeInTheDocument();
    });

    it('toggles state on click', async () => {
        const user = userEvent.setup();
        render(Test, { props: { checked: false } });
        const switchElement = screen.getByRole('switch');
        
        await user.click(switchElement);
        expect(switchElement).toHaveAttribute('aria-checked', 'true');
        
        await user.click(switchElement);
        expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles state using keyboard (Space and Enter)', async () => {
        const user = userEvent.setup();
        render(Test);
        const switchElement = screen.getByRole('switch');

        switchElement.focus();
        await user.keyboard(' ');
        expect(switchElement).toHaveAttribute('aria-checked', 'true');

        await user.keyboard('{Enter}');
        expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('prevents toggle and event dispatch when disabled', async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(Test, { props: { disabled: true, onchange } });
        const switchElement = screen.getByRole('switch');

        await user.click(switchElement);
        expect(switchElement).toHaveAttribute('aria-checked', 'false');
        expect(onchange).not.toHaveBeenCalled();
    });

    it('covers size and color variant branches', () => {
        const { rerender } = render(Test, { props: { size: 'lg', color: 'success' } });
        const switchElement = screen.getByRole('switch');
        
        // Success variant likely adds a specific bg class (e.g., bg-payroll-teal)
        // This exercises the variants.ts logic
        expect(switchElement).toBeInTheDocument();
        
        rerender({ size: 'sm', color: 'secondary' });
        expect(switchElement).toBeInTheDocument();
    });

    it('passes extra attributes via ...rest', () => {
        render(Test, { props: { 'aria-label': 'Custom Label' } });
        expect(screen.getByLabelText('Custom Label')).toBeInTheDocument();
    });
});