import { tv } from 'tailwind-variants';

export const fileUploadVariants = tv({
  base: 'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-payroll cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-payroll-teal',
  variants: {
    state: {
      default: 'border-payroll-teal/20 bg-payroll-paper hover:bg-payroll-paper/80 hover:border-payroll-teal/40',
      dragover: 'border-payroll-teal bg-payroll-teal/5',
      error: 'border-red-500 bg-red-50',
      disabled: 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50 pointer-events-none',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
