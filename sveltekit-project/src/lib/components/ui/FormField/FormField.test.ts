import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import FormField from './FormField.svelte';
import '@testing-library/jest-dom';

describe('FormField', () => {
	it('renders the label and input correctly', () => {
		render(FormField, {
			id: 'test-id',
			label: 'Test Label',
			required: true
		});

		const labelElement = screen.getByText('Test Label');
		const inputElement = screen.getByRole('textbox', { name: /test label/i });
		const requiredIndicator = screen.getByText('*');

		expect(labelElement).toBeInTheDocument();
		expect(inputElement).toBeInTheDocument();
		expect(requiredIndicator).toBeInTheDocument();
		expect(inputElement).toHaveAttribute('id', 'test-id');
		expect(inputElement).toBeRequired();
	});

	it('renders the description when provided', () => {
		render(FormField, {
			id: 'test-id',
			label: 'Test Label',
			description: 'This is a description.'
		});

		const descriptionElement = screen.getByText('This is a description.');
		expect(descriptionElement).toBeInTheDocument();
		const inputElement = screen.getByRole('textbox', { name: /test label/i });
		expect(inputElement).toHaveAttribute('aria-describedby', `description-test-id`);
	});

	it('renders the error message when provided', () => {
		render(FormField, {
			id: 'test-id',
			label: 'Test Label',
			errorMessage: 'This is an error.'
		});

		const errorMessageElement = screen.getByText('This is an error.');
		expect(errorMessageElement).toBeInTheDocument();
		expect(errorMessageElement).toHaveAttribute('role', 'alert');
		const inputElement = screen.getByRole('textbox', { name: /test label/i });
		expect(inputElement).toHaveAttribute('aria-invalid', 'true');
		expect(inputElement).toHaveAttribute('aria-describedby', `error-test-id`);
	});

	it('renders both description and error message with correct describedby', () => {
		render(FormField, {
			id: 'test-id',
			label: 'Test Label',
			description: 'This is a description.',
			errorMessage: 'This is an error.'
		});

		const descriptionElement = screen.getByText('This is a description.');
		const errorMessageElement = screen.getByText('This is an error.');
		expect(descriptionElement).toBeInTheDocument();
		expect(errorMessageElement).toBeInTheDocument();

		const inputElement = screen.getByRole('textbox', { name: /test label/i });
		const describedby = inputElement.getAttribute('aria-describedby');
		expect(describedby).toContain('description-test-id');
		expect(describedby).toContain('error-test-id');
	});

	it('does not render description or error message when not provided', () => {
		render(FormField, {
			id: 'test-id',
			label: 'Test Label'
		});

		const descriptionElement = screen.queryByText('This is a description.');
		const errorMessageElement = screen.queryByText('This is an error.');
		expect(descriptionElement).not.toBeInTheDocument();
		expect(errorMessageElement).not.toBeInTheDocument();

		const inputElement = screen.getByRole('textbox', { name: /test label/i });
		expect(inputElement).not.toHaveAttribute('aria-describedby');
	});

    it('generates a random id if not provided', () => {
        render(FormField, {
            label: 'Test Label'
        });

        const inputElement = screen.getByRole('textbox', { name: /test label/i });
        expect(inputElement).toHaveAttribute('id');
        expect(inputElement.id).toMatch(/^form-field-/);
    });
});
