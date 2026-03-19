import { render, screen } from '@testing-library/svelte';
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from 'vitest';
import KiwiSaverTestHost from './KiwiSaverTestHost.svelte';

vi.mock('/stores/localeStore', () => {
    return {
        t: { 
            subscribe: (fn: any) => { 
                fn((key: string, params: any = {}) => {
                    if (key === 'kiwisaver.error_rate_range') {
                        return `Rate must be between ${params.min} and ${params.max}`;
                    }
                    if (key === 'kiwisaver.esct_error') return 'ESCT rate is required';
                    return key; // Return the key directly
                }); 
                return () => {}; 
            } 
        },
        locale: { subscribe: () => {} },
        translations: { subscribe: () => {}, loadTranslations: vi.fn() },
        setLocale: vi.fn()
    };
});

vi.mock('/components/kiwisaver/variants', () => ({
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
vi.mock('/utils', () => ({
    cn: (...args: any[]) => args.join(' ')
}));

describe('KiwiSaver Component', () => {
    const user = userEvent.setup();

    it('allows toggling "contributions included" toggle', async () => {
        render(KiwiSaverTestHost, {});
        // Find by label (which returns the key)
        const toggle = screen.getByLabelText('kiwisaver.contributions_included');
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        await user.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('allows selecting ESCT rate', async () => {
        render(KiwiSaverTestHost, {});
        const select = screen.getByLabelText('kiwisaver.esct_rate');
        await user.click(select);
        const option = await screen.findByText('17.5%');
        await user.click(option);
        expect(select).toHaveTextContent('17.5%');
    });

    it('shows error message when no ESCT rate is selected and button clicked', async () => {
        render(KiwiSaverTestHost, {contributionsIncluded: false, esctRate: ''});
        const saveButton = screen.getByTestId('save-button');
        await user.click(saveButton);
        const errorMessage = await screen.findByText((content, element) => content.includes("ESCT") && element?.className.includes("text-red-500"));
        expect(errorMessage).toBeInTheDocument();
    });
});
