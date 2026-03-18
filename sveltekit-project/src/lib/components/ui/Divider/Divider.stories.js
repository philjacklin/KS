import DividerStoryWrapper from './DividerStoryWrapper.svelte';

export default {
  title: 'UI/Divider',
  component: DividerStoryWrapper,
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    thickness: {
      control: { type: 'select' },
      options: ['thin', 'normal', 'thick', 'thicker', 'thickest'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'teal', 'gold', 'cyan'],
    },
    dashed: {
      control: { type: 'boolean' },
    },
    labelKey: {
      control: { type: 'text' },
    }
  },
};

export const Default = {
  args: {},
};

export const Vertical = {
  args: {
    orientation: 'vertical',
  },
};

export const WithLabel = {
  args: {
    labelKey: 'divider.label_default',
  },
};

export const LabelLeft = {
  args: {
    labelKey: 'divider.label_left',
    labelPosition: 'left',
  },
};

export const LabelCenter = {
  args: {
    labelKey: 'divider.label_center',
    labelPosition: 'center',
  },
};

export const LabelRight = {
  args: {
    labelKey: 'divider.label_right',
    labelPosition: 'right',
  },
};

export const Thick = {
  args: {
    thickness: 'thick',
  },
};

export const GoldColor = {
  args: {
    color: 'gold',
  },
};

export const Dashed = {
  args: {
    dashed: true,
    labelKey: 'divider.label_dashed',
  },
};
