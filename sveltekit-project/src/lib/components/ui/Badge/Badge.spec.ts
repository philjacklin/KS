import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import Badge from './Badge.svelte';
import BadgeTest from './BadgeTest.svelte'; // Import the new wrapper

describe('Badge', () => {
    it('renders with default variant', () => {
        render(Badge);
        const badge = screen.getByRole('status'); 
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('bg-foreground/5', 'text-foreground/80');
    });

    it('renders with success variant', () => {
        render(Badge, { variant: 'success' });
        const badge = screen.getByRole('status');
        expect(badge).toHaveClass('bg-payroll-teal/10', 'text-payroll-teal');
    });

    it('renders with warning variant', () => {
        render(Badge, { variant: 'warning' });
        const badge = screen.getByRole('status');
        expect(badge).toHaveClass('bg-payroll-gold/10', 'text-payroll-gold');
    });

    it('renders with error variant', () => {
        render(Badge, { variant: 'error' });
        const badge = screen.getByRole('status');
        expect(badge).toHaveClass('bg-red-500/10', 'text-red-600');
    });

    it('renders with info variant', () => {
        render(Badge, { variant: 'info' });
        const badge = screen.getByRole('status');
        expect(badge).toHaveClass('bg-payroll-cyan/10', 'text-payroll-cyan');
    });

    it('renders with a custom class', () => {
        render(Badge, { class: 'custom-class' });
        const badge = screen.getByRole('status');
        expect(badge).toHaveClass('custom-class');
    });

    it('renders content inside the badge', () => {
        // We use the BadgeTest wrapper which provides the snippet properly
        render(BadgeTest, { content: 'Hello, Badge!' });
        
        expect(screen.getByText('Hello, Badge!')).toBeInTheDocument();
    });
});