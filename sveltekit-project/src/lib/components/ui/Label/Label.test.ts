import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import LabelTest from './LabelTest.svelte';

describe('Label', () => {
	it('renders a label element', () => {
		render(LabelTest);
		const labelElement = screen.getByTestId('label');
		expect(labelElement).toBeInTheDocument();
		expect(labelElement.tagName).toBe('LABEL');
	});

	it('associates with a form control via the or\ attribute', () => {
		render(LabelTest, { for: 'test-input' });
		const labelElement = screen.getByTestId('label');
		expect(labelElement).toHaveAttribute('for', 'test-input');
	});

	it('renders child content', () => {
		render(LabelTest, { children: 'Test Label' });
		const labelElement = screen.getByTestId('label');
		expect(labelElement).toHaveTextContent('Test Label');
	});

	it('applies custom classes', () => {
		render(LabelTest, { class: 'custom-class' });
		const labelElement = screen.getByTestId('label');
		expect(labelElement).toHaveClass('custom-class');
	});

	it('applies the required indicator when the required prop is true', () => {
		render(LabelTest, { required: true });
		const labelElement = screen.getByTestId('label');
		expect(labelElement).toHaveClass("after:content-['*']");
	});
});

