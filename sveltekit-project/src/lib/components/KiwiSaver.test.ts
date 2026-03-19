import { render, screen, userEvent, expect, vi } from '@storybook/test';
import { describe, it } from 'vitest';
import KiwiSaverTestHost from '$lib/components/KiwiSaverTestHost.svelte';
import { localeStoreMock } from '$lib/test-utils/localeStoreMock';

vi.mock('$lib/stores/localeStore', () => {
    return {
        t: { 
            subscribe: (fn: any) => { 
                fn((key: string, params: any = {}) => {
                    if (key === 'kiwisaver.error_rate_range') {
                        return `Rate must be between ${params.min} and ${params.max}`;
                    }
                    return key.replace('kiwisaver.', '').replace('_', ' ');
                }); 
                return () => {}; 
            } 
        },
        locale: { subscribe: () => {} },
        translations: { subscribe: () => {}, loadTranslations: vi.fn() },
        setLocale: vi.fn()
    };
});

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
        const errorMessage = await screen.findByText((content, element) => content.includes('ESCT') && element?.className.includes('text-red-500'));
        expect(errorMessage).toBeInTheDocument();
    });
});
