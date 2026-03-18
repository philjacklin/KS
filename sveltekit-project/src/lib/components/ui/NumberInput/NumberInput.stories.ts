import type { Meta, StoryObj } from '@storybook/svelte';
import { userEvent, within, expect } from '@storybook/test';
import NumberInput from './NumberInput.svelte';
import Wrapper from './Wrapper.svelte'; 

const meta = {
    title: 'UI/NumberInput',
    component: NumberInput,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['currency', 'tax-rate', 'default']
        },
        value: { control: 'number' },
        label: { control: 'text' },
        helpText: { control: 'text' },
        error: { control: 'boolean' },
        errorMessage: { control: 'text' },
        disabled: { control: 'boolean' },
        allowNegative: { control: 'boolean' },
        min: { control: 'number' },
        max: { control: 'number' }, // Updated from maxValue
        step: { control: 'number' }
    },
    render: (args) => ({
        Component: Wrapper,
        props: { ...args }
    }),
} satisfies Meta<NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 1. Default Currency Scenario
 */
export const Default: Story = {
    args: {
        type: 'currency',
        label: 'Balance Amount',
        value: 1234.56,
        helpText: 'Enter the current account balance.'
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByLabelText('Balance Amount') as HTMLInputElement;
        await expect(input.value).toBe('1,234.56');
    }
};

/**
 * 2. Tax Rate Scenario
 */
export const TaxRate: Story = {
    args: {
        type: 'tax-rate',
        label: 'GST Rate',
        value: 15,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByLabelText('GST Rate') as HTMLInputElement;
        await expect(input.value).toBe('15.00');

        await userEvent.clear(input);
        await userEvent.type(input, '12.5');
        await userEvent.tab(); 
        await expect(input.value).toBe('12.50');
    }
};

/**
 * 3. Min/Max Clamping & Step logic
 */
export const ClampingAndSteps: Story = {
    args: {
        label: 'Quantity (10-100)',
        value: 50,
        min: 10,
        max: 100, // Fixed prop name
        step: 10,
        helpText: 'Use arrow keys to increment by 10'
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByLabelText(/Quantity/i) as HTMLInputElement;

        // Test Max Clamping
        await userEvent.clear(input);
        await userEvent.type(input, '500');
        await userEvent.tab();
        await expect(input.value).toBe('100.00');

        // Test Keydown Step (ArrowUp)
        await userEvent.click(input);
        await userEvent.keyboard('{ArrowUp}');
        // Note: Logic allows 100 + 10, but then clamps back to 100
        await expect(input.value).toBe('100'); 
    }
};

/**
 * 4. Error State
 */
export const WithError: Story = {
    args: {
        label: 'Invalid Input',
        value: 0,
        error: true,
        errorMessage: 'The value entered is outside the permitted range.',
    }
};

/**
 * 5. Negative Values (Allowed)
 */
export const AllowNegative: Story = {
    args: {
        label: 'Negative Adjustment',
        value: -50,
        allowNegative: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByLabelText(/Negative/i) as HTMLInputElement;
        await userEvent.clear(input);
        await userEvent.type(input, '-75.5');
        await userEvent.tab();
        await expect(input.value).toBe('-75.50');
    }
};

/**
 * 6. Icons & Prefix Composition
 * This describes a "Percentage" style with a custom icon
 */
export const WithIcons: Story = {
    args: {
        label: 'Search by ID',
        placeholder: '0000',
        value: null,
    },
    render: (args) => ({
        Component: Wrapper,
        props: {
            ...args,
            leadingIconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        }
    })
};