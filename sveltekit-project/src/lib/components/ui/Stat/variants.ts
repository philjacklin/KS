import { tv } from 'tailwind-variants';

export const statVariants = tv({
  slots: {
    root: 'flex flex-col border-l-2 pl-md',
    label: 'text-sm text-payroll-teal/60 block',
    value: 'text-2xl font-semibold text-payroll-teal tracking-crisp',
    trend: 'w-md h-md',
    valueContainer: 'flex items-center gap-sm',
  },
  variants: {
    variant: {
      default: {
        root: 'border-payroll-gold',
      },
      cyan: {
        root: 'border-payroll-cyan',
      },
    },
    trend: {
      up: {
        trend: 'text-status-approved',
      },
      down: {
        trend: 'text-status-failed',
      },
      neutral: {
        trend: 'text-payroll-teal/40',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
