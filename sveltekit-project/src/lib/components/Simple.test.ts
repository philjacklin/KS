import { render, screen } from '@storybook/test';
import { describe, it, expect } from 'vitest';

describe('Simple Test', () => {
    it('renders', () => {
        render({ setup: () => { /* */ }, script: () => { /* */ }, template: '<div>Hello</div>' });
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
});
