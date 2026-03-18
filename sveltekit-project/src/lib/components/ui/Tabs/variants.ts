import { tv } from 'tailwind-variants';

export const tabVariants = tv({
  base: 'py-sm px-md text-sm font-medium rounded-t-md focus:outline-none focus-visible:ring-2 focus-visible:ring-payroll-teal transition-colors',
  variants: {
    isActive: {
      true: 'border-b-2 border-payroll-teal text-payroll-teal',
      false: 'text-payroll-teal/60 hover:text-payroll-teal cursor-pointer'
    }
  },
  defaultVariants: {
    isActive: false
  }
});
