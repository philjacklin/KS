import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import NumberInput from './NumberInput.svelte';
import Test from './Test.svelte';

describe('NumberInput', () => {
  const baseProps = { id: 'test-input', label: 'Number' };

  it('renders with default props', () => {
    render(NumberInput, { ...baseProps });
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('renders with a placeholder', () => {
    render(NumberInput, { ...baseProps, placeholder: 'Enter a number' });
    expect(screen.getByPlaceholderText('Enter a number')).toBeInTheDocument();
  });

  it('renders with a formatted value', () => {
    render(NumberInput, { ...baseProps, value: 123, type: 'currency' });
    const input = screen.getByRole('textbox') as HTMLInputElement;
    // Intl formatting adds commas and decimals
    expect(input.value).toBe('123.00');
  });

  it('disables the input when disabled prop is true', () => {
    render(NumberInput, { ...baseProps, disabled: true });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('handles keyboard increments with ArrowUp/ArrowDown', async () => {
    const onChange = vi.fn();
    render(NumberInput, { ...baseProps, value: 10, onChange, step: 5 });
    const input = screen.getByRole('textbox');

    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(15);

    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('respects min and max values', async () => {
    const onChange = vi.fn();
    render(NumberInput, { ...baseProps, value: 10, min: 9, max: 11, onChange });
    const input = screen.getByRole('textbox');

    await fireEvent.keyDown(input, { key: 'ArrowUp' }); // 11
    await fireEvent.keyDown(input, { key: 'ArrowUp' }); // Still 11
    expect(onChange).toHaveBeenLastCalledWith(11);

    await fireEvent.keyDown(input, { key: 'ArrowDown' }); // 10
    await fireEvent.keyDown(input, { key: 'ArrowDown' }); // 9
    await fireEvent.keyDown(input, { key: 'ArrowDown' }); // Still 9
    expect(onChange).toHaveBeenLastCalledWith(9);
  });

  it('renders with icons via the Test wrapper', () => {
    const iconPath = "M10 20v-6";
    render(Test, { 
        label: 'Icon Test', 
        leadingIconPath: iconPath, 
        trailingIconPath: iconPath 
    });
    
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  it('renders help text when provided', () => {
    render(NumberInput, { ...baseProps, helpText: 'Helpful info' });
    expect(screen.getByText('Helpful info')).toBeInTheDocument();
  });
});

describe('NumberInput Coverage Expansion', () => {
    const baseProps = { id: 'cov-input', label: 'Coverage', onChange: vi.fn() };

    it('filters out non-numeric characters in handleInput', async () => {
        render(NumberInput, { ...baseProps });
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // Try to type letters
        await fireEvent.input(input, { target: { value: 'abc12.34xyz' } });
        // The component logic should strip abc and xyz
        expect(input.value).toBe('12.34');
    });

it('handles multiple decimal points correctly while typing', async () => {
    render(NumberInput, { ...baseProps });
    const input = screen.getByRole('textbox') as HTMLInputElement;

    await fireEvent.focus(input);
    
    // Simulate typing the extra dot
    await fireEvent.input(input, { target: { value: '12.34.56' } });
    
    // In Svelte 5 + Vitest, sometimes we need to wait for the state to flush to the DOM attribute
    expect(input.value).toBe('12.3456'); 
    
    await fireEvent.blur(input);
    // Finally check formatted result (New Zealand locale uses 2 decimals)
    expect(input.value).toBe('12.35'); 
});
    describe('Negative Value Logic', () => {
        it('strips negative signs when allowNegative is false', async () => {
            render(NumberInput, { ...baseProps, allowNegative: false });
            const input = screen.getByRole('textbox') as HTMLInputElement;

            await fireEvent.focus(input);
            await fireEvent.input(input, { target: { value: '-50' } });
            await fireEvent.blur(input);

            // Expect the design system's forced 2-decimal format
            expect(input.value).toBe('50.00'); 
        });

        it('allows a single leading negative sign when allowNegative is true', async () => {
            render(NumberInput, { ...baseProps, allowNegative: true });
            const input = screen.getByRole('textbox') as HTMLInputElement;

            await fireEvent.focus(input);
            await fireEvent.input(input, { target: { value: '-50' } });
            await fireEvent.blur(input);

            expect(input.value).toBe('-50.00');
        });
    });
    it('handles currency vs tax-rate formatting branches', () => {
        const { rerender } = render(NumberInput, { ...baseProps, value: 5, type: 'currency' });
        expect(screen.getByText('$')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveValue('5.00');

        rerender({ ...baseProps, value: 15, type: 'tax-rate' });
        expect(screen.getByText('%')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveValue('15.00');
    });

    it('triggers focus and blur formatting cycles', async () => {
        render(NumberInput, { ...baseProps, value: 1000, type: 'currency' });
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // Initial formatted value
        expect(input.value).toBe('1,000.00');

        // On Focus: should switch to raw numeric string for editing
        await fireEvent.focus(input);
        expect(input.value).toBe('1000');

        // On Blur: should switch back to formatted string
        await fireEvent.blur(input);
        expect(input.value).toBe('1,000.00');
    });

    it('handles null values and NaN gracefully', async () => {
        const onChange = vi.fn();
        render(NumberInput, { ...baseProps, value: null, onChange });
        const input = screen.getByRole('textbox') as HTMLInputElement;

        expect(input.value).toBe('');
        
        // Typing just a minus sign or dot (isNaN)
        await fireEvent.input(input, { target: { value: '-' } });
        expect(onChange).toHaveBeenCalledWith(null);
    });
});

describe('NumberInput Final Coverage', () => {
    const baseProps = { id: 'test-input', label: 'Number', onChange: vi.fn() };

    it('strips all negative signs when allowNegative is false', async () => {
        render(NumberInput, { ...baseProps, allowNegative: false });
        const input = screen.getByRole('textbox') as HTMLInputElement;

        await fireEvent.focus(input);
        // Try to sneak in multiple dashes
        await fireEvent.input(input, { target: { value: '-5--0' } });
        expect(input.value).toBe('50'); // Raw value while focused
        
        await fireEvent.blur(input);
        expect(input.value).toBe('50.00'); // Formatted value
    });

    it('correctly handles multiple decimals by flattening them', async () => {
        render(NumberInput, { ...baseProps });
        const input = screen.getByRole('textbox') as HTMLInputElement;

        await fireEvent.focus(input);
        await fireEvent.input(input, { target: { value: '1.2.3.4' } });
        // parts[0] is "1", the rest join to "234"
        expect(input.value).toBe('1.234'); 
        
        await fireEvent.blur(input);
        expect(input.value).toBe('1.23'); // Max digits is 2
    });

it('respects max value clamping', async () => {
    const onChange = vi.fn();
    // We are passing 'max', and now the component is expecting 'max'
    render(NumberInput, { ...baseProps, max: 100, onChange });
    const input = screen.getByRole('textbox');

    await fireEvent.focus(input);
    await fireEvent.input(input, { target: { value: '150' } });
    
    // This will now successfully clamp to 100
    expect(onChange).toHaveBeenCalledWith(100);
});
    it('handles NaN/Empty input by returning null', async () => {
        const onChange = vi.fn();
        render(NumberInput, { ...baseProps, onChange });
        const input = screen.getByRole('textbox');

        await fireEvent.focus(input);
        await fireEvent.input(input, { target: { value: '.' } }); // Invalid number
        expect(onChange).toHaveBeenCalledWith(null);
    });
});