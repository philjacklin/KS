import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  base: 'p-4 rounded-payroll shadow-payroll flex items-start space-x-4 border',
  variants: {
    type: {
      info: 'bg-payroll-paper border-payroll-teal text-payroll-teal',
      success: 'bg-payroll-teal/10 border-payroll-teal/50 text-payroll-teal',
      warning: 'bg-payroll-gold/20 border-payroll-gold text-payroll-teal',
      error: 'bg-red-100 border-red-500 text-red-700', // Using generic red as per review suggestion
    },
  },
  defaultVariants: {
    type: 'info',
  },
});
