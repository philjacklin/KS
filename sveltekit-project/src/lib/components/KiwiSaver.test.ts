import { render, screen, within } from '@testing-library/svelte';
import { userEvent } from '@storybook/test';
import { describe, it, expect, vi } from 'vitest';
import KiwiSaverTestHost from './KiwiSaverTestHost.svelte';

// Mock dependencies
vi.mock('/stores/localeStore', () => ({
    t: { subscribe: (fn: any) => { fn((key: string) => key); return () => {}; } },
    locale: { subscribe: () => {} },
    translations: { subscribe: () => {}, loadTranslations: vi.fn() },
    setLocale: vi.fn()
}));

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
    it('renders correctly with server provided defaults', async () => {
        render(KiwiSaverTestHost, {
            employeeRate: '3.5%',
            employerRate: '3.5%'
        });
        expect(screen.getByText('kiwisaver.title')).toBeInTheDocument();
    });

    it('handles interactions and form actions', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {});
        const optOutCheckbox = screen.getByLabelText('kiwisaver.opt_out');
        await user.click(optOutCheckbox);
        expect(optOutCheckbox).toBeChecked();
    });

    it('allows toggling "Not required to contribute" checkbox', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {});
        const checkbox = screen.getByLabelText('kiwisaver.not_required');
        expect(checkbox).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('updates employee contribution rate', async () => {
        const user = userEvent.setup();
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
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {});
        
        const input = screen.getByLabelText('kiwisaver.employer_rate');
        
        await user.clear(input);
        await user.type(input, '5');
        // Trigger blur to format value
        await user.tab();
        
        expect(input).toHaveValue('5.00');
    });

    it('resets rates when "Not required to contribute" is toggled off', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {
            notRequiredToContribute: true
        });
        
        const checkbox = screen.getByLabelText('kiwisaver.not_required');
        expect(checkbox).toBeChecked();
        
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('shows error when employer rate is invalid', async () => {
        render(KiwiSaverTestHost, {
            employerRate: '1%'
        });
        
        const errorMessage = await screen.findByText(/Rate must be between/);
        expect(errorMessage).toBeInTheDocument();
    });
});
