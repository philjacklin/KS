import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  base: [
    'border',
    'bg-white',
    'text-payroll-teal',
    'rounded-payroll',
    'shadow-payroll',
    'p-xl' // Use xl token for 32px padding
  ],
  variants: {
    variant: {
      default: 'border-payroll-teal/5',
      outline: 'border-2 border-payroll-gold'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
