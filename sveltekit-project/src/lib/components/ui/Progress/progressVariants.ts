import { tv } from 'tailwind-variants';

export const progressFillVariants = tv({
  base: 'h-full rounded-payroll transition-all duration-500 ease-in-out',
  variants: {
    status: {
      error: 'bg-red-500',
      success: 'bg-green-500',
    },
    isIndeterminate: {
      true: 'animate-indeterminate',
    },
  },
  defaultVariants: {
    status: undefined, // No default status
    isIndeterminate: false,
  },
  compoundVariants: [
    {
      status: undefined,
      isIndeterminate: false,
      class: 'bg-payroll-teal',
    },
  ],
});

export const progressStepVariants = tv({
  base: 'h-2 w-2 rounded-full',
  variants: {
    state: {
      complete: 'bg-payroll-teal',
      current: 'bg-payroll-gold',
      upcoming: 'bg-payroll-teal/20',
    },
  },
});
