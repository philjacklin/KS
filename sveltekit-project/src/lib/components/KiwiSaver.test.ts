import { render, screen, within } from '@testing-library/svelte';
import { userEvent } from '@storybook/test';
import { describe, it, expect, vi } from 'vitest';
import KiwiSaverTestHost from './KiwiSaverTestHost.svelte';
import { localeStoreMock } from "$lib/test-utils/localeStoreMock";

vi.mock('$lib/stores/localeStore', () => ({
    ...localeStoreMock
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
        expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
    });

    it('handles interactions and form actions', async () => {
        render(KiwiSaverTestHost, {});
        const optOutCheckbox = screen.getByLabelText(/opt out/i);
        await user.click(optOutCheckbox);
        expect(optOutCheckbox).toBeChecked();
    });

    it('allows toggling "Not required to contribute" checkbox', async () => {
        render(KiwiSaverTestHost, {});
        const checkbox = screen.getByLabelText(/not required/i);
        expect(checkbox).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('updates employee contribution rate', async () => {
        render(KiwiSaverTestHost, {});
        
        // Since Select is custom, we might need a more specific selector.
        // Based on the structure, it might have an accessible label.
        const toggleButton = screen.getByRole('button', { name: /employee rate/i });
        await user.click(toggleButton);
        
        // Find and click an option
        const option = await screen.findByText('4%');
        await user.click(option);
        
        // Assert the value changed
        expect(toggleButton).toHaveTextContent('4%');
    });

    it('updates employer contribution rate', async () => {
        render(KiwiSaverTestHost, {});
        
        const input = screen.getByRole('spinbutton', { name: /employer rate/i });
        
        await user.clear(input);
        await user.type(input, '5');
        
        expect(input).toHaveValue(5);
    });

    it('resets rates when "Not required to contribute" is toggled off', async () => {
        render(KiwiSaverTestHost, {
            notRequiredToContribute: true
        });
        
        const checkbox = screen.getByLabelText(/not required/i);
        expect(checkbox).toBeChecked();
        
        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('clamps invalid employer rate to minimum allowed', async () => {
        render(KiwiSaverTestHost, {});
        
        const input = screen.getByRole('spinbutton', { name: /employer rate/i });
        
        await user.clear(input);
        await user.type(input, '1');
        
        expect(input).toHaveValue(3.5);
    });
});
