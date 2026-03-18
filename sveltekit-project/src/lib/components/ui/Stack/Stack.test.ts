import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import StackTestHost from './StackTestHost.svelte';

describe('Stack', () => {
    // Helper to get the actual flex container from the rendered host
    const getStack = () => screen.getByText('Child 1').parentElement!;

    it('renders with default props', () => {
        render(StackTestHost);
        const stack = getStack();
        
        expect(stack).toHaveClass('flex', 'flex-col', 'gap-[16px]', 'items-stretch', 'justify-start');
    });

    it('renders children correctly', () => {
        render(StackTestHost, { props: { childrenText: 'Unique Child' } });
        expect(screen.getByText('Unique Child')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('applies horizontal direction class', () => {
        render(StackTestHost, { props: { direction: 'horizontal' } });
        expect(getStack()).toHaveClass('flex-row');
    });

    it('applies small spacing class', () => {
        render(StackTestHost, { props: { spacing: 'sm' } });
        expect(getStack()).toHaveClass('gap-[8px]');
    });

    it('applies large spacing class', () => {
        render(StackTestHost, { props: { spacing: 'lg' } });
        expect(getStack()).toHaveClass('gap-[24px]');
    });

    it('applies align variants', () => {
        const { rerender } = render(StackTestHost, { props: { align: 'start' } });
        expect(getStack()).toHaveClass('items-start');

        rerender({ align: 'center' });
        expect(getStack()).toHaveClass('items-center');

        rerender({ align: 'end' });
        expect(getStack()).toHaveClass('items-end');

        rerender({ align: 'baseline' });
        expect(getStack()).toHaveClass('items-baseline');
    });

    it('applies justify variants', () => {
        const { rerender } = render(StackTestHost, { props: { justify: 'center' } });
        expect(getStack()).toHaveClass('justify-center');

        rerender({ justify: 'end' });
        expect(getStack()).toHaveClass('justify-end');

        rerender({ justify: 'between' });
        expect(getStack()).toHaveClass('justify-between');

        rerender({ justify: 'around' });
        expect(getStack()).toHaveClass('justify-around');

        rerender({ justify: 'evenly' });
        expect(getStack()).toHaveClass('justify-evenly');
    });

    it('applies custom className', () => {
        render(StackTestHost, { props: { className: 'custom-class' } });
        expect(getStack()).toHaveClass('custom-class');
    });
});