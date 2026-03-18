import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Test from './Test.svelte';

describe('TextArea', () => {
        it('renders with default props', () => {
                const { getByRole } = render(Test);
                const textarea = getByRole('textbox');
                expect(textarea).toBeInTheDocument();
        });

it('auto-resizes when content changes', async () => {
    const { getByRole } = render(Test);
    const textarea = getByRole('textbox') as HTMLTextAreaElement;

    // 1. Mock initial scrollHeight for empty state
    Object.defineProperty(textarea, 'scrollHeight', { configurable: true, value: 80 });
    
    // Manually trigger the effect by firing an input event (or just wait for initial render)
    await fireEvent.input(textarea, { target: { value: '' } });
    const initialHeight = textarea.style.height;

    // 2. Mock a larger scrollHeight for the new text
    Object.defineProperty(textarea, 'scrollHeight', { configurable: true, value: 150 });

    await fireEvent.input(textarea, {
        target: { value: 'This is a long text that should make the textarea grow.' }
    });

    // Now the height will be '150px', which is not '80px'
    expect(textarea.style.height).not.toBe(initialHeight);
    expect(textarea.style.height).toBe('150px');
});
        it('respects the maxHeight prop', async () => {
                const { getByRole } = render(Test, { maxHeight: 100 });
                const textarea = getByRole('textbox') as HTMLTextAreaElement;

                // Mock scrollHeight to be greater than maxHeight
                Object.defineProperty(textarea, 'scrollHeight', { value: 150 });

                await fireEvent.input(textarea, {
                        target: {
                                value: 'This is a very long text that should make the textarea grow, but it should be limited by the maxHeight prop.'
                        }
                });

                expect(textarea.style.height).toBe('100px');
                expect(textarea.style.overflowY).toBe('auto');
        });

        it('applies custom className', () => {
                const { getByRole } = render(Test, { className: 'custom-class' });
                const textarea = getByRole('textbox');
                expect(textarea).toHaveClass('custom-class');
        });

        it('passes other attributes to the textarea element', () => {
                const { getByRole } = render(Test, { 'data-testid': 'custom-textarea' });
                const textarea = getByRole('textbox');
                expect(textarea).toHaveAttribute('data-testid', 'custom-textarea');
        });
});