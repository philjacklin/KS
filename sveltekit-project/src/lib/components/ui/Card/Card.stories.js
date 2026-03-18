import Card from './Card.svelte';
import CardStoryWrapper from './CardStoryWrapper.svelte';

export default {
  title: 'UI/Card',
  component: Card, // Keep for autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'outline']
      }
    },
    contentKey: {
        control: 'text',
        description: 'The i18n key for the content inside the card.'
    }
  }
};

const render = (args) => ({
  Component: CardStoryWrapper,
  props: args,
});

export const Default = {
  render,
  args: {
    variant: 'default',
    contentKey: 'card.default_text' // Use i18n key
  }
};

export const Outline = {
  render,
  args: {
    variant: 'outline',
    contentKey: 'card.outline_text' // Use i18n key
  }
};
