import { tv } from 'tailwind-variants';

export const checkboxVariants = tv({
  slots: {
    wrapper: 'flex items-center',
    input: [
      'h-md w-md rounded-md border-2',
      'border-payroll-teal/30',
      'text-payroll-teal focus:ring-payroll-teal',
      'transition-colors duration-200',
      'checked:bg-payroll-teal checked:border-payroll-teal',
      'focus:border-payroll-teal',
    ],
    label: 'ml-sm block text-sm font-medium text-payroll-teal',
  },
});
