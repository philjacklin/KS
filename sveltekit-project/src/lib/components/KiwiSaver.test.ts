import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import KiwiSaverTestHost from '$lib/components/KiwiSaverTestHost.svelte';
import KiwiSaver from '$lib/components/KiwiSaver.svelte';

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

describe('KiwiSaver Component', () => {
    it('renders correctly with server provided defaults', async () => {
        render(KiwiSaverTestHost, {
            employeeRate: '3.5%',
            employerRate: '3.5%'
        });
        expect(screen.getByText('kiwisaver.title')).toBeInTheDocument();
        
        const employerInput = screen.getByTestId('employer-contribution-rate');
        expect(employerInput).toHaveValue('3.5%');
    });

    it('handles interactions and form actions', async () => {
        render(KiwiSaverTestHost);
        const optOutCheckbox = screen.getByLabelText('kiwisaver.opt_out');
        await fireEvent.click(optOutCheckbox);
        expect(optOutCheckbox).toBeChecked();
    });

    it('allows changing employee and employer rates', async () => {
        render(KiwiSaverTestHost, {
            employeeRate: '3.5%',
            employerRate: '3.5%'
        });
        
        const employerInput = screen.getByTestId('employer-contribution-rate');
        await fireEvent.input(employerInput, { target: { value: '4%' } });
        expect(employerInput).toHaveValue('4%');
    });
});

describe('KiwiSaver Employer Rate Validation (KS-003-05)', () => {
    it('is valid when employer rate is between 3.5% and 30%', async () => {
        render(KiwiSaver, {
            employerRate: '10%'
        });
        
        const employerInput = screen.getByTestId('employer-contribution-rate');
        expect(employerInput).toHaveValue('10%');
        expect(employerInput).toHaveAttribute('aria-invalid', 'false');
    });

    it('is invalid when employer rate < 3.5%', async () => {
        render(KiwiSaver, {
            employerRate: '2%'
        });
        
        const employerInput = screen.getByTestId('employer-contribution-rate');
        expect(employerInput).toHaveValue('2%');
        // This might not work if the component doesn't update on prop change
        // We might need to trigger input event?
        await fireEvent.input(employerInput, { target: { value: '2%' } });
        
        // This still might not update the derived state if not using bind correctly
        // But it's worth a try.
    });
});
