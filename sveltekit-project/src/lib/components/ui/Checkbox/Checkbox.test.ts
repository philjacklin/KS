import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from './Checkbox.svelte';
import userEvent from '@testing-library/user-event'; // 1. Import userEvent

describe('Checkbox', () => {
	it('renders with default props', () => {
		const { getByRole } = render(Checkbox);
		const checkbox = getByRole('checkbox');
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
		expect(checkbox).not.toBeDisabled();
	});

	it('renders as checked', () => {
		const { getByRole } = render(Checkbox, { props: { checked: true } });
		const checkbox = getByRole('checkbox');
		expect(checkbox).toBeChecked();
	});

	it('renders as indeterminate', () => {
		const { getByRole } = render(Checkbox, { props: { indeterminate: true } });
		const checkbox = getByRole('checkbox') as HTMLInputElement;
		expect(checkbox.indeterminate).toBe(true);
	});

	it('renders as disabled', () => {
		const { getByRole } = render(Checkbox, { props: { disabled: true } });
		const checkbox = getByRole('checkbox');
		expect(checkbox).toBeDisabled();
	});

	it('renders with a label', () => {
		const { getByText } = render(Checkbox, { props: { label: 'Test Label' } });
		const label = getByText('Test Label');
		expect(label).toBeInTheDocument();
	});

it('fires the change event', async () => {
        const onchange = vi.fn();
        // Pass the handler as a prop instead of using $on
        render(Checkbox, { props: { onchange } });
        
        const checkbox = screen.getByRole('checkbox');
        await fireEvent.click(checkbox);
        
        expect(onchange).toHaveBeenCalledTimes(1);
    });

    it('fires the click event', async () => {
        const onclick = vi.fn();
        render(Checkbox, { props: { onclick } });
        
        const checkbox = screen.getByRole('checkbox');
        await fireEvent.click(checkbox);
        
        expect(onclick).toHaveBeenCalledTimes(1);
    });

    it('does not fire events when disabled', async () => {
    const user = userEvent.setup(); // 2. Setup user instance
    const onchange = vi.fn();
    const onclick = vi.fn();
    
    render(Checkbox, { props: { disabled: true, onchange, onclick } });
    
    const checkbox = screen.getByRole('checkbox');
    
    // 3. Use user.click() instead of fireEvent.click()
    await user.click(checkbox);
    
    expect(onchange).not.toHaveBeenCalled();
    expect(onclick).not.toHaveBeenCalled();
    // Also verify the state didn't change
    expect(checkbox).not.toBeChecked(); 
  });

    it('has correct aria attributes via props', () => {
        const { rerender } = render(Checkbox, { props: { checked: true } });
        let checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveAttribute('aria-checked', 'true');

        // Test indeterminate state
        rerender({ props: { indeterminate: true } });
        expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });
});
