import { tv } from 'tailwind-variants';

export const accordionVariants = tv({
  base: 'w-full divide-y divide-payroll-teal/10 overflow-hidden rounded-payroll border border-payroll-teal/10 bg-white shadow-payroll',
});

export const accordionItemVariants = tv({
  base: 'flex flex-col',
});

export const accordionHeaderVariants = tv({
  base: 'flex w-full items-center justify-between px-lg py-md text-left transition-colors hover:bg-payroll-paper/50 focus-visible:bg-payroll-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-payroll-teal',
  variants: {
    isOpen: {
      true: 'bg-payroll-paper/30',
      false: '',
    },
  },
});

export const accordionContentVariants = tv({
  base: 'grid transition-all duration-300 ease-in-out px-lg',
  variants: {
    isOpen: {
      true: 'grid-rows-[1fr] py-md opacity-100',
      false: 'grid-rows-[0fr] py-0 opacity-0 overflow-hidden',
    },
  },
});

export const accordionIconVariants = tv({
  base: 'h-5 w-5 text-payroll-teal transition-transform duration-200',
  variants: {
    isOpen: {
      true: 'rotate-180',
      false: 'rotate-0',
    },
  },
});
