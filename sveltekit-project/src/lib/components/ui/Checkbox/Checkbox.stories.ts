import type { Meta, StoryObj } from '@storybook/svelte';
import Checkbox from '$lib/components/ui/Checkbox/Checkbox.svelte';

const meta = {
    title: 'UI/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'The checked state of the checkbox. Can be true, false, or "indeterminate".'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled.'
        },
        className: {
            control: 'text',
            description: 'Custom classes to apply to the checkbox.'
        }
    }
} satisfies Meta<Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
    args: {
        checked: false,
        disabled: false
    }
};

export const Checked: Story = {
    args: {
        checked: true,
        disabled: false
    }
};

export const Indeterminate: Story = {
    args: {
        checked: 'indeterminate',
        disabled: false
    }
};

export const DisabledUnchecked: Story = {
    args: {
        checked: false,
        disabled: true
    }
};

export const DisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true
    }
};

export const DisabledIndeterminate: Story = {
    args: {
        checked: 'indeterminate',
        disabled: true
    }
};
