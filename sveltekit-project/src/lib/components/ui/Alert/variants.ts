import { tv } from 'tailwind-variants';

export const alertVariants = tv({
  base: 'p-md rounded-payroll shadow-payroll border flex items-start gap-md',
  variants: {
    type: {
      info: 'bg-payroll-teal border-payroll-teal text-payroll-paper',
      success: 'bg-status-approved border-status-approved text-payroll-teal',
      warning: 'bg-status-destructive border-status-destructive text-payroll-paper',
      danger: 'bg-payroll-gold border-payroll-gold text-payroll-paper',
      error: 'bg-status-failed border-status-failed text-payroll-paper',
    },
    inline: {
      true: 'shadow-none border-0',
      false: 'mb-md'
    }
  },
  defaultVariants: {
    type: 'info',
    inline: false
  }
});
