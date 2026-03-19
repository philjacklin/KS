import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import KiwiSaverTestHost from '$lib/components/KiwiSaverTestHost.svelte';

// Mock dependencies
vi.mock('$lib/stores/localeStore', () => ({
    t: { subscribe: (fn: any) => { fn((key: string) => key); return () => {}; } }
}));

vi.mock('$lib/components/kiwisaver/variants', () => ({
    kiwiSaverVariants: () => ({
        container: () => 'container',
        cardTitle: () => 'cardTitle',
        wrapper: () => 'wrapper',
        inputWrapper: () => 'inputWrapper',
        stack: () => 'stack',
        button: () => 'button'
    })
}));

// Mock utils
vi.mock('$lib/utils', () => ({
    cn: (...args: any[]) => args.join(' ')
}));

describe('KiwiSaver Component', () => {
    it('renders correctly with server provided defaults', async () => {
        render(KiwiSaverTestHost, {
            employeeRate: '3.5%',
            employerRate: '3.5%'
        });
        expect(screen.getByText('kiwisaver.title')).toBeInTheDocument();
    });

    it('handles interactions and form actions', async () => {
        render(KiwiSaverTestHost);
        const optOutCheckbox = screen.getByLabelText('kiwisaver.opt_out');
        await fireEvent.click(optOutCheckbox);
        expect(optOutCheckbox).toBeChecked();
    });

    it('allows toggling "Not required to contribute" checkbox', async () => {
        render(KiwiSaverTestHost);
        const checkbox = screen.getByLabelText('kiwisaver.not_required');
        expect(checkbox).not.toBeChecked();
        await fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        await fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });
});
