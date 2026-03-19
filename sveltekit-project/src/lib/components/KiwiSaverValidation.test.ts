import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@storybook/test';
import KiwiSaverTestHost from './KiwiSaverTestHost.svelte';

// Mock dependencies
vi.mock('$lib/stores/localeStore', () => ({
    t: { subscribe: (fn: any) => { fn((key: string) => key); return () => {}; } },
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

describe('KiwiSaver Employer Rate Validation (KS-003-05)', () => {
    it('is valid when employer rate is between 3.5% and 30%', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {});
        
        const employerInput = screen.getByLabelText('kiwisaver.employer_rate');
        await user.clear(employerInput);
        await user.type(employerInput, '10');
        await user.click(document.body);
        
        expect(employerInput).toHaveValue('10.00');
        expect(screen.queryByText((content) => content.includes('Rate must be between'))).not.toBeInTheDocument();
    });

    it('is invalid when employer rate < 3.5%', async () => {
        const user = userEvent.setup();
        const { debug } = render(KiwiSaverTestHost, {});
        
        const employerInput = screen.getByLabelText('kiwisaver.employer_rate');
        await user.clear(employerInput);
        await user.type(employerInput, '2');
        await user.click(document.body);
        
        debug();
        
        await waitFor(() => {
            expect(screen.getByText((content) => content.includes('Rate must be between'))).toBeInTheDocument();
        });
    });

    it('is invalid when employer rate > 30%', async () => {
        const user = userEvent.setup();
        const { debug } = render(KiwiSaverTestHost, {});
        
        const employerInput = screen.getByLabelText('kiwisaver.employer_rate');
        await user.clear(employerInput);
        await user.type(employerInput, '31');
        await user.click(document.body);
        
        debug();
        
        await waitFor(() => {
            expect(screen.getByText((content) => content.includes('Rate must be between'))).toBeInTheDocument();
        });
    });

    it('is valid when employer rate is 3% and employee rate is 3%', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {});
        
        // Set employee rate to 3%
        const employeeRateSelect = screen.getByTestId('employee-contribution-rate');
        const selectButton = employeeRateSelect.querySelector('button');
        await user.click(selectButton!);
        
        // Wait for dropdown
        const option = await screen.findByText('3.5%');
        await user.click(option);

        // Set employer rate to 3%
        const employerInput = screen.getByLabelText('kiwisaver.employer_rate');
        await user.clear(employerInput);
        await user.type(employerInput, '3');
        await user.click(document.body);
        
        expect(employerInput).toHaveValue('3.00');
        // No error should be present
        expect(screen.queryByText((content) => content.includes('Rate must be between'))).not.toBeInTheDocument();
    });
});
