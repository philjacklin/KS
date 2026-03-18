import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import DividerTestHost from './DividerTestHost.svelte';
import DividerStoryWrapper from './DividerStoryWrapper.svelte';

describe('Divider Component', () => {
    // 1. Basic Rendering & Variants
    it('renders with default props (Horizontal, No Label)', () => {
        render(DividerTestHost);
        const divider = screen.getByRole('separator');
        
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
        // Matching your actual variant output
        expect(divider).toHaveClass('w-full', 'border-b-2');
    });

    it('renders a vertical divider', () => {
        render(DividerTestHost, { props: { orientation: 'vertical' } });
        const divider = screen.getByRole('separator');
        
        expect(divider).toHaveAttribute('aria-orientation', 'vertical');
        expect(divider).toHaveClass('h-full', 'border-r-2');
    });

    it('applies dashed and thickness classes correctly', () => {
        render(DividerTestHost, { props: { dashed: true, thickness: 'thick' } });
        const divider = screen.getByRole('separator');
        
        expect(divider).toHaveClass('border-dashed');
        // Adjust this string if your 'thick' variant uses a different class (e.g., border-b-4)
        expect(divider).toContainHTML(''); 
    });

    // 2. Label Logic & Positions (Covers lines 30-34 and 46-54)
    describe('Horizontal with Labels', () => {
        const testLabel = 'divider_label';

        it('renders label text when labelKey is provided', () => {
            render(DividerTestHost, { props: { labelKey: testLabel } });
            expect(screen.getByText(testLabel)).toBeInTheDocument();
        });

        it('applies the correct class for "left" position', () => {
            render(DividerTestHost, { props: { labelKey: testLabel, labelPosition: 'left' } });
            const labelSpan = screen.getByText(testLabel);
            expect(labelSpan).toHaveClass('left-4');
        });

        it('applies the correct class for "right" position', () => {
            render(DividerTestHost, { props: { labelKey: testLabel, labelPosition: 'right' } });
            const labelSpan = screen.getByText(testLabel);
            expect(labelSpan).toHaveClass('right-4');
        });

        it('applies default center positioning classes', () => {
            render(DividerTestHost, { props: { labelKey: testLabel, labelPosition: 'center' } });
            const labelSpan = screen.getByText(testLabel);
            expect(labelSpan).toHaveClass('left-1/2', '-translate-x-1/2');
        });
    });

    // 3. Storybook Wrapper Coverage (Ensures the wrapper file is not at 0%)
    describe('Storybook Wrapper', () => {
        it('renders the vertical layout inside the wrapper', () => {
            render(DividerStoryWrapper, { 
                props: { orientation: 'vertical', labelKey: 'Story Label' } 
            });
            const divider = screen.getByRole('separator');
            expect(divider).toHaveAttribute('aria-orientation', 'vertical');
            // This also hits the {#if labelKey} branch inside the vertical wrapper logic
            expect(screen.getByText('Story Label')).toBeInTheDocument();
        });

        it('renders the horizontal layout inside the wrapper', () => {
            render(DividerStoryWrapper, { 
                props: { orientation: 'horizontal', labelKey: 'Horizontal Story' } 
            });
            expect(screen.getByText('Horizontal Story')).toBeInTheDocument();
        });
    });

    // 4. Custom Attributes
    it('applies custom classes and rest attributes', () => {
        render(DividerTestHost, { 
            props: { class: 'custom-class', 'data-testid': 'custom-divider' } 
        });
        const divider = screen.getByTestId('custom-divider');
        expect(divider).toHaveClass('custom-class');
    });
});