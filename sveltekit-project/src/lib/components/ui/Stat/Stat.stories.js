import StatStoryWrapper from './StatStoryWrapper.svelte';

/**
 * The Stat component is used to display key financial metrics, such as payroll totals,
 * taxes, and other numeric data with optional trend indicators.
 * * In this Storybook, we use a wrapper to demonstrate internationalization.
 * * @type {import('@storybook/svelte').Meta}
 */
const meta = {
  title: 'UI/Stat',
  component: StatStoryWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component for displaying numeric statistics with labels and trend indicators.',
      },
    },
  },
  argTypes: {
    labelKey: { 
      control: 'text',
      description: 'The translation key for the label displayed above the value.',
    },
    value: { 
      control: 'number',
      description: 'The numeric value to display.',
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral', undefined],
      description: 'The trend direction indicator.',
    },
    variant: {
      control: 'select',
      options: ['default', 'cyan'],
      description: 'The visual variant of the stat indicator.',
    },
    currency: { 
      control: 'text',
      description: 'The currency code (e.g., USD, NZD).',
    },
    locale: { 
      control: 'text',
      description: 'The locale for numeric formatting (e.g., en-US, en-NZ).',
    },
    ariaLabelKey: { 
      control: 'text',
      description: 'The translation key for the aria-label of the stat section.',
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes to apply to the stat component.',
    },
  },
};

export default meta;

/**
 * Default Stat component showing a standard payroll metric.
 */
export const Default = {
  args: {
    labelKey: 'stat.total_payroll',
    value: 12450.80,
  },
};

/**
 * Stat component showing an upward trend (e.g., increase in net pay).
 */
export const TrendingUp = {
  args: {
    labelKey: 'stat.net_pay',
    value: 9320.45,
    trend: 'up',
  },
};

/**
 * Stat component showing a downward trend (e.g., decrease in tax liability).
 */
export const TrendingDown = {
  args: {
    labelKey: 'stat.tax_amount',
    value: 3130.35,
    trend: 'down',
  },
};

/**
 * Stat component showing a neutral trend.
 */
export const TrendingNeutral = {
  args: {
    labelKey: 'stat.gross_pay',
    value: 15581.15,
    trend: 'neutral',
  },
};

/**
 * Stat component using the "cyan" variant, often used for secondary highlights.
 */
export const CyanVariant = {
  args: {
    labelKey: 'stat.bonus_amount',
    value: 500.00,
    variant: 'cyan',
    trend: 'up',
  },
};

/**
 * Demonstrates the Stat component with NZ-specific locale and currency formatting.
 */
export const NZFormatting = {
  args: {
    labelKey: 'stat.kiwisaver_total',
    value: 1250.50,
    currency: 'NZD',
    locale: 'en-NZ',
    trend: 'up',
  },
};

/**
 * Demonstrates the Stat component with a custom CSS class.
 */
export const CustomClass = {
  args: {
    labelKey: 'stat.total_payroll',
    value: 12450.80,
    className: 'bg-payroll-teal/5 p-4 rounded-payroll',
  },
};