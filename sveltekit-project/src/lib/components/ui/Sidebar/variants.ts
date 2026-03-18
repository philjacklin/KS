import { tv } from 'tailwind-variants';

export const sidebarVariants = tv({
  slots: {
    root: 'fixed top-0 left-0 h-full bg-payroll-paper border-r border-payroll-teal/10 transition-transform duration-300 ease-in-out z-40 w-sidebar',
    nav: 'h-full w-full flex flex-col',
  },
  variants: {
    isOpen: {
      true: {
        root: 'translate-x-0',
      },
      false: {
        root: '-translate-x-full lg:translate-x-0',
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});
