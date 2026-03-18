import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import TextInput from './TextInput.svelte';
import Test from './Test.svelte';

describe('TextInput', () => {
    const defaultProps = { id: 'test-input', name: 'test-input' };

    it('renders with required props and handles default values', () => {
        render(TextInput, { props: defaultProps });
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', '');
        expect(input).not.toBeRequired();
    });

    it('applies custom className to the container', () => {
        render(TextInput, { props: { ...defaultProps, className: 'custom-container-class' } });
        // The container is the parent of the input
        const container = screen.getByRole('textbox').parentElement;
        expect(container).toHaveClass('custom-container-class');
    });

    it('handles the required prop', () => {
        render(TextInput, { props: { ...defaultProps, required: true } });
        expect(screen.getByRole('textbox')).toBeRequired();
    });

    describe('Error handling and ARIA', () => {
        it('shows error message and sets aria-invalid when both error and message exist', () => {
            render(TextInput, { 
                props: { 
                    ...defaultProps, 
                    error: true, 
                    errorMessage: 'Field is required' 
                } 
            });
            const input = screen.getByRole('textbox');
            const errorMsg = screen.getByText('Field is required');
            
            expect(input).toHaveAttribute('aria-invalid', 'true');
            expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
            expect(errorMsg).toHaveAttribute('id', 'test-input-error');
        });

        it('sets aria-invalid but shows no text if errorMessage is empty', () => {
            render(TextInput, { props: { ...defaultProps, error: true, errorMessage: '' } });
            expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
            expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
        });

        it('does not set aria-describedby when error is false', () => {
            render(TextInput, { props: { ...defaultProps, error: false } });
            expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
        });
    });

    describe('Snippets (Prefix/Suffix)', () => {
        // In Svelte 5 testing, we can pass a dummy component or a function for snippets
        it('renders prefix and suffix snippets', () => {
    render(Test, { 
        props: { 
            id: 'test-input',
            name: 'test-input',
            prefixText: 'PRE', 
            suffixText: 'SUF' 
        } 
    });

    // These will now be found because prefix={pre} and suffix={suf} 
    // force the {#if} blocks in TextInput.svelte to be true.
    expect(screen.getByText('PRE')).toBeInTheDocument();
    expect(screen.getByText('SUF')).toBeInTheDocument();
});
    });

    it('triggers the onChange handler prop', async () => {
        const onChange = vi.fn();
        render(TextInput, { props: { ...defaultProps, onChange } });
        
        const input = screen.getByRole('textbox');
        await fireEvent.change(input, { target: { value: 'new value' } });
        
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('updates the value via binding', async () => {
        // Testing Svelte 5 bind:value behavior
        render(Test, { props: { ...defaultProps, value: 'initial' } });
        const input = screen.getByRole('textbox') as HTMLInputElement;
        
        expect(input.value).toBe('initial');
        await fireEvent.input(input, { target: { value: 'updated' } });
        expect(input.value).toBe('updated');
    });

    it('displays a visual indicator when required is true', () => {
    const { rerender } = render(TextInput, { props: { ...defaultProps, required: true } });
    
    // Check for the asterisk
    const indicator = screen.getByTestId('required-indicator');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveTextContent('*');

    // Branch Coverage: Ensure it disappears when required is false
    rerender({ ...defaultProps, required: false });
    expect(screen.queryByTestId('required-indicator')).not.toBeInTheDocument();
});

});