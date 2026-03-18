import Typography from './Typography.svelte';

export default {
  title: 'UI/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'body-large', 'small', 'caption']
    },
    color: {
      control: 'select',
      // These options now map correctly via the component logic above
      options: ['primary', 'secondary', 'teal', 'gold', 'cyan', 'destructive']
    },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
    delete: { control: 'boolean' }
  }
};

export const Default = {
  args: {
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const H1 = {
  args: {
    variant: 'h1',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const H2 = {
  args: {
    variant: 'h2',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const H3 = {
  args: {
    variant: 'h3',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const H4 = {
  args: {
    variant: 'h4',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const BodyLarge = {
  args: {
    variant: 'body-large',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const Small = {
  args: {
    variant: 'small',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const Caption = {
  args: {
    variant: 'caption',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const Italic = {
  args: {
    italic: true,
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const Underline = {
  args: {
    underline: true,
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const Delete = {
  args: {
    delete: true,
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const Secondary = {
  args: {
    color: 'secondary',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const Tertiary = {
  args: {
    color: 'tertiary',
    children: () => 'The quick brown fox jumps over the lazy dog.'
  }
};

export const ItalicSecondaryHeading = {
  args: {
    variant: 'h2',
    color: 'secondary',
    italic: true,
    children: () => 'A Combined Example'
  }
};
