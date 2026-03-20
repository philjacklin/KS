import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import KiwiSaver from './KiwiSaver.svelte';

vi.mock('/stores/localeStore', () => {
    return {
        t: { 
            subscribe: (fn: any) => { 
                fn((key: string, params: any = {}) => {
                    return key;
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
    it('allows toggling "contributions included" toggle', async () => {
        const user = userEvent.setup();
        render(KiwiSaver, {});
        // Find label by key
        const label = screen.getByText('kiwisaver.contributions_included');
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
        render(KiwiSaver, { contributionsIncluded: false, esctRateOptions: [{label: '17.5%', value: '17.5%'}] });
        
        const label = screen.getByText('kiwisaver.esct_rate');
        const select = screen.getByLabelText(label.textContent!);
        await user.click(select);
        
        const option = screen.getByRole('option', { name: '17.5%' });
        await user.click(option);
        
        const selectedLabel = screen.getByText('17.5%');
        expect(selectedLabel).toBeInTheDocument();
    });

    it('shows error message when no ESCT rate is selected and button clicked', async () => {
        const user = userEvent.setup();
        render(KiwiSaver, {contributionsIncluded: false, esctRate: ''});
        const saveButton = screen.getByTestId('save-button');
        
        await user.click(saveButton);
        
        const errorMessage = await screen.findByText('kiwisaver.esct_error', { selector: '.text-red-500' });
        expect(errorMessage).toBeInTheDocument();
    });

    it("does not show content when optOut is true", async () => {
        render(KiwiSaver, { optOut: true });
        expect(screen.queryByText("kiwisaver.employee_rate")).not.toBeInTheDocument();
    });

    it("handles rate changes", async () => {
        const user = userEvent.setup();
        render(KiwiSaver, { notRequiredToContribute: false });
        
        const label = screen.getByText('kiwisaver.employee_rate');
        const select = screen.getByLabelText(label.textContent!);
        await user.click(select);
        const option = screen.getByRole('option', { name: '4%' });
        await user.click(option);
        
        const employerLabel = screen.getByText('kiwisaver.employer_rate');
        const numberInput = screen.getByLabelText(employerLabel.textContent!) as HTMLInputElement;
        
        await user.clear(numberInput);
        await user.type(numberInput, '5');
        await user.click(document.body);
        
        expect(numberInput.value).toBe('5.00');
    });

    it("handles esctRate change", async () => {
        const user = userEvent.setup();
        render(KiwiSaver, { contributionsIncluded: false, esctRateOptions: [{label: '30%', value: '30%'}] });
        
        const label = screen.getByText('kiwisaver.esct_rate');
        const select = screen.getByLabelText(label.textContent!);
        await user.click(select);
        
        const option = screen.getByRole('option', { name: '30%' });
        await user.click(option);
        
        const selectedLabel = screen.getByText('30%');
        expect(selectedLabel).toBeInTheDocument();
    });

    it("handles default esctRateOptions prop", async () => {
        render(KiwiSaver, { contributionsIncluded: false });
        // No options should be available
        const label = screen.getByText('kiwisaver.esct_rate');
        const select = screen.getByLabelText(label.textContent!);
        await userEvent.click(select);
        
        expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
});
