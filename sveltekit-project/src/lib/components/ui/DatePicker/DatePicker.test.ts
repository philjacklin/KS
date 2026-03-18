import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DatePicker from './DatePicker.svelte';
import { tick } from 'svelte';

// Mock the locale store
vi.mock('$lib/stores/localeStore', async () => {
	const { readable, writable } = await vi.importActual('svelte/store');
	const t = readable((key: string) => {
		if (key === 'datepicker.placeholder') return 'DD/MM/YYYY';
		if (key === 'datepicker.error_invalid_format') return 'Invalid date format.';
		if (key === 'datepicker.dialog_label') return 'Choose Date';
		return key;
	});
	const locale = writable('en-GB');
	return { t, locale };
});

describe('DatePicker', () => {
	beforeEach(async () => {
		await vi.dynamicImportSettled();
	});

	// --- Previous tests ---

	it('renders with a placeholder', () => {
		render(DatePicker, { placeholder: 'Select a date' });
		expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
	});

	it('renders with an initial value', async () => {
		const date = new Date(2024, 4, 15); // May 15, 2024
		render(DatePicker, { value: date });
		const input = screen.getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('15/05/2024');
	});

	it('is disabled when the disabled prop is true', () => {
		render(DatePicker, { disabled: true });
		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();
	});

	it('does not open the calendar when disabled and clicked', async () => {
		render(DatePicker, { disabled: true });
		const input = screen.getByRole('textbox');
		await fireEvent.click(input);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('shows an error state', () => {
		render(DatePicker, { error: true });
		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('aria-invalid', 'true');
	});

	it('opens the calendar on input click', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox');
		await fireEvent.click(input);
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('closes the calendar on outside click', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox');
		await fireEvent.click(input);
		expect(screen.getByRole('dialog')).toBeInTheDocument();

		await fireEvent.click(document.body);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('selects a date from the calendar', async () => {
		const { component } = render(DatePicker);
		const input = screen.getByRole('textbox') as HTMLInputElement;
		await fireEvent.click(input);

		const dateToSelect = screen.getByText('15');
		await fireEvent.click(dateToSelect);

		expect(input.value).toMatch(/15\/\d{2}\/\d{4}/);
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('updates value when a valid date is typed', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: '25/12/2024' } });
		expect(input.value).toBe('25/12/2024');
		expect(screen.queryByText('Invalid date format.')).not.toBeInTheDocument();
	});

	it('shows an error when an invalid date is typed', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: '99/99/9999' } });
		expect(input.value).toBe('99/99/9999');
		expect(screen.getByText('Invalid date format.')).toBeInTheDocument();
	});

	it('clears the value when the input is cleared', async () => {
		render(DatePicker, { value: new Date() });
		const input = screen.getByRole('textbox') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: '' } });
		expect(input.value).toBe('');
	});

	it('navigates to the next month', async () => {
		render(DatePicker, { value: new Date(2024, 4, 15) });
		await fireEvent.click(screen.getByRole('textbox'));

		expect(screen.getByText('May 2024')).toBeInTheDocument();
		const nextButton = screen.getByLabelText('datepicker.next_month');
		await fireEvent.click(nextButton);
		expect(screen.getByText('June 2024')).toBeInTheDocument();
	});

	it('navigates to the previous month', async () => {
		render(DatePicker, { value: new Date(2024, 4, 15) });
		await fireEvent.click(screen.getByRole('textbox'));

		expect(screen.getByText('May 2024')).toBeInTheDocument();
		const prevButton = screen.getByLabelText('datepicker.previous_month');
		await fireEvent.click(prevButton);
		expect(screen.getByText('April 2024')).toBeInTheDocument();
	});

	it('highlights today\'s date', async () => {
		render(DatePicker);
		await fireEvent.click(screen.getByRole('textbox'));
		const calendar = screen.getByRole('dialog');
    	const todayElement = calendar.querySelector('.today');
    
    	expect(todayElement).toBeInTheDocument();
    	expect(todayElement).toHaveTextContent(new Date().getDate().toString());
	});

	it('highlights the selected date', async () => {
		const date = new Date(2024, 4, 20);
		render(DatePicker, { value: date });
		await fireEvent.click(screen.getByRole('textbox'));
		const selectedElement = screen.getByText('20');
		expect(selectedElement.closest('button')).toHaveAttribute('aria-selected', 'true');
	});

	// --- Keyboard Navigation Tests ---

	it('opens the calendar with Enter key', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox');
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('opens the calendar with ArrowDown key', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox');
		await fireEvent.keyDown(input, { key: 'ArrowDown' });
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('closes the calendar with Escape key from within the calendar', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox');
		await fireEvent.click(input); // Open calendar
		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();

		// The focus should be inside the calendar now
		const focusedElement = document.activeElement;
		expect(dialog.contains(focusedElement)).toBe(true);

		await fireEvent.keyDown(focusedElement!, { key: 'Escape' });
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('navigates calendar dates with arrow keys', async () => {
		render(DatePicker, { value: new Date(2024, 4, 15) });
		const input = screen.getByRole('textbox');
		await fireEvent.click(input);

		const day15 = screen.getByText('15').closest('button');
		expect(day15).not.toBeNull();
		day15?.focus();

		// Navigate right to the 16th
		await fireEvent.keyDown(day15!, { key: 'ArrowRight' });
		expect(document.activeElement?.textContent).toBe('16');

		// Navigate left back to the 15th
		await fireEvent.keyDown(document.activeElement!, { key: 'ArrowLeft' });
		expect(document.activeElement?.textContent).toBe('15');

		// Navigate down to the 22nd
		await fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
		expect(document.activeElement?.textContent).toBe('22');

		// Navigate up back to the 15th
		await fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
		expect(document.activeElement?.textContent).toBe('15');
	});

	it('selects a date with Enter key in the calendar', async () => {
		render(DatePicker, { value: new Date(2024, 4, 15) });
		const input = screen.getByRole('textbox') as HTMLInputElement;
		await fireEvent.click(input);

		const day16 = screen.getByText('16').closest('button');
		expect(day16).not.toBeNull();
		day16?.focus();

		await fireEvent.keyDown(day16!, { key: 'Enter' });
		expect(input.value).toBe('16/05/2024');
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('focuses the selected date on open', async () => {
		render(DatePicker, { value: new Date(2024, 4, 21) });
		const input = screen.getByRole('textbox');
		await fireEvent.click(input);
		expect(document.activeElement?.textContent).toBe('21');
	});

	it('focuses today\'s date on open if no value is selected', async () => {
		render(DatePicker);
		const input = screen.getByRole('textbox');
		await fireEvent.click(input);
		const today = new Date().getDate().toString();
		expect(document.activeElement?.textContent).toBe(today);
	});

	it('navigates to the next month when using arrows on the last day', async () => {
		render(DatePicker, { value: new Date(2024, 4, 31) });
		await fireEvent.click(screen.getByRole('textbox'));

		const day31 = screen.getByText('31');
		day31.focus();
		await fireEvent.keyDown(day31, { key: 'ArrowRight' });

		expect(screen.getByText('June 2024')).toBeInTheDocument();
		expect(document.activeElement?.textContent).toBe('1');
	});

	it('focuses the first day when opening a month with no selected date or today', async () => {
		// Set current date to something far away so "today" isn't in the default view
		vi.useFakeTimers().setSystemTime(new Date('2099-01-15'));

		render(DatePicker, { value: null }); // No initial value
		const input = screen.getByRole('textbox');
		await fireEvent.click(input); // Opens to Jan 2099

		// Navigate to a different month
		const nextButton = screen.getByLabelText('datepicker.next_month');
		await fireEvent.click(nextButton); // Go to Feb 2099

		// Re-open the calendar to trigger the focus logic
		await fireEvent.click(document.body); // Close
		await fireEvent.click(input); // Re-open

		// It should now be focused on the first day of Feb 2099
		const focused = document.activeElement;
		expect(focused?.tagName).toBe('BUTTON');
		// Use a safer check that won't throw an error if getAttribute is null
		expect(focused?.getAttribute('data-date')).toBe('2099-02-01');
		expect(focused?.textContent?.trim()).toBe('1');		
		vi.useRealTimers(); // Clean up
	});
});
