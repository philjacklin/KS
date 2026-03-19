import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@storybook/test';
import KiwiSaverTestHost from '/components/KiwiSaverTestHost.svelte';

// Mock dependencies
vi.mock('/stores/localeStore', () => ({
    t: { subscribe: (fn: any) => { fn((key: string) => key); return () => {}; } }
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
        expect(screen.getByText('kiwisaver.opt_out')).toBeInTheDocument();
        
        // Verify defaults
        const employerInput = screen.getByTestId('employer-contribution-rate');
        expect(employerInput).toHaveValue('3.5%');
    });

    it('handles interactions and form actions', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost);

        // Checkbox interaction
        const optOutCheckbox = screen.getByLabelText('kiwisaver.opt_out');
        await user.click(optOutCheckbox);
        expect(optOutCheckbox).toBeChecked();

        // Verify Form Buttons (Action/Value)
        const saveButton = screen.getByRole('button', { name: 'kiwisaver.save' });
        expect(saveButton).toHaveAttribute('name', 'action');
        expect(saveButton).toHaveAttribute('value', 'save');
        
        const saveAndNextButton = screen.getByRole('button', { name: 'kiwisaver.save_and_next' });
        expect(saveAndNextButton).toHaveAttribute('name', 'action');
        expect(saveAndNextButton).toHaveAttribute('value', 'saveAndNext');
    });

    it('allows changing employee and employer rates', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTestHost, {
            employeeRate: '3.5%',
            employerRate: '3.5%'
        });
        
        // Interact with employer input
        const employerInput = screen.getByTestId('employer-contribution-rate');
        await user.clear(employerInput);
        await user.type(employerInput, '4%');
        expect(employerInput).toHaveValue('4%');
    });
});
