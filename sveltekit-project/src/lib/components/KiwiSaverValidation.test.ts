import { render, screen, waitFor, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@storybook/test';
import KiwiSaverTestHost from '$lib/components/KiwiSaverTestHost.svelte';

// Mock dependencies
vi.mock('$lib/stores/localeStore', () => ({
    t: { subscribe: (fn: any) => { fn((key: string) => key); return () => {}; } }
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
        const { debug } = render(KiwiSaverTestHost, { props: {} }); debug();
        
        const employerInput = screen.getByTestId('employer-contribution-rate');
        await user.clear(employerInput);
        await user.type(employerInput, '10%');
        
        expect(employerInput).toHaveValue('10%');
        expect(screen.queryByText(/Rate must be between/i)).not.toBeInTheDocument();
    });

    it('is invalid when employer rate < 3.5%', async () => {
        const user = userEvent.setup();
        const { debug } = render(KiwiSaverTestHost, { props: {} }); debug();
        
        const employerInput = screen.getByTestId('employer-contribution-rate');
        await user.clear(employerInput);
        await user.type(employerInput, '2%');
        
        await waitFor(() => {
            expect(screen.getByText(/Rate must be between 3.5% and 30%/i)).toBeInTheDocument();
        });
    });

    it('is invalid when employer rate > 30%', async () => {
        const user = userEvent.setup();
        const { debug } = render(KiwiSaverTestHost, { props: {} }); debug();
        
        const employerInput = screen.getByTestId('employer-contribution-rate');
        await user.clear(employerInput);
        await user.type(employerInput, '31%');
        
        await waitFor(() => {
            expect(screen.getByText(/Rate must be between 3.5% and 30%/i)).toBeInTheDocument();
        });
    });

    it('is valid when employer rate is 3% and employee rate is 3%', async () => {
        const user = userEvent.setup();
        const { debug } = render(KiwiSaverTestHost, { props: {} }); debug();
        
        // Set employee rate to 3%
        const employeeRateSelect = screen.getByTestId('employee-contribution-rate');
        const selectButton = employeeRateSelect.querySelector('button');
        await user.click(selectButton!);
        
        // Wait for dropdown
        const option = await screen.findByText('3%');
        await user.click(option);

        // Set employer rate to 3%
        const employerInput = screen.getByTestId('employer-contribution-rate');
        await user.clear(employerInput);
        await user.type(employerInput, '3%');
        
        expect(employerInput).toHaveValue('3%');
        // No error should be present
        expect(screen.queryByText(/Rate must be between/i)).not.toBeInTheDocument();
    });
});
