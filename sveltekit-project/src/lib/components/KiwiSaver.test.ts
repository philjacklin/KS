import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from '@storybook/test';
import KiwiSaverTest from '$lib/components/KiwiSaverTest.svelte';

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
    it('renders correctly', async () => {
        render(KiwiSaverTest);
        expect(screen.getByText('kiwisaver.title')).toBeInTheDocument();
        expect(screen.getByText('kiwisaver.opt_out')).toBeInTheDocument();
    });

    it('handles interactions and form actions', async () => {
        const user = userEvent.setup();
        render(KiwiSaverTest);

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
});
