import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Skeleton from './Skeleton.svelte';

describe('Skeleton', () => {
    it('renders with default props', () => {
        render(Skeleton);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveClass('animate-pulse');
        expect(skeleton).toHaveClass('rounded-md'); // rectangle variant
        expect(skeleton).toHaveClass('w-full');
        expect(skeleton).toHaveClass('h-4');
    });

    it('applies the correct variant class', () => {
        // Svelte 5: Pass props directly as the second argument
        const { rerender } = render(Skeleton, { variant: 'circle' });
        expect(screen.getByRole('status')).toHaveClass('rounded-full');

        // Svelte 5: Use rerender({ variant: 'text' }) instead of { props: { ... } }
        rerender({ variant: 'text' });
        expect(screen.getByRole('status')).toHaveClass('rounded-sm'); // Fixed from rounded-md
        expect(screen.getByRole('status')).toHaveClass('h-4');

        rerender({ variant: 'rectangle' });
        expect(screen.getByRole('status')).toHaveClass('rounded-md');
    });

    it('applies the correct animation class', () => {
        const { rerender } = render(Skeleton, { animation: 'wave' });
        expect(screen.getByRole('status')).toHaveClass('animate-wave');

        rerender({ animation: 'none' });
        expect(screen.getByRole('status')).not.toHaveClass('animate-pulse');
        expect(screen.getByRole('status')).not.toHaveClass('animate-wave');

        rerender({ animation: 'pulse' });
        expect(screen.getByRole('status')).toHaveClass('animate-pulse');
    });

    it('applies custom width and height', () => {
        render(Skeleton, { width: 'w-20', height: 'h-20' });
        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveClass('w-20');
        expect(skeleton).toHaveClass('h-20');
    });

    it('applies a custom class', () => {
        render(Skeleton, { class: 'custom-class' });
        expect(screen.getByRole('status')).toHaveClass('custom-class');
    });

    it('has correct accessibility attributes', () => {
        render(Skeleton);
        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveAttribute('aria-live', 'polite');
        expect(skeleton).toHaveAttribute('aria-busy', 'true');
    });
});