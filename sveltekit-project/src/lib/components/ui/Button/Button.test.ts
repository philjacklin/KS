import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import TestButton from './TestButton.svelte';
import '@testing-library/jest-dom';

describe('Button.svelte', () => {
	it('renders children correctly', () => {
		render(TestButton, {
			slot: 'Click me'
		});
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	it('executes onClick handler when clicked', async () => {
		const onClick = vi.fn();
		render(TestButton, {
			onClick,
			slot: 'Click me'
		});

		const button = screen.getByText('Click me');
		await fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is true', async () => {
		const onClick = vi.fn();
		render(TestButton, {
			onClick,
			disabled: true,
			slot: 'Click me'
		});

		const button = screen.getByText('Click me');
		expect(button).toBeDisabled();
		await fireEvent.click(button);
		expect(onClick).not.toHaveBeenCalled();
	});

	it('renders primary variant by default', () => {
		render(TestButton, {
			slot: 'Click me'
		});
		const button = screen.getByText('Click me');
		expect(button).toHaveClass('bg-payroll-teal');
	});

	it('renders secondary variant correctly', () => {
		render(TestButton, {
			variant: 'secondary',
			slot: 'Click me'
		});
		const button = screen.getByText('Click me');
		expect(button).toHaveClass('bg-payroll-gold');
	});

	it('renders ghost variant correctly', () => {
		render(TestButton, {
			variant: 'ghost',
			slot: 'Click me'
		});
		const button = screen.getByText('Click me');
		expect(button).toHaveClass('hover:bg-payroll-teal/10');
	});

	it('renders danger variant correctly', () => {
		render(TestButton, {
			variant: 'destructive',
			slot: 'Click me'
		});
		const button = screen.getByText('Click me');
		expect(button).toHaveClass('bg-payroll-destructive');
	});

	it('shows spinner and prevents clicks when loading is true', async () => {
		const onClick = vi.fn();
		render(TestButton, {
			loading: true,
			onClick,
			slot: 'Processing'
		});

		const button = screen.getByRole('button');
		const spinner = screen.getByTestId('button-spinner');

		// Verify spinner exists
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveClass('animate-spin');

		// Verify interaction is blocked
		expect(button).toBeDisabled();
		await fireEvent.click(button);
		expect(onClick).not.toHaveBeenCalled();
	});
});
