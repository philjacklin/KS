import { render } from '@testing-library/svelte';
import { screen, waitFor, userEvent, expect, vi } from '@storybook/test';
import { describe, it } from 'vitest';
import KiwiSaverTestHost from './KiwiSaverTestHost.svelte';

vi.mock('$lib/stores/localeStore', () => ({
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
    it('allows toggling "contributions included" toggle', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {});
        // Find label by key
        const label = screen.getByText('contributions included');
        const toggle = screen.getByLabelText(label.textContent!);
        
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        
        await user.click(toggle);
        
        await waitFor(() => {
            expect(toggle).toHaveAttribute('aria-checked', 'true');
        });
        
        expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('allows selecting ESCT rate', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, { contributionsIncluded: false, esctRateOptions: [{label: '17.5%', value: '17.5%'}] });
        
        const label = screen.getByText('esct rate');
        const select = screen.getByLabelText(label.textContent!);
        await user.click(select);
        
        const option = screen.getByRole('option', { name: '17.5%' });
        await user.click(option);
        
        const selectedLabel = screen.getByText('17.5%');
        expect(selectedLabel).toBeInTheDocument();
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
        expect(screen.queryByText("employee rate")).not.toBeInTheDocument();
    });

    it("handles rate changes", async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, { notRequiredToContribute: false });
        
        const label = screen.getByText('employee rate');
        const select = screen.getByLabelText(label.textContent!);
        await user.click(select);
        const option = screen.getByRole('option', { name: '4%' });
        await user.click(option);
        
        const employerLabel = screen.getByText('employer rate');
        const numberInput = screen.getByLabelText(employerLabel.textContent!) as HTMLInputElement;
        
        await user.clear(numberInput);
        await user.type(numberInput, '5');
        await user.click(document.body);
        
        expect(numberInput.value).toBe('5.00');
    });

    it("handles esctRate change", async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, { contributionsIncluded: false, esctRateOptions: [{label: '30%', value: '30%'}] });
        
        const label = screen.getByText('esct rate');
        const select = screen.getByLabelText(label.textContent!);
        await user.click(select);
        
        const option = screen.getByRole('option', { name: '30%' });
        await user.click(option);
        
        const selectedLabel = screen.getByText('30%');
        expect(selectedLabel).toBeInTheDocument();
    });

    it("handles default esctRateOptions prop", async () => {
        render(KiwiSaverTestHost, { contributionsIncluded: false });
        // No options should be available
        const label = screen.getByText('esct rate');
        const select = screen.getByLabelText(label.textContent!);
        await userEvent.click(select);
        
        expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
});
