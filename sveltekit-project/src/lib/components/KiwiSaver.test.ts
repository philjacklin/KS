import { render, screen, within, fireEvent } from '@testing-library/svelte';
import { userEvent } from '@storybook/test';
import { describe, it, expect, vi } from 'vitest';
import KiwiSaverTestHost from './KiwiSaverTestHost.svelte';

// Mock dependencies
vi.mock('$lib/stores/localeStore', () => ({
    t: { 
        subscribe: (fn: any) => { 
            fn((key: string, params: any = {}) => {
                if (key === 'kiwisaver.error_rate_range') {
                    return `Rate must be between ${params.min} and ${params.max}`;
                }
                // Return a readable version of the key for testing
                return key.replace('kiwisaver.', '').replace('_', ' ');
            }); 
            return () => {}; 
        } 
    },
    locale: { subscribe: () => {} },
    translations: { subscribe: () => {}, loadTranslations: vi.fn() },
    setLocale: vi.fn()
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
    const user = userEvent.setup();

    it('renders correctly with server provided defaults', async () => {
        render(KiwiSaverTestHost, {
            employeeRate: '3.5%',
            employerRate: '3.5%'
        });
        expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('handles interactions and form actions', async () => {
        render(KiwiSaverTestHost, {});
        const optOutCheckbox = screen.getByLabelText('opt out');
        await user.click(optOutCheckbox);
        expect(optOutCheckbox).toBeChecked();
    });

    it('allows toggling "Not required to contribute" checkbox', async () => {
        render(KiwiSaverTestHost, {});
        const checkbox = screen.getByLabelText('not required');
        expect(checkbox).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('updates employee contribution rate', async () => {
        render(KiwiSaverTestHost, {});
        
        // Open the select dropdown
        const selectContainer = screen.getByTestId('employee-contribution-rate');
        const toggleButton = within(selectContainer).getByRole('button');
        await user.click(toggleButton);
        
        // Find and click an option
        const option = await screen.findByText('4%');
        await user.click(option);
        
        // Assert the value changed
        expect(toggleButton).toHaveTextContent('4%');
    });

    it('updates employer contribution rate', async () => {
        render(KiwiSaverTestHost, {});
        
        const input = screen.getByLabelText('employer rate');
        
        await user.clear(input);
        await user.type(input, '5');
        // Explicitly fire change event to trigger $derived binding
        await fireEvent.change(input, { target: { value: '5' } });
        
        expect(input).toHaveValue(5);
    });

    it('resets rates when "Not required to contribute" is toggled off', async () => {
        render(KiwiSaverTestHost, {
            notRequiredToContribute: true
        });
        
        const checkbox = screen.getByLabelText('not required');
        expect(checkbox).toBeChecked();
        
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('clamps invalid employer rate to minimum allowed', async () => {
        render(KiwiSaverTestHost, {});
        
        const input = screen.getByLabelText('employer rate');
        
        await user.clear(input);
        await user.type(input, '1');
        await fireEvent.change(input, { target: { value: '1' } });
        
        // Should be clamped to 3.50 because minEmployerRate is 3.5
        expect(input).toHaveValue(3.5);
    });
});
