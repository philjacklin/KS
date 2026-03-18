import { tv } from 'tailwind-variants';

export const datePicker = tv({
  slots: {
    base: 'relative inline-block w-full',
    input: 'w-full px-md py-sm border border-payroll-teal/10 rounded-payroll bg-payroll-paper/50 text-payroll-teal placeholder:text-payroll-teal/50 focus:outline-none focus:ring-2 focus:ring-payroll-teal focus:border-transparent transition-all duration-200',
    calendar: 'absolute z-50 mt-sm bg-white border border-payroll-teal/10 rounded-payroll shadow-payroll p-md w-datepicker',
    header: 'flex justify-between items-center mb-md px-sm',
    navButton: 'p-sm hover:bg-payroll-paper text-payroll-teal rounded-full focus:outline-none focus:ring-2 focus:ring-payroll-teal transition-colors',
    grid: 'grid grid-cols-7 gap-xs text-center',
    weekday: 'text-xs font-semibold text-payroll-teal/70 mb-sm uppercase tracking-wider',
    day: 'p-sm text-sm rounded-md text-payroll-teal hover:bg-payroll-paper focus:outline-none focus:ring-2 focus:ring-payroll-teal cursor-pointer transition-colors',
    selectedDay: 'bg-payroll-teal text-white hover:bg-payroll-teal/90 font-medium shadow-payroll',
    today: 'font-bold text-payroll-teal bg-payroll-paper',
    otherMonth: 'text-payroll-teal/30 pointer-events-none'
  },
  variants: {
    error: {
      true: {
        input: 'border-payroll-destructive focus:ring-payroll-destructive bg-payroll-destructive/5'
      }
    }
  }
});
