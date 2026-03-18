// src/lib/components/ui/toast/Toast.stories.js
import Toast from './Toast.svelte';
import TestIcon from './TestIcon.svelte';
import { fn } from '@storybook/test';
import { get } from 'svelte/store'; // <-- IMPORT THIS
import { t } from '$lib/stores/localeStore';

export default {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    message: { control: 'text' },
    title: { control: 'text' },
    duration: { control: 'number' },
    onDismiss: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: 'A component to display toast notifications.',
      },
    },
  },
};

export const Default = {
  args: {
    type: 'info',
    message: get(t)('toast.default_message'),
    onDismiss: fn(),
  },
};

export const Success = {
  args: {
    ...Default.args,
    type: 'success',
    message: get(t)('toast.success_message'),
    title: get(t)('toast.success_title'),
  },
};

export const Warning = {
  args: {
    ...Default.args,
    type: 'warning',
    message: get(t)('toast.warning_message'),
    title: get(t)('toast.warning_title'),
  },
};

export const Error = {
  args: {
    ...Default.args,
    type: 'error',
    message: get(t)('toast.error_message'),
    title: get(t)('toast.error_title'),
  },
};

export const WithTitle = {
  args: {
    ...Default.args,
    title: get(t)('toast.info_title'),
    message: get(t)('toast.message_with_title'),
  },
};

export const WithCustomIcon = {
  render: (args) => ({
    Component: Toast,
    props: {
      ...args,
      icon: TestIcon,
    },
  }),
  args: {
    ...Default.args,
    title: get(t)('toast.custom_icon_title'),
    message: get(t)('toast.message_with_custom_icon'),
  },
};

export const ShortDuration = {
  args: {
    ...Default.args,
    message: get(t)('toast.short_duration_message'),
    duration: 1500,
  },
};

