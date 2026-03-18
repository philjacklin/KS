import AccordionStoryWrapper from './AccordionStoryWrapper.svelte';

export default {
  title: 'UI/Accordion',
  component: AccordionStoryWrapper,
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded at once',
    },
    value: {
      control: 'object',
      description: 'The IDs of the currently expanded items',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the accordion container',
    },
  },
};

export const Default = {
  args: {
    allowMultiple: false,
    value: [],
  },
};

export const MultipleSections = {
  args: {
    allowMultiple: false,
    value: [],
    items: [
      { id: 'section-1', header: 'accordion.section1.header', content: 'accordion.section1.content' },
      { id: 'section-2', header: 'accordion.section2.header', content: 'accordion.section2.content' },
      { id: 'section-3', header: 'accordion.section3.header', content: 'accordion.section3.content' },
      { id: 'section-4', header: 'accordion.section4.header', content: 'accordion.section4.content' },
    ],
  },
};

export const PreExpanded = {
  args: {
    allowMultiple: false,
    value: ['item-1'],
  },
};

export const MultipleExpanded = {
  args: {
    allowMultiple: true,
    value: ['item-1', 'item-3'],
  },
};
