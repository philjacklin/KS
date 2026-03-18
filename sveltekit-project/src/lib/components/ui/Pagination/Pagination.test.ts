import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { writable } from 'svelte/store';
//import PaginationTestHost from './PaginationTestHost.svelte';
import type { SvelteComponent } from 'svelte';

vi.mock('$lib/stores/localeStore', () => {
  const t = writable((key: string, vars?: any) => {
    const translations: Record<string, string> = {
      'pagination.previous': 'Previous',
      'pagination.next': 'Next',
      'pagination.page_of': 'Page {current} of {total}',
    };
    
    let text = translations[key] || key;
    
    // 2. We must actually handle the variable replacement for "Page 2 of 5"
    if (vars) {
      Object.keys(vars).forEach(v => {
        text = text.replace(`{${v}}`, vars[v]);
      });
    }
    return text;
  });
  return { t };
});

let Pagination: typeof SvelteComponent;

const module = await import('./Pagination.svelte');
Pagination = module.default;

describe('Pagination', () => {
	it('renders nothing if totalPages is 1 or less', () => {
		const { container } = render(Pagination, { totalItems: 1, itemsPerPage: 2 });
		expect(container.querySelector('nav')).toBeNull();
	});

	it('renders the pagination component with correct initial state', () => {
		render(Pagination, { currentPage: 2, totalItems: 10, itemsPerPage: 2 });

		expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
		expect(screen.getByText('Previous')).not.toBeDisabled();
		expect(screen.getByText('Next')).not.toBeDisabled();
	});

	it('disables the "Previous" button on the first page', () => {
		render(Pagination, { currentPage: 1, totalItems: 10, itemsPerPage: 2 });

		expect(screen.getByText('Previous')).toBeDisabled();
	});

	it('disables the "Next" button on the last page', () => {
		render(Pagination, { currentPage: 5, totalItems: 10, itemsPerPage: 2 });

		expect(screen.getByText('Next')).toBeDisabled();
	});

	it('calls onPageChange with the correct page number when "Next" is clicked', async () => {
		const onPageChange = vi.fn();
		render(Pagination, { currentPage: 2, totalItems: 10, itemsPerPage: 2, onPageChange });

		const nextButton = screen.getByText('Next');
		await fireEvent.click(nextButton);

		expect(onPageChange).toHaveBeenCalledWith(3);
	});

	it('calls onPageChange with the correct page number when "Previous" is clicked', async () => {
		const onPageChange = vi.fn();
		render(Pagination, { currentPage: 2, totalItems: 10, itemsPerPage: 2, onPageChange });

		const previousButton = screen.getByText('Previous');
		await fireEvent.click(previousButton);

		expect(onPageChange).toHaveBeenCalledWith(1);
	});

	it('does not call onPageChange when "Previous" is clicked on the first page', async () => {
		const onPageChange = vi.fn();
		render(Pagination, { currentPage: 1, totalItems: 10, itemsPerPage: 2, onPageChange });

		const previousButton = screen.getByText('Previous');
		await fireEvent.click(previousButton);

		expect(onPageChange).not.toHaveBeenCalled();
	});

	it('does not call onPageChange when "Next" is clicked on the last page', async () => {
		const onPageChange = vi.fn();
		render(Pagination, { currentPage: 5, totalItems: 10, itemsPerPage: 2, onPageChange });

		const nextButton = screen.getByText('Next');
		await fireEvent.click(nextButton);

		expect(onPageChange).not.toHaveBeenCalled();
	});
});
