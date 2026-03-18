import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Select from './Select.svelte';

// Mock the locale store (Hoisting safe - no external imports inside)
vi.mock('$lib/stores/localeStore', () => {
	const createStore = (val: any) => ({
		subscribe: (fn: (v: any) => void) => {
			fn(val);
			return () => {};
		}
	});
	return {
		t: createStore((key: string) => key),
		locale: createStore('en')
	};
});

describe('Select Component', () => {
	const options = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' }
	];

	beforeEach(() => {
		// Mock scrollIntoView to prevent JSDOM crashes
		window.HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	it('renders with default placeholder', () => {
		render(Select, { props: { options } });
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('select.placeholder');
	});

	it('selects an option and triggers onchange', async () => {
		const onchange = vi.fn();
		render(Select, { props: { options, onchange } });
		
		const button = screen.getByRole('button');
		await fireEvent.click(button);
		
		const banana = screen.getByText('Banana');
		await fireEvent.click(banana);
		
		expect(onchange).toHaveBeenCalledWith('banana');
		expect(button).toHaveTextContent('Banana');
	});

	it('handles multiple selection', async () => {
		const onchange = vi.fn();
		render(Select, { props: { options, multiple: true, onchange } });
		
		// Use a partial match for the button name to avoid placeholder conflicts
		await fireEvent.click(screen.getByRole('button', { name: /select.placeholder/i }));
		
		await fireEvent.click(screen.getByText('Apple'));
		expect(onchange).toHaveBeenCalledWith(['apple']);
		
		await fireEvent.click(screen.getByText('Cherry'));
		expect(onchange).toHaveBeenLastCalledWith(['apple', 'cherry']);
		
		// Specific query to find the main dropdown button among other buttons
		const mainButton = screen.getByRole('button', { name: /Apple, Cherry/i });
		expect(mainButton).toBeInTheDocument();
	});

	it('clears all selections in multiple mode', async () => {
		const onchange = vi.fn();
		render(Select, { props: { options, multiple: true, value: ['apple'], onchange } });
		
		// Open dropdown
		await fireEvent.click(screen.getByRole('button', { name: /apple/i }));
		
		// Find and click 'Clear All' button specifically
		const clearBtn = screen.getByRole('button', { name: /select.clear_all/i });
		await fireEvent.click(clearBtn);
		
		expect(onchange).toHaveBeenCalledWith([]);
	});

	it('navigates with keyboard and selects on Enter', async () => {
		const onchange = vi.fn();
		render(Select, { props: { options, onchange } });
		
		const button = screen.getByRole('button');
		// Open with ArrowDown
		await fireEvent.keyDown(button, { key: 'ArrowDown' });
		expect(screen.getByRole('listbox')).toBeInTheDocument();
		
		// First ArrowDown focuses "Apple" (focusedIndex 0)
		await fireEvent.keyDown(button, { key: 'ArrowDown' });
		await fireEvent.keyDown(button, { key: 'Enter' });
		
		expect(onchange).toHaveBeenCalledWith('apple');
	});
});