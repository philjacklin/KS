import { tv } from 'tailwind-variants';

export const spinnerVariants = tv({
  base: 'animate-spin',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    },
    color: {
      current: 'text-current',
      primary: 'text-payroll-teal',
      secondary: 'text-payroll-gold',
      highlight: 'text-payroll-cyan',
      white: 'text-white',
      black: 'text-black',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
});
