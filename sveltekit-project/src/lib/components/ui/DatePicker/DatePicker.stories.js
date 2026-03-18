import DatePicker from './DatePicker.svelte';
import { setLocale } from '$lib/stores/localeStore';

export default {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  // DECORATOR: Ensures the locale store is ready before the component renders
  decorators: [
    (Story) => {
      setLocale('en'); // or 'nz'
      return Story();
    },
  ],
  argTypes: {
    value: {
      control: 'date',
      description: 'The selected date value.',
      table: {
        type: { summary: 'Date | null' },
        defaultValue: { summary: 'null' },
      },
    },
    // ... rest of your argTypes stay the same
  },
};

// Svelte 5 Recommended: Use a render function to ensure $bindable props 
// sync correctly with the Storybook controls panel.
const Template = {
  render: (args) => ({
    Component: DatePicker,
    props: args,
  }),
};

export const Default = {
  ...Template,
  args: {
    // We don't necessarily need a hardcoded placeholder anymore 
    // because the component now pulls it from $t automatically
  },
};

export const WithValue = {
  ...Template,
  args: {
    // Storybook 'date' control sends a timestamp, 
    // DatePicker $effect handles the conversion to Date object
    value: new Date('2026-02-22'), 
  },
};

export const Disabled = {
  ...Template,
  args: {
    disabled: true,
    value: new Date('2026-02-22'),
  },
};

export const Error = {
  ...Template,
  args: {
    error: true,
  },
};

/**
 * NEW STORY: Locale Switching
 * This story demonstrates how the component reacts to store changes.
 */
export const KiwiLocale = {
  ...Template,
  decorators: [
    (Story) => {
      setLocale('nz');
      return Story();
    },
  ],
  args: {
    value: new Date(),
  },
};