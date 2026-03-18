import { tv } from 'tailwind-variants';

export const navbarVariants = tv({
  slots: {
    nav: 'bg-payroll-paper w-full border-b border-payroll-teal/10 relative z-50',
    container: 'container mx-auto px-md h-16 flex items-center justify-between',
    desktopLinks: 'hidden md:flex items-center space-x-xl',
    mobileMenu: 'absolute top-full left-0 w-full bg-payroll-paper border-b border-payroll-teal/10 md:hidden flex flex-col p-md space-y-md shadow-payroll',
    hamburger: 'md:hidden p-sm text-payroll-teal hover:bg-payroll-teal/5 rounded-payroll transition-colors',
    link: 'text-payroll-teal font-medium hover:text-payroll-cyan transition-colors',
  },
});
