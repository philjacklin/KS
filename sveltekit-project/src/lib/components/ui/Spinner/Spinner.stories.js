import Spinner from './Spinner.svelte';
import { t } from '$lib/stores/localeStore';

/**
 * The Spinner component is used to indicate a loading state.
 * It comes in various sizes and colors.
 */
export default {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the spinner.',
    },
    color: {
      control: { type: 'select' },
      options: ['current', 'primary', 'secondary', 'highlight', 'white', 'black'],
      description: 'The color of the spinner.',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the spinner.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling.',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

/**
 * Default Spinner story.
 * Shows a medium-sized spinner with the default color and a translated loading label.
 */
export const Default = {
  args: {
    size: 'md',
    color: 'current',
    label: 'spinner.loading',
  },
};

/**
 * Small Spinner.
 */
export const Small = {
  args: {
    size: 'sm',
    label: 'spinner.loading',
  },
};

/**
 * Large Spinner.
 */
export const Large = {
  args: {
    size: 'lg',
    label: 'spinner.loading',
  },
};

/**
 * Primary colored Spinner.
 */
export const PrimaryColor = {
  args: {
    color: 'primary',
    label: 'spinner.loading',
  },
};

/**
 * Secondary colored Spinner.
 */
export const SecondaryColor = {
  args: {
    color: 'secondary',
    label: 'spinner.loading',
  },
};

/**
 * Highlight colored Spinner.
 */
export const HighlightColor = {
  args: {
    color: 'highlight',
    label: 'spinner.loading',
  },
};

/**
 * White Spinner (useful on dark backgrounds).
 */
export const WhiteSpinner = {
  args: {
    color: 'white',
    label: 'spinner.loading',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

/**
 * Black Spinner (useful on light backgrounds).
 */
export const BlackSpinner = {
  args: {
    color: 'black',
    label: 'spinner.loading',
  },
};

/**
 * Large Primary colored Spinner with a custom label.
 */
export const LargePrimaryWithCustomLabel = {
  args: {
    size: 'lg',
    color: 'primary',
    label: 'Loading important data...',
  },
};

/**
 * Small Highlight colored Spinner.
 */
export const SmallHighlight = {
  args: {
    size: 'sm',
    color: 'highlight',
    label: 'spinner.loading',
  },
};

/**
 * Medium Secondary colored Spinner with custom class.
 */
export const MediumSecondaryWithCustomClass = {
  args: {
    size: 'md',
    color: 'secondary',
    label: 'spinner.loading',
    className: 'border-2 border-dashed',
  },
};
