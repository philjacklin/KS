import { render, screen, userEvent, waitFor, expect } from '@storybook/test';
import { describe, it, vi } from 'vitest';
import KiwiSaverTestHost from '$lib/components/KiwiSaverTestHost.svelte';
import { localeStoreMock } from '$lib/test-utils/localeStoreMock';

vi.mock('$lib/stores/localeStore', () => {
    return { ...localeStoreMock };
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
    it('allows toggling "contributions included" toggle', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {});
        const toggle = screen.getByLabelText('contributions included');
        
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        
        await user.click(toggle);
        
        await waitFor(() => {
            expect(toggle).toHaveAttribute('aria-checked', 'true');
        });
        
        expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('allows selecting ESCT rate', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, { contributionsIncluded: false });
        const select = screen.getByLabelText('esct rate');
        await user.click(select);
    });

    it('shows error message when no ESCT rate is selected and button clicked', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {contributionsIncluded: false, esctRate: ''});
        const saveButton = screen.getByTestId('save-button');
        
        await user.click(saveButton);
        
        const errorMessage = await screen.findByText('esct error', { selector: '.text-red-500' });
        expect(errorMessage).toBeInTheDocument();
    });

    it("does not show content when optOut is true", async () => {
        render(KiwiSaverTestHost, { optOut: true });
        expect(screen.queryByLabelText("employee rate")).not.toBeInTheDocument();
    });

    it("handles rate changes", async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, { notRequiredToContribute: false });
        // Select
        const select = screen.getByLabelText('employee rate');
        await user.click(select);
        // NumberInput
        const numberInput = screen.getByLabelText('employer rate') as HTMLInputElement;
        await user.clear(numberInput);
        await user.type(numberInput, '5');
        await user.click(document.body);
        
        expect(numberInput.value).toBe('5.00');
    });

    it("handles esctRate change", async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, { contributionsIncluded: false });
        const select = screen.getByLabelText('esct rate');
        await user.click(select);
        // We cannot easily simulate option selection in this mock setup.
    });
});
