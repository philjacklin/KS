import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import TestHost from './TestHost.svelte';
import { tick } from 'svelte';

vi.mock('$lib/stores/localeStore', async (importOriginal) => {
	const { readable } = await import('svelte/store');
	return {
		t: readable((key: string) => key)
	};
});

describe('Table', () => {
	const columns = [
		{ id: 'name', label: 'table.name' },
		{ id: 'age', label: 'table.age' },
		{ id: 'date', label: 'table.date' }
	];

	const data = [
		{ id: 1, name: 'John', age: 30, date: new Date('2023-01-15') },
		{ id: 2, name: 'Jane', age: 25, date: new Date('2022-05-20') },
		{ id: 3, name: 'Alex', age: 35, date: new Date('2024-03-10') }
	];

	it('renders the table with columns and data', async () => {
		render(TestHost, { columns, data });
		await tick();

		// Check for column headers
		expect(screen.getByText('table.name')).toBeInTheDocument();
		expect(screen.getByText('table.age')).toBeInTheDocument();

		// Check for data rows
		expect(screen.getByText('John')).toBeInTheDocument();
		expect(screen.getByText('30')).toBeInTheDocument();
		expect(screen.getByText('Jane')).toBeInTheDocument();
		expect(screen.getByText('25')).toBeInTheDocument();
	});

	it('renders a message when no data is available', async () => {
		render(TestHost, { columns, data: [] });
		await tick();

		expect(screen.getByText('table.no_data_available')).toBeInTheDocument();
	});

	it('applies sticky header class when stickyHeader is true', async () => {
		const { container } = render(TestHost, { columns, data, stickyHeader: true });
		await tick();

		let heads = container.querySelectorAll('th');
		const th = heads[0];
		expect(th).toHaveClass('sticky');
	});

	it('merges custom class names', async () => {
		const { container } = render(TestHost, { columns, data, className: 'custom-class' });
		await tick();

		const table = container.querySelector('table');
		expect(table).toHaveClass('custom-class');
	});

	it('sorts data when a sortable column header is clicked', async () => {
		const { container } = render(TestHost, {
			columns,
			data,
			sortableColumns: ['name', 'age', 'date']
		});
		await tick();

		const nameHeader = screen.getByText('table.name');
		const ageHeader = screen.getByText('table.age');
		const dateHeader = screen.getByText('table.date');

		// Sort by name ascending
		await fireEvent.click(nameHeader);
		await tick();
		let rows = container.querySelectorAll('tbody tr');
		expect(rows[0].textContent).toContain('Alex');
		expect(rows[1].textContent).toContain('Jane');
		expect(rows[2].textContent).toContain('John');

		// Sort by name descending
		await fireEvent.click(nameHeader);
		await tick();
		rows = container.querySelectorAll('tbody tr');
		expect(rows[0].textContent).toContain('John');
		expect(rows[1].textContent).toContain('Jane');
		expect(rows[2].textContent).toContain('Alex');

		// Sort by age ascending
		await fireEvent.click(ageHeader);
		await tick();
		rows = container.querySelectorAll('tbody tr');
		expect(rows[0].textContent).toContain('Jane');
		expect(rows[1].textContent).toContain('John');
		expect(rows[2].textContent).toContain('Alex');

		// Sort by date descending
		await fireEvent.click(dateHeader);
		await tick();
		await fireEvent.click(dateHeader);
		await tick();
		rows = container.querySelectorAll('tbody tr');
		expect(rows[0].textContent).toContain('Alex');
		expect(rows[1].textContent).toContain('John');
		expect(rows[2].textContent).toContain('Jane');
	});

	it('does not sort when a non-sortable column header is clicked', async () => {
		const { container } = render(TestHost, { columns, data, sortableColumns: ['age'] });
		await tick();

		const nameHeader = screen.getByText('table.name');
		await fireEvent.click(nameHeader);
		await tick();

		const rows = container.querySelectorAll('tbody tr');
		// Order should not change
		expect(rows[0].textContent).toContain('John');
		expect(rows[1].textContent).toContain('Jane');
		expect(rows[2].textContent).toContain('Alex');
	});

	it('handles row selection', async () => {
		render(TestHost, { columns, data, rowSelectionEnabled: true });
		await tick();

		const checkboxes = screen.getAllByRole('checkbox');
		const selectAllCheckbox = checkboxes[0];
		const rowCheckboxes = checkboxes.slice(1);

		// Select a row
		await fireEvent.click(rowCheckboxes[0]);
		await tick();
		expect(rowCheckboxes[0]).toBeChecked();
		expect(selectAllCheckbox).toBePartiallyChecked();

		// Deselect a row
		await fireEvent.click(rowCheckboxes[0]);
		await tick();
		expect(rowCheckboxes[0]).not.toBeChecked();

		// Select all rows
		await fireEvent.click(selectAllCheckbox);
		await tick();
		rowCheckboxes.forEach((checkbox) => expect(checkbox).toBeChecked());

		// Deselect all rows
		await fireEvent.click(selectAllCheckbox);
		await tick();
		rowCheckboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
	});

	it('handles null or undefined values during sorting', async () => {
		const dataWithNulls = [
			{ id: 1, name: 'John', age: 30 },
			{ id: 2, name: 'Jane', age: null },
			{ id: 3, name: 'Alex', age: 35 },
			{ id: 4, name: 'Chris', age: undefined }
		];

		const { container } = render(TestHost, {
			columns: [
				{ id: 'name', label: 'table.name' },
				{ id: 'age', label: 'table.age' }
			],
			data: dataWithNulls,
			sortableColumns: ['age']
		});
		await tick();

		const ageHeader = screen.getByText('table.age');

		// Sort by age ascending (nulls/undefined should be at the end)
		await fireEvent.click(ageHeader);
		await tick();
		let rows = container.querySelectorAll('tbody tr');
		expect(rows[0].textContent).toContain('John');
		expect(rows[1].textContent).toContain('Alex');
		expect(rows[2].textContent).toContain('Jane');
		expect(rows[3].textContent).toContain('Chris');
	});
	it('renders no data message with correct colspan when row selection is enabled', async () => {
		const { container } = render(TestHost, { columns, data: [], rowSelectionEnabled: true });
		await tick();
		const td = container.querySelector('td');
		expect(td).toHaveAttribute('colspan', '4'); // 3 columns + 1 checkbox column
	});
});
