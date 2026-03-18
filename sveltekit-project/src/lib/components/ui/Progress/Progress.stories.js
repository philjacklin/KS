import ProgressStoryWrapper from './ProgressStoryWrapper.svelte';

/**
 * @type {import('@storybook/svelte').Meta}
 */
const meta = {
  component: ProgressStoryWrapper,
  title: 'UI/Progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number', description: 'The current value of the progress bar.' },
    max: { control: 'number', description: 'The maximum value of the progress bar.' },
    label: { control: 'text', description: 'The label for the progress bar.' },
    showLabel: { control: 'boolean', description: 'Whether to display the label.' },
    status: {
      control: 'select',
      options: [undefined, 'error', 'success'],
      description: 'The status of the progress bar (error or success).',
    },
    isIndeterminate: { control: 'boolean', description: 'Whether the progress is indeterminate.' },
    steps: { control: 'number', description: 'The total number of steps for a step progress bar.' },
    currentStep: { control: 'number', description: 'The current active step for a step progress bar.' },
    className: { control: 'text', description: 'Additional CSS classes for the component.' },
  },
};

export default meta;

export const Default = {
  args: {
    value: 50,
    max: 100,
  },
};

export const WithLabel = {
  args: {
    value: 75,
    max: 100,
    label: 'progress.uploading_files',
    showLabel: true,
  },
};

export const ErrorStatus = {
  args: {
    value: 30,
    max: 100,
    status: 'error',
    label: 'progress.upload_failed',
    showLabel: true,
  },
};

export const SuccessStatus = {
  args: {
    value: 100,
    max: 100,
    status: 'success',
    label: 'progress.upload_complete', // Fixed: removed t()
    showLabel: true,
  },
};

export const Indeterminate = {
  args: {
    isIndeterminate: true,
    label: 'progress.loading', // Fixed: removed t()
    showLabel: true,
  },
};

export const StepProgress = {
  args: {
    steps: 5,
    currentStep: 2,
    label: 'progress.step_label', // Fixed: removed t()
    showLabel: true,
  },
};

export const StepProgressComplete = {
  args: {
    steps: 4,
    currentStep: 4,
    label: 'progress.step_complete', // Fixed: removed t()
    showLabel: true,
  },
};

export const StepProgressUpcoming = {
  args: {
    steps: 3,
    currentStep: 0,
    label: 'progress.step_upcoming', // Fixed: removed t()
    showLabel: true,
  },
};