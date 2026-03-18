// src/stories/VisuallyHidden.stories.svelte
import type { Meta, StoryObj } from '@storybook/svelte';
import VisuallyHidden from '$lib/components/ui/VisuallyHidden/VisuallyHidden.svelte';
import { t } from "$lib/stores/localeStore";
// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'UI/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'], // Optional: enables automatic documentation generation
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span', 'a'],
      description: 'The HTML element to render as.',
    },
  },
} satisfies Meta<VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story that includes context for the developer
export const Default: Story = {
  args: {
    as: 'div',
    children: 'This text is visually hidden but accessible to screen readers.' 
},
  render: (args) => ({
    Component: VisuallyHidden,
    props: args,
    template: `
      <div>
        <p>
          {t('stories.visuallyHidden.default.description', { default: 'This story demonstrates the VisuallyHidden component. The text inside the component is not visible on the screen, but it will be read by screen readers.' })}
        </p>
        <VisuallyHidden as={args.as} href={args.href}>
          {args.children}
        </VisuallyHidden>
      </div>
    `
  })
};

export const AsSpan: Story = {
    args: {
        ...Default.args,
        as: 'span',
    },
    render: Default.render
};

export const AsLink: Story = {
    args: {
        ...Default.args,
        as: 'a',
        href: '#',
        children: 'This is a visually hidden link.'
    },
    render: Default.render
};

export const WithText: Story = {
  args: {
    children: 'This is some visually hidden text.'
  },
  render: (args) => ({
    Component: VisuallyHidden,
    props: args,
    template: `
      <div>
        <p>'This story renders the VisuallyHidden component with simple text content.'</p>
        <VisuallyHidden>{args.children}</VisuallyHidden>
      </div>
    `
  })
};
