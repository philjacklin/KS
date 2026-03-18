import { tv } from 'tailwind-variants';

export const modalVariants = tv({
  slots: {
    base: 'bg-payroll-paper rounded-payroll shadow-payroll p-xl max-w-container-xl border border-payroll-teal/5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    title: 'text-2xl font-semibold text-payroll-teal mb-md',
  }
});
