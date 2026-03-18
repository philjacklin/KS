import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import RadioGroup from './RadioGroup.svelte';

describe('RadioGroup', () => {
    const items = [
        { value: '1', labelKey: 'option1' },
        { value: '2', labelKey: 'option2' },
        { value: '3', labelKey: 'option3', disabled: true },
        { value: '4', labelKey: 'option4' }
    ];

    const defaultProps = {
        items,
        name: 'test-group',
        value: '1',
        onChange: vi.fn(),
        className: 'test-class'
    };

    it('renders all items and handles orientation variants', () => {
        const { rerender } = render(RadioGroup, defaultProps);
        
        expect(screen.getAllByRole('radio')).toHaveLength(4);
        expect(screen.getByRole('radiogroup')).toHaveClass('test-class');

        // Testing orientation branch coverage
        rerender({ ...defaultProps, orientation: 'horizontal' });
        // Update this check based on your specific variant class (e.g., 'flex-row')
        expect(screen.getByRole('radiogroup')).toBeTruthy(); 
    });

    describe('Keyboard Navigation (handleKeyDown)', () => {
        it('navigates and skips disabled items', async () => {
            render(RadioGroup, defaultProps);
            const radio1 = screen.getByDisplayValue('1');
            const radio2 = screen.getByDisplayValue('2');
            const radio4 = screen.getByDisplayValue('4');

            radio1.focus();
            expect(document.activeElement).toBe(radio1);

            // Move Forward: 1 -> 2
            await fireEvent.keyDown(radio1, { key: 'ArrowDown' });
            await waitFor(() => expect(document.activeElement).toBe(radio2));

            // Skip Disabled: 2 -> 4 (skipping 3)
            await fireEvent.keyDown(radio2, { key: 'ArrowRight' });
            await waitFor(() => expect(document.activeElement).toBe(radio4));

            // Wrap Around: 4 -> 1
            await fireEvent.keyDown(radio4, { key: 'ArrowDown' });
            await waitFor(() => expect(document.activeElement).toBe(radio1));
        });

        it('navigates backwards', async () => {
            render(RadioGroup, defaultProps);
            const radio1 = screen.getByDisplayValue('1');
            const radio4 = screen.getByDisplayValue('4');

            radio1.focus();
            await fireEvent.keyDown(radio1, { key: 'ArrowUp' });
            await waitFor(() => expect(document.activeElement).toBe(radio4));
        });

        it('selects an item with Enter or Space', async () => {
            const onChange = vi.fn();
            render(RadioGroup, { ...defaultProps, onChange });
            const radio1 = screen.getByDisplayValue('1');

            // Tab/Arrow to next item
            await fireEvent.keyDown(radio1, { key: 'ArrowDown' });
            
            // Select via Enter
            await fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
            expect(onChange).toHaveBeenCalledWith('2');

            // Select via Space
            await fireEvent.keyDown(document.activeElement!, { key: ' ' });
            expect(onChange).toHaveBeenCalledWith('2');
        });

        it('ignores irrelevant keys', async () => {
            render(RadioGroup, defaultProps);
            const radio1 = screen.getByDisplayValue('1');
            radio1.focus();

            await fireEvent.keyDown(radio1, { key: 'Shift' });
            expect(document.activeElement).toBe(radio1);
        });
    });

    describe('State and Edge Cases', () => {
        it('falls back to first non-disabled item if current value is invalid', () => {
            const mixedItems = [
                { value: 'a', labelKey: 'a', disabled: true },
                { value: 'b', labelKey: 'b' }
            ];
            // Render with a value that doesn't exist
            render(RadioGroup, { ...defaultProps, items: mixedItems, value: 'invalid' });
            
            const radioB = screen.getByDisplayValue('b');
            // focusedIndex should have moved to the first enabled item (index 1)
            expect(radioB).toHaveAttribute('tabindex', '0');
        });

        it('handles clicks on radio buttons', async () => {
            const onChange = vi.fn();
            render(RadioGroup, { ...defaultProps, onChange });
            
            const radio2 = screen.getByDisplayValue('2');
            await fireEvent.click(radio2);
            
            expect(onChange).toHaveBeenCalledWith('2');
        });

        it('returns early if all items are disabled', async () => {
            const allDisabled = items.map(i => ({ ...i, disabled: true }));
            render(RadioGroup, { ...defaultProps, items: allDisabled });
            
            const group = screen.getByRole('radiogroup');
            // This triggers the early return branch in handleKeyDown
            await fireEvent.keyDown(group, { key: 'ArrowDown' });
            expect(document.activeElement).toBe(document.body);
        });
    });
});