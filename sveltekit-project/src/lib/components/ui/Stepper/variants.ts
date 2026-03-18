import { tv } from 'tailwind-variants';

export const stepperVariants = tv({
  slots: {
    root: 'w-full',
    list: 'flex items-center w-full',
    item: 'flex items-center',
    step: 'flex items-center group',
    icon: 'flex items-center justify-center w-2xl h-2xl rounded-full border-2 font-semibold transition-all duration-200',
    label: 'ml-md text-sm font-semibold tracking-crisp uppercase transition-colors duration-200'
  },
  variants: {
    state: {
      active: {
        icon: 'border-payroll-teal bg-payroll-teal text-white shadow-payroll',
        label: 'text-payroll-teal'
      },
      inactive: {
        icon: 'border-payroll-teal/10 bg-white text-payroll-teal/40',
        label: 'text-payroll-teal/40'
      },
      completed: {
        icon: 'border-payroll-teal bg-payroll-paper text-payroll-teal',
        label: 'text-payroll-teal'
      }
    }
  }
});
