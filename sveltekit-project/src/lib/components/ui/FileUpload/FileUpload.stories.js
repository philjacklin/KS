import FileUpload from './FileUpload.svelte';
import { userEvent, within, fireEvent } from '@storybook/test';

export default {
  title: 'UI/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    error: { control: 'text' },
    onUpload: { action: 'uploaded' },
  },
};

export const Default = {
  args: {
    accept: '.pdf,.csv,.xlsx',
    maxSize: 10485760, // 10MB
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const ErrorState = {
  args: {
    error: 'Invalid file type',
  },
};

export const DragOver = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropzone = canvas.getByRole('button');
    await fireEvent.dragEnter(dropzone);
    await fireEvent.dragOver(dropzone);
  },
};

export const InvalidType = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropzone = canvas.getByRole('button');
    
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const dataTransfer = {
      files: [file],
      types: ['Files'],
    };
    
    await fireEvent.drop(dropzone, { dataTransfer });
  },
};

export const FileTooLarge = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropzone = canvas.getByRole('button');
    
    const file = new File([''], 'large.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: 20 * 1024 * 1024 }); // 20MB
    
    const dataTransfer = {
      files: [file],
      types: ['Files'],
    };
    
    await fireEvent.drop(dropzone, { dataTransfer });
  },
};
