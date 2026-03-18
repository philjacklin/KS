import Select from './Select.svelte';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'mint', label: 'Mint' },
  { value: 'cherry', label: 'Cherry' }
];

export default {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections.'
    },
    options: {
      control: 'object',
      description: 'Array of options with value and label.'
    },
    value: {
      control: 'text',
      description: 'The selected value(s). Should be a string for single-select or an array of strings for multi-select.'
    },
    showSelectedCount: {
      control: 'boolean',
      description: 'Show the count of selected items in multi-select.'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality within the select dropdown.'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select component.'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected.'
    },
    change: {
      action: 'change',
      description: 'Event dispatched when the value changes. The event detail contains the new value.'
    }
  }
};

export const Default = {
  args: {
    options,
    placeholder: 'Select a flavor'
  }
};

export const SingleSelect = {
  args: {
    ...Default.args,
    value: 'vanilla'
  }
};

export const MultiSelect = {
  args: {
    ...Default.args,
    multiple: true,
    value: ['vanilla', 'chocolate']
  }
};
MultiSelect.argTypes = {
  value: {
    control: 'object'
  }
};

export const MultiSelectWithCount = {
  args: {
    ...MultiSelect.args,
    showSelectedCount: true
  }
};
MultiSelectWithCount.argTypes = {
    value: {
      control: 'object'
    }
};

export const Searchable = {
  args: {
    ...Default.args,
    searchable: true,
    placeholder: 'Search for a flavor'
  }
};

export const Disabled = {
  args: {
    ...Default.args,
    value: 'vanilla',
    disabled: true
  }
};
