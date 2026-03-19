import { render, screen } from '@storybook/test';
import { userEvent } from '@storybook/test';
import { describe, it, expect, vi } from 'vitest';
import KiwiSaverTestHost from './KiwiSaverTestHost.svelte';
import { localeStoreMock } from '$lib/test-utils/localeStoreMock';

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
    });

    it('updates employee contribution rate', async () => {
        render(KiwiSaverTestHost, {});
        
        const toggleButton = screen.getByLabelText(/employee rate/i);
        await user.click(toggleButton);
        
        const option = await screen.findByText('4%');
        await user.click(option);
        
        expect(toggleButton).toHaveValue('4%');
    });

    it('updates employer contribution rate', async () => {
        render(KiwiSaverTestHost, {});
        
        const input = screen.getByRole('spinbutton', { name: /employer rate/i });
        
        await user.clear(input);
        await user.type(input, '5');
        
        expect(input).toHaveValue(5);
    });

    it('shows error message for invalid employer rate', async () => {
        render(KiwiSaverTestHost, {});
        
        const input = screen.getByRole('spinbutton', { name: /employer rate/i });
        
        await user.clear(input);
        await user.type(input, '1');
        
        const errorMessage = await screen.findByText(/Rate must be between 3.5 and 30/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('toggles otherSuper checkbox', async () => {
        render(KiwiSaverTestHost, {});
        const checkbox = screen.getByLabelText(/contribute super/i);
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('updates esctRate', async () => {
        render(KiwiSaverTestHost, {});
        const select = screen.getByLabelText(/esct rate/i);
        await user.click(select);
        const option = await screen.findByText(/esct 17 5/i);
        await user.click(option);
        expect(select).toHaveValue('17.5%');
    });

    it('toggles matchEmployerRate slider', async () => {
        render(KiwiSaverTestHost, {});
        const slider = screen.getByLabelText(/match employer rate/i); // Assuming Slider is a checkbox internally
        await user.click(slider);
        expect(slider).toBeChecked();
    });

    it('toggles contributionsIncluded slider', async () => {
        render(KiwiSaverTestHost, {});
        const slider = screen.getByLabelText(/contributions included/i);
        await user.click(slider);
        expect(slider).toBeChecked();
    });
});
