import StepperStory from './StepperStory.svelte';
import { fn } from '@storybook/test';

export default {
  title: 'UI/Stepper',
  component: StepperStory,
  argTypes: {
    activeStepIndex: {
      control: 'number',
      description: 'The index of the currently active step (starting from 0)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the root element',
    },
    steps: {
      control: 'object',
      description: 'The array of steps to display',
    },
    onFinish: {
      action: 'onFinish',
      description: 'Callback when the Finish button is clicked',
    }
  },
  args: {
    onFinish: fn(),
    steps: [
      { label: 'Review Payroll', description: 'Check employee hours' },
      { label: 'Calculate Kiwisaver', description: 'Determine contributions' },
      { label: 'Finalise Pay Run', description: 'Process payments' },
    ],
    activeStepIndex: 0,
  }
};

export const Default = {
  args: {
    activeStepIndex: 0,
  },
};

export const MiddleStep = {
  args: {
    activeStepIndex: 1,
  },
};

export const LastStep = {
  args: {
    activeStepIndex: 2,
  },
};

export const ManySteps = {
  args: {
    steps: [
      { label: 'Setup', description: 'Initial configuration' },
      { label: 'Employee Details', description: 'Personal information' },
      { label: 'Contract Type', description: 'Employment details' },
      { label: 'Payment Method', description: 'Bank account' },
      { label: 'Taxation', description: 'IRD details' },
      { label: 'Review', description: 'Final check' },
    ],
    activeStepIndex: 0,
  },
};

export const CustomStyling = {
  args: {
    className: 'border-2 border-payroll-teal/20 p-4 rounded-payroll',
    activeStepIndex: 0,
  }
};
