import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Typography from './Typography.svelte';
import { Writable, writable } from 'svelte/store';
import type { LocaleStore } from '$lib/stores/localeStore';

vi.mock('$lib/stores/localeStore', async () => {
    // Import writable inside the factory so it's available during hoisting
    const { writable } = await import('svelte/store');
    const t = writable((key: string) => `t(${key})`);
    const mockLocaleStore = writable({
        t: (key: string) => `t(${key})`,
        locales: ['en', 'es'],
        setLocale: vi.fn(),
        getLocale: vi.fn(() => 'en'),
        locale: 'en'
    });

    return {
        localeStore: mockLocaleStore,
        t: t
    };
});

describe('Typography', () => {
    it('renders with default props', () => {
        render(Typography, { props: { children: 'Default text' } });
        const element = screen.getByText('t(Default text)');
        expect(element.tagName).toBe('P');
        expect(element).toHaveClass('font-sans');
        expect(element).toHaveClass('text-base');
        expect(element).toHaveClass('font-normal');
        expect(element).toHaveClass('text-payroll-teal');
    });

    it('renders as a different element using "as" prop', () => {
        render(Typography, { props: { children: 'Heading 1', as: 'h1' } });
        const element = screen.getByRole('heading', { level: 1 });
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('H1');
        expect(screen.getByText('t(Heading 1)')).toBeInTheDocument();
    });

    it('applies the correct variant class', () => {
        render(Typography, { props: { children: 'Heading 1', variant: 'h1' } });
        const element = screen.getByText('t(Heading 1)');
        expect(element).toHaveClass('text-4xl');
        expect(element).toHaveClass('font-semibold');
    });

    it('applies a custom color', () => {
        render(Typography, { props: { children: 'Custom color', color: 'red-500' } });
        const element = screen.getByText('t(Custom color)');
        expect(element).toHaveClass('text-red-500');
    });

    it('merges custom classes with className prop', () => {
        render(Typography, {
            props: { children: 'Custom classes', className: 'extra-class' }
        });
        const element = screen.getByText('t(Custom classes)');
        expect(element).toHaveClass('extra-class');
        expect(element).toHaveClass('text-base'); // Default variant class
    });

    it('renders translated content from localeStore', () => {
        render(Typography, { props: { children: 'hello_world' } });
        expect(screen.getByText('t(hello_world)')).toBeInTheDocument();
    });

    it('renders with multiple props correctly', () => {
        render(Typography, {
            props: {
                children: 'Complex example',
                as: 'h2',
                variant: 'h2',
                color: 'blue-600',
                className: 'my-4'
            }
        });
        const element = screen.getByRole('heading', { level: 2 });
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('H2');
        expect(screen.getByText('t(Complex example)')).toBeInTheDocument();
        expect(element).toHaveClass('text-3xl');
        expect(element).toHaveClass('font-semibold');
        expect(element).toHaveClass('text-blue-600');
        expect(element).toHaveClass('my-4');
    });
});
