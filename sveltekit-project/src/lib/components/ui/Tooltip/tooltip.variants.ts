import { tv } from 'tailwind-variants';

export const tooltipVariants = tv({
  base: [
    'absolute',
    'z-10',
    'px-md',
    'py-xs',
    'text-sm',
    // Design Standard Alignment
    'bg-payroll-teal',
    'text-payroll-paper',
    'rounded-md', // 8px radius
    'shadow-payroll'
  ],
});

export const arrowVariants = tv({
    base: [
        'absolute h-sm w-sm rotate-45 bg-inherit border-inherit',
        'visible'
    ]
});
