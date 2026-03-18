import { tv } from 'tailwind-variants';

export const selectVariants = tv({
    slots: {
        button: 'flex items-center justify-between w-full px-md py-sm text-left bg-white border border-payroll-teal/20 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-payroll-teal disabled:bg-disabled disabled:cursor-not-allowed hover:border-payroll-teal/40',
        listbox: 'absolute z-10 w-full mt-xs overflow-hidden bg-white border border-payroll-teal/10 rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-100',
        option: 'relative px-md py-sm cursor-pointer select-none transition-colors duration-150 flex items-center justify-between text-sm',
        checkIcon: 'w-4 h-4 text-payroll-teal',
        searchInput: 'w-full px-sm py-xs text-sm border border-payroll-teal/10 rounded-md focus:outline-none focus:ring-2 focus:ring-payroll-teal bg-payroll-paper/50',
        clearButton: 'text-xs font-medium text-payroll-teal hover:underline decoration-2 underline-offset-4',
        noResults: 'px-md py-xl text-center text-sm text-payroll-teal/40 italic',
        dropdownIcon: 'w-5 h-5 ml-sm -mr-xs text-payroll-teal/40 transition-transform duration-200'
    },
    variants: {
        focused: {
            true: {
                option: 'bg-payroll-teal/10 text-payroll-teal'
            },
            false: {
                option: 'hover:bg-payroll-paper hover:text-payroll-teal'
            }
        },
        selected: {
            true: {
                option: 'bg-payroll-teal/5 text-payroll-teal font-bold'
            }
        },
        isOpen: {
            true: {
                dropdownIcon: 'rotate-180'
            }
        }
    },
    compoundVariants: [
        {
            focused: true,
            selected: true,
            class: {
                option: 'bg-payroll-teal/20'
            }
        }
    ]
});
