import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar.svelte';
import '@testing-library/jest-dom';

describe('Avatar', () => {
    // AC 1: Correct image rendering from URL
    it('renders image when imageUrl is provided', () => {
        const imageUrl = 'https://example.com/avatar.jpg';
        const name = 'John Doe';
        render(Avatar, { props: { imageUrl, name } });
        
        const img = screen.getByRole('img').querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', imageUrl);
    });

    // AC 2: Correct initials display when no image is provided
    it('renders initials when no imageUrl is provided', () => {
        const name = 'John Doe';
        render(Avatar, { props: { name } });
        
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders single initial for one-word name', () => {
        render(Avatar, { props: { name: 'John' } });
        expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('renders first and last initials for multi-word name', () => {
        render(Avatar, { props: { name: 'John Middle Doe' } });
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders nothing for empty name', () => {
        render(Avatar, { props: { name: '' } });
        const container = screen.getByRole('img');
        const span = container.querySelector('span');
        expect(span?.textContent?.trim()).toBe('');
    });

    // AC 3: Fallback behavior on image load error
    it('renders initials when image fails to load', async () => {
        const imageUrl = 'https://example.com/invalid.jpg';
        const name = 'John Doe';
        render(Avatar, { props: { imageUrl, name } });
        
        const img = screen.getByRole('img').querySelector('img');
        expect(img).toBeInTheDocument();
        
        // Simulate image error
        await fireEvent.error(img!);
        
        expect(screen.queryByRole('img')?.querySelector('img')).not.toBeInTheDocument();
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    // AC 4: Default size of 40px
    it('has default size of 40px', () => {
        render(Avatar, { props: { name: 'John Doe' } });
        const container = screen.getByRole('img');
        expect(container).toHaveStyle('width: 40px');
        expect(container).toHaveStyle('height: 40px');
    });

    // AC 5: Custom size rendering
    it('renders with custom size', () => {
        render(Avatar, { props: { name: 'John Doe', size: '80px' } });
        const container = screen.getByRole('img');
        expect(container).toHaveStyle('width: 80px');
        expect(container).toHaveStyle('height: 80px');
        
        const fallback = screen.getByText('JD');
        // font-size: calc(80px / 2.5) = 32px
        expect(fallback).toHaveStyle('font-size: calc(80px / 2.5)');
    });

    // AC 6: Presence of the correct aria-label
    it('has correct aria-label', () => {
        const name = 'John Doe';
        render(Avatar, { props: { name } });
        const container = screen.getByRole('img');
        expect(container).toHaveAttribute('aria-label', name);
    });

    it('resets image error when imageUrl changes', async () => {
        const { rerender } = render(Avatar, { props: { imageUrl: 'error.jpg', name: 'John' } });
        const img = screen.getByRole('img').querySelector('img');
        await fireEvent.error(img!);
        expect(screen.getByText('J')).toBeInTheDocument();

        // Update according to deprecation notice
        await rerender({ imageUrl: 'new.jpg', name: 'John' });
        const newImg = screen.getByRole('img').querySelector('img');
        expect(newImg).toBeInTheDocument();
        expect(newImg).toHaveAttribute('src', 'new.jpg');
    });

    it('applies custom className', () => {
        render(Avatar, { props: { name: 'John', className: 'custom-class' } });
        const container = screen.getByRole('img');
        expect(container).toHaveClass('custom-class');
    });
});
