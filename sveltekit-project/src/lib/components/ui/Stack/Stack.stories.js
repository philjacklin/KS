import Stack from '$lib/components/ui/stack/Stack.svelte';
import StackWrapper from './StackWrapper.svelte';

export default {
  title: 'UI/Stack',
  component: StackWrapper, // We point to the wrapper, not the raw component
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'],
    },
  },
};

export const Default = {
  args: {
    direction: 'vertical',
    spacing: 'md',
  },
};

export const Horizontal = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    align: 'center',
  },
};

export const JustifyBetween = {
  args: {
    direction: 'horizontal',
    justify: 'between',
    spacing: 'md',
    // We add a class here so you can see the "between" spacing work
    class: 'w-full border border-dashed border-gray-300 p-4'
  },
};

export const WithCustomClass = {
  args: {
    class: 'bg-gray-50 p-6 rounded-xl border-2 border-teal-500',
    spacing: 'lg'
  },
};