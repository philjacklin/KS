import Modal from './Modal.svelte';
import ModalStoryWrapper from './ModalStoryWrapper.svelte';
import ModalWithFormWrapper from './ModalWithFormWrapper.svelte';
import ModalDefaultWrapper from './ModalDefaultWrapper.svelte';
import { expect, userEvent, within } from '@storybook/test';

export default {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { 
      control: 'boolean',
      description: 'Controls the visibility of the modal. Set to `true` to show the modal and `false` to hide it.'
    },
    titleKey: { 
      control: 'text',
      description: 'The key for the title text in the internationalization store. This will be displayed as the modal\'s title.'
    },
    children: {
      control: false,
      description: 'The content to be displayed inside the modal. This is handled via wrapper components in Storybook.'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'A modal component that can be used to display content in a layer above the main page. It includes focus trapping and ARIA attributes for accessibility.'
      }
    }
  }
};

export const Default = {
  render: (args) => ({
    Component: ModalDefaultWrapper,
    props: {
        ...args,
        content: "This is the content of the modal." // Pass content as a simple string prop
    }
  }),
  args: {
    isOpen: true,
    titleKey: 'modal.default.title',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const modalTitle = await canvas.getByText('Default Modal Title');
    expect(modalTitle).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'This is the default state of the modal. It is open and displays a title and content.'
      }
    }
  }
};

export const Closed = {
    render: (args) => ({
        Component: ModalDefaultWrapper,
        props: {
            ...args,
            content: "This content is not visible."
        }
      }),
      args: {
        isOpen: false,
        titleKey: 'modal.closed.title',
      },
      play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const modalTitle = canvas.queryByText('Closed Modal Title');
        expect(modalTitle).not.toBeInTheDocument();
      },
      parameters: {
        docs: {
          description: {
            story: 'This is the closed state of the modal. The modal is not visible on the page.'
          }
        }
      }
};

export const LongContent = {
  render: (args) => ({
    Component: ModalStoryWrapper,
    props: args,
  }),
  args: {
    isOpen: true,
    titleKey: 'modal.long_content.title',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the modal handles a large amount of content. The content should be scrollable within the modal.'
      }
    }
  }
};

export const WithForm = {
    render: (args) => ({
        Component: ModalWithFormWrapper,
        props: args
    }),
    args: {
        isOpen: true,
        titleKey: 'modal.with_form.title',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const nameInput = await canvas.getByLabelText('Name');
        await userEvent.type(nameInput, 'Jane Doe', { delay: 100 });
        expect(nameInput).toHaveValue('Jane Doe');

        const emailInput = await canvas.getByLabelText('Email Address');
        await userEvent.type(emailInput, 'jane.doe@example.com', { delay: 100 });
        expect(emailInput).toHaveValue('jane.doe@example.com');
    },
    parameters: {
        docs: {
            description: {
                story: 'This story shows how a form can be embedded within the modal. The form elements should be focusable and interactive, and styled according to the design system.'
            }
        }
    }
}
