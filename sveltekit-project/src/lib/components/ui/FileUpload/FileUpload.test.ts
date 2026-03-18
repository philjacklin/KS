import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import FileUpload from './FileUpload.svelte';
import userEvent from '@testing-library/user-event';

// Mock the localeStore
vi.mock('$lib/stores/localeStore', () => {
  return {
    t: {
      subscribe: (fn: (value: (key: string) => string) => void) => {
        fn((key: string) => key);
        return () => {};
      }
    }
  };
});

describe('FileUpload', () => {
  // Use a fresh spy for every test to avoid carry-over counts
  let clickSpy: any;

  beforeEach(() => {
    clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click');
  });

  afterEach(() => {
    clickSpy.mockRestore();
  });

  it('triggers file picker on keypress (Enter/Space)', async () => {
    render(FileUpload);
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });

    await fireEvent.keyDown(dropzone, { key: 'Enter' });
    expect(clickSpy).toHaveBeenCalledTimes(1);

    // Reset for the second key check
    clickSpy.mockClear();

    await fireEvent.keyDown(dropzone, { key: ' ' });
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', async () => {
    render(FileUpload, { disabled: true });
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });
    
    await fireEvent.click(dropzone);
    expect(clickSpy).not.toHaveBeenCalled();
    
    await fireEvent.keyDown(dropzone, { key: 'Enter' });
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('renders with default state', () => {
    render(FileUpload);
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });
    expect(dropzone).toBeInTheDocument();
    expect(screen.getByText('file_upload.click_to_upload')).toBeInTheDocument();
    expect(screen.getByText('file_upload.or_drag_and_drop')).toBeInTheDocument();
    expect(screen.getByText('file_upload.supported_formats')).toBeInTheDocument();
    
    // Check default classes
    expect(dropzone).toHaveClass('border-payroll-teal/20');
    expect(dropzone).not.toHaveClass('border-red-500');
    expect(dropzone).not.toHaveClass('border-payroll-teal'); // dragover state
  });

  it('triggers file picker on click', async () => {
    const user = userEvent.setup();
    render(FileUpload);
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });
    
    // Mock click on input
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click');
    
    await user.click(dropzone);
    expect(clickSpy).toHaveBeenCalled();
  });


  it('changes visual style during drag events', async () => {
    render(FileUpload);
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });

    await fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass('border-payroll-teal');
    expect(dropzone).toHaveClass('bg-payroll-teal/5');

    await fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass('border-payroll-teal');
    expect(dropzone).not.toHaveClass('bg-payroll-teal/5');
  });

  it('validates file extension', async () => {
    const onUpload = vi.fn();
    render(FileUpload, { onUpload, accept: '.pdf' });
    
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });

    // Simulate drop
    const event = createDragEvent('drop', { files: [file] });
    await fireEvent(dropzone, event);

    expect(screen.getByText('file_upload.error.invalid_type')).toBeInTheDocument();
    expect(onUpload).not.toHaveBeenCalled();
  });

  it('validates file size', async () => {
    const onUpload = vi.fn();
    render(FileUpload, { onUpload, maxSize: 100 }); // 100 bytes
    
    const file = new File(['a'.repeat(101)], 'test.pdf', { type: 'application/pdf' });
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });

    // Simulate drop
    const event = createDragEvent('drop', { files: [file] });
    await fireEvent(dropzone, event);

    expect(screen.getByText('file_upload.error.file_too_large')).toBeInTheDocument();
    expect(onUpload).not.toHaveBeenCalled();
  });

  it('prioritizes error message logic', async () => {
    render(FileUpload, { maxSize: 100 });
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });
    
    // Trigger error
    const file = new File(['a'.repeat(101)], 'test.pdf', { type: 'application/pdf' });
    const dropEvent = createDragEvent('drop', { files: [file] });
    await fireEvent(dropzone, dropEvent);
    
    expect(dropzone).toHaveClass('border-red-500'); // Error state
    
    // Now drag over
    await fireEvent.dragEnter(dropzone);
    
    // Should still be error state visually
    expect(dropzone).toHaveClass('border-red-500');
    expect(dropzone).not.toHaveClass('border-payroll-teal'); // dragover style
  });

  it('triggers onUpload with valid files', async () => {
    const onUpload = vi.fn();
    render(FileUpload, { onUpload, accept: '.pdf' });
    
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const dropzone = screen.getByRole('button', { name: 'file_upload.drop_zone_label' });

    const event = createDragEvent('drop', { files: [file] });
    await fireEvent(dropzone, event);

    expect(onUpload).toHaveBeenCalledWith(file);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

});

// Helper to create drag events with files
function createDragEvent(type: string, data: { files: File[] }) {
  const event = new Event(type, { bubbles: true });
  Object.defineProperty(event, 'dataTransfer', {
    value: {
      files: data.files,
      types: ['Files']
    }
  });
  return event;
}
