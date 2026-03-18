import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { expect, test, vi, beforeEach } from 'vitest';
import ModalTestHost from './ModalTestHost.svelte';
import ModalStoryWrapper from './ModalStoryWrapper.svelte';
import ModalWithFormWrapper from './ModalWithFormWrapper.svelte';
import ModalDefaultWrapper from './ModalDefaultWrapper.svelte'; // Ensure this is created or imported
import TestHost from './TestHost.svelte';

// Mock store synchronously - no outer variables to avoid hoisting errors
vi.mock('$lib/stores/localeStore', () => ({
    t: { subscribe: (fn: any) => { fn((k: string) => k); return () => {}; } },
    locale: { subscribe: (fn: any) => { fn('en'); return () => {}; }, set: () => {} }
}));

beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function(this: HTMLDialogElement) {
        this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function(this: HTMLDialogElement) {
        this.open = false;
    });
});

test('should not render the dialog when isOpen is false', () => {
    render(ModalTestHost, { isOpen: false, titleKey: 'test.title' });
    expect(screen.queryByRole('dialog')).toBeNull();
});

test('should render the dialog when isOpen is true', () => {
    render(ModalTestHost, { isOpen: true, titleKey: 'test.title' });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
});

test('should render the title and content', () => {
    render(ModalTestHost, { isOpen: true, titleKey: 'test.title' });
    expect(screen.getByText('test.title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
});

test('should close the modal when the Escape key is pressed', async () => {
    const { rerender } = render(ModalTestHost, { isOpen: true });
    const dialog = screen.getByRole('dialog');
    
    await fireEvent.keyDown(dialog, { key: 'Escape' });

    await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull();
    });
});

test('should trap focus within the modal', async () => {
    render(ModalTestHost, { isOpen: true, contentType: 'form' });

    // Wait for Svelte 5 $effect to move focus
    await waitFor(() => {
        expect(document.activeElement?.getAttribute('data-testid')).toBe('modal-button');
    });

    const firstButton = screen.getByTestId('modal-button');
    const link = screen.getByText('Focusable 3');

    link.focus();
    await fireEvent.keyDown(link, { key: 'Tab' });
    expect(document.activeElement).toBe(firstButton);

    firstButton.focus();
    await fireEvent.keyDown(firstButton, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(link);
});

test('should return focus to the previously focused element on close', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(ModalTestHost, { isOpen: true, contentType: 'form' });

    await waitFor(() => {
        expect(document.activeElement).not.toBe(trigger);
    });

    await rerender({ isOpen: false });

    await waitFor(() => {
        expect(document.activeElement).toBe(trigger);
    });

    document.body.removeChild(trigger);
});

test('should apply custom className to the dialog', () => {
    render(ModalTestHost, { isOpen: true, className: 'my-custom-class' });
    expect(screen.getByRole('dialog')).toHaveClass('my-custom-class');
});

describe('Modal Wrappers Coverage', () => {
    test('ModalStoryWrapper renders long content when open', () => {
        render(ModalStoryWrapper, { isOpen: true, titleKey: 'story.title' });
        // This hits all 8 paragraph lines in modalstorywrapper.svelte
        expect(screen.getByText('modal.long_content.paragraph_1')).toBeInTheDocument();
        expect(screen.getByText('modal.long_content.paragraph_8')).toBeInTheDocument();
    });

    test('ModalWithFormWrapper renders form and handles submit', async () => {
        render(ModalWithFormWrapper, { isOpen: true, titleKey: 'form.title' });
        
        const nameLabel = screen.getByText('form.name_label');
        const submitBtn = screen.getByText('form.submit_button');
        
        expect(nameLabel).toBeInTheDocument();
        
        // This hits the onsubmit={(e) => e.preventDefault()} line
        await fireEvent.click(submitBtn); 
        expect(submitBtn).toBeInTheDocument(); // Component didn't crash/reload
    });

    test('TestHost.svelte triggers modal opening', async () => {
        render(TestHost);
        const trigger = screen.getByText('Open Modal');
        
        // Modal should be closed initially
        expect(screen.queryByRole('dialog')).toBeNull();
        
        // Click trigger to hit the isOpen = true branch
        await fireEvent.click(trigger);
        
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText('This is the modal content.')).toBeInTheDocument();
    });

    // If ModalDefaultWrapper is just a simple pass-through, hit it here
    test('ModalDefaultWrapper renders correctly', () => {
        render(ModalDefaultWrapper, { isOpen: true });
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});