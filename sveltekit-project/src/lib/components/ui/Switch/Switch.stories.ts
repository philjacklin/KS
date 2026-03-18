import type { Meta, StoryObj } from '@storybook/svelte';
import Switch from '$lib/components/ui/Switch/Switch.svelte';
import SwitchWithLabel from './SwitchWithLabel.svelte';
import SwitchVariations from './SwitchVariations.svelte';

const meta: Meta<Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  render: (args) => ({
    Component: Switch,
    props: args,
  }),
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg'],
      description: 'The size of the switch.',
      table: {
        defaultValue: { summary: 'sm' }
      }
    },
    color: {
      control: { type: 'select' },
      options: ['secondary', 'success'],
      description: 'The color of the switch when checked.',
      table: {
        defaultValue: { summary: 'secondary' }
      }
    },
    checked: {
      control: 'boolean',
      description: 'The state of the switch.',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled.',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'The ARIA label for the switch.'
    }
  }
};

export default meta;
type Story = StoryObj<Switch>;

export const Default: Story = {
  args: {
    ariaLabel: 'Default Switch'
  }
};

export const Checked: Story = {
  args: {
    checked: true,
    ariaLabel: 'Checked Switch'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    ariaLabel: 'Disabled Switch'
  }
};

export const WithLabel: Story = {
  render: (args) => ({
    Component: SwitchWithLabel,
    props: args
  }),
  args: {
    id: 'notifications-switch',
    label: 'Enable Notifications',
    ariaLabel: 'Enable Notifications'
  }
};

export const Variations: Story = {
  render: () => ({
    Component: SwitchVariations
  })
};
