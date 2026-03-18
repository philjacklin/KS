import { tv } from 'tailwind-variants';

export const dropdownMenuVariants = tv({
	base: 'bg-white rounded-payroll shadow-payroll border border-payroll-teal/5 py-xs z-50 min-w-48 overflow-hidden',
	variants: {
		size: {
			default: 'text-sm',
			small: 'text-xs',
			large: 'text-base'
		}
	},
	defaultVariants: {
		size: 'default'
	}
});

export const dropdownMenuItemVariants = tv({
	base: 'w-full text-left px-md py-sm hover:bg-payroll-teal/5 transition-colors cursor-pointer text-payroll-teal/80 hover:text-payroll-teal focus:outline-none focus:bg-payroll-teal/5 disabled:opacity-50 disabled:pointer-events-none',
	variants: {
		active: {
			true: 'bg-payroll-teal/5 text-payroll-teal font-medium',
			false: ''
		},
		variant: {
			default: '',
			danger: 'text-payroll-destructive hover:bg-payroll-destructive/5 hover:text-payroll-destructive/90'
		}
	},
	defaultVariants: {
		active: false,
		variant: 'default'
	}
});

export const dropdownMenuTriggerVariants = tv({
	base: 'inline-flex items-center justify-center rounded-payroll font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-payroll-teal disabled:pointer-events-none disabled:opacity-50'
});
