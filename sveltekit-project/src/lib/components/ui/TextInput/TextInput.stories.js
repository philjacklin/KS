import TextInput from './TextInput.svelte';

export default {
  title: 'UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: ['default', 'error']
      }
    }
  }
};

export const Default = {
  args: {
    id: 'text-input-default',
    label: 'Default Text Input',
    placeholder: 'Enter text...'
  }
};

export const WithPrefix = {
    args: {
        id: 'prefix-test',
        name: 'prefix-test',
        prefix: '$', // This string now works thanks to the hybrid fix above
        placeholder: '0.00'
    }
};

export const WithSuffix = {
  args: {
    id: 'text-input-suffix',
    label: 'Text Input with Suffix',
    placeholder: 'Enter weight',
    suffix: 'kg'
  }
};

export const WithPrefixAndSuffix = {
  args: {
    id: 'text-input-prefix-suffix',
    label: 'Text Input with Prefix and Suffix',
    placeholder: 'Enter price',
    prefix: '$',
    suffix: '/kg'
  }
};

export const Error = {
  args: {
    id: 'text-input-error',
    label: 'Error Text Input',
    placeholder: 'Invalid input',
    state: 'error',
    errorMessage: 'This field is required.'
  }
};

export const Disabled = {
  args: {
    id: 'text-input-disabled',
    label: 'Disabled Text Input',
    placeholder: 'Cannot edit',
    disabled: true
  }
};
