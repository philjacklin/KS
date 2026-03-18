import { tv } from 'tailwind-variants';

export const breadcrumbVariants = tv({
  slots: {
    base: 'flex items-center space-x-2 text-sm text-payroll-teal/60',
    list: 'flex items-center list-none p-0 m-0',
    item: 'flex items-center',
    link: 'hover:text-payroll-teal transition-colors font-medium',
    separator: 'text-payroll-teal/30 mx-2',
    current: 'text-payroll-teal font-semibold'
  }
});
