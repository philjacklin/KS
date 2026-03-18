import Link from './Link.svelte';
import { createRawSnippet } from 'svelte';

export default {
  title: 'UI/Link',
  component: Link,
  tags: ['autodocs'],
  // This render function is the secret sauce for Svelte 5 snippets in Storybook
  render: (args) => ({
    Component: Link,
    props: {
      ...args,
      children: createRawSnippet(() => ({
        render: () => `<span>${args.label || 'Link Text'}</span>`
      }))
    }
  }),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    href: { control: 'text' },
    external: { control: 'boolean' },
    label: { control: 'text' }
  },
};

export const Primary = {
  args: {
    href: '/',
    variant: 'primary',
    label: 'Primary Link',
  },
};

export const Secondary = {
  args: {
    href: '/',
    variant: 'secondary',
    label: 'Secondary Link',
  },
};

export const External = {
  args: {
    href: 'https://google.com',
    external: true,
    label: 'External Link',
  },
};