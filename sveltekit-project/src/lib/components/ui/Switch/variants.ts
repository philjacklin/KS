import { tv } from 'tailwind-variants';

export const switchVariants = tv({
  slots: {
    track: 'relative inline-flex flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-payroll-teal/10 bg-payroll-paper transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-payroll-teal',
    thumb: 'pointer-events-none inline-block transform rounded-full bg-white shadow-payroll ring-0 transition-transform duration-200 ease-in-out'
  },
  variants: {
    size: {
      sm: { track: 'h-lg w-2xl', thumb: 'h-md w-md' },
      lg: { track: 'h-xl w-4xl', thumb: 'h-lg w-lg' }
    },
    color: {
      secondary: { track: '' },
      success: { track: '' }
    },
    checked: {
      true: {
        track: 'border-transparent'
      },
      false: {
        track: 'bg-payroll-paper border-payroll-teal/10' 
      }
    },
    disabled: {
      true: {
        track: 'bg-disabled border-disabled-foreground cursor-not-allowed opacity-60',
        thumb: 'bg-disabled-foreground/20 shadow-none'
      }
    }
  },
  compoundVariants: [
    {
      checked: true,
      disabled: false,
      color: 'secondary',
      class: { track: 'bg-payroll-gold' }
    },
    {
      checked: true,
      disabled: false,
      color: 'success',
      class: { track: 'bg-payroll-teal' }
    },
    { size: 'sm', checked: false, class: { thumb: 'translate-x-xs' } },
    { size: 'sm', checked: true, class: { thumb: 'translate-x-lg' } },
    { size: 'lg', checked: false, class: { thumb: 'translate-x-xs' } },
    { size: 'lg', checked: true, class: { thumb: 'translate-x-xl' } }
  ],
  defaultVariants: {
    size: 'sm',
    color: 'secondary',
    checked: false,
    disabled: false
  }
});
