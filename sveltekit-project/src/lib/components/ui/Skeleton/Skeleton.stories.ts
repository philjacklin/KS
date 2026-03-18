import type { Meta, StoryObj } from '@storybook/svelte';
import Skeleton from './Skeleton.svelte';
import SkeletonTestWrapper from './SkeletonTestWrapper.svelte';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['circle', 'text', 'rectangle'],
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none'],
    },
    width: {
      control: { type: 'text' },
      description: 'Tailwind width class (e.g., w-32, w-full)',
    },
    height: {
      control: { type: 'text' },
      description: 'Tailwind height class (e.g., h-4, h-32)',
    },
    class: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: 'rectangle',
    width: 'w-32',
    height: 'h-8',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 'w-16',
    height: 'h-16',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    width: 'w-full',
    height: 'h-4',
  },
};

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    width: 'w-64',
    height: 'h-32',
  },
};

export const PulseAnimation: Story = {
  args: {
    animation: 'pulse',
    variant: 'rectangle',
    width: 'w-64',
    height: 'h-32',
  },
};

export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    variant: 'rectangle',
    width: 'w-64',
    height: 'h-32',
  },
};

export const NoAnimation: Story = {
  args: {
    animation: 'none',
    variant: 'rectangle',
    width: 'w-64',
    height: 'h-32',
  },
};

export const CustomDimensions: Story = {
  args: {
    variant: 'rectangle',
    width: 'w-[250px]', // Valid arbitrary Tailwind width
    height: 'h-[120px]', // Valid arbitrary Tailwind height
  },
};

export const CustomClass: Story = {
  render: (args) => ({
    Component: SkeletonTestWrapper,
    props: args,
  }),
  args: {
    variant: 'rectangle',
    width: 'w-32',
    height: 'h-8',
    class: 'bg-red-500 rounded-xl shadow-lg', // Overriding styles via custom class
  },
};