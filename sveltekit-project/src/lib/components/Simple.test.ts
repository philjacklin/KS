import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

describe('Simple Test', () => {
    it('renders', () => {
        render({ setup: () => { /* */ }, script: () => { /* */ }, template: '<div>Hello</div>' });
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
});
