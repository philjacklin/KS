import ContainerStory from './ContainerTestHost.svelte';

export default {
  title: 'UI/Container',
  component: ContainerStory, // Use the wrapper here
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', null]
    }
  }
};

export const Default = {
  args: {
    text: 'This is the default container.',
    maxWidth: null
  }
};

export const Small = {
  args: {
    maxWidth: 'sm',
    text: 'Small Container'
  }
};

export const Medium = {
  args: {
    maxWidth: 'md',
    text: 'Medium Container'
  }
};

export const Large = {
  args: {
    maxWidth: 'lg',
    text: 'Large Container'
  }
};

export const ExtraLarge = {
  args: {
    maxWidth: 'xl',
    text: 'Extra Large Container'
  }
};