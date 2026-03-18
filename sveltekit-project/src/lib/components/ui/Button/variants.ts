import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
	base: 'inline-flex items-center gap-2 justify-center rounded-payroll text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-payroll-teal focus-visible:outline-offset-2 cursor-pointer disabled:pointer-events-none',
	variants: {
		variant: {
			default: 'bg-payroll-teal text-white hover:bg-payroll-teal/90',
			primary: 'bg-payroll-teal text-white hover:bg-payroll-teal/90',
			destructive: 'bg-payroll-destructive text-white hover:bg-payroll-destructive/90',
			outline: 'border border-input bg-transparent hover:bg-payroll-teal/5 hover:text-payroll-teal hover:border-payroll-teal',
			secondary: 'bg-payroll-gold text-payroll-teal hover:bg-payroll-gold/80',
			ghost: 'hover:bg-payroll-teal/10 text-payroll-teal',
			link: 'text-payroll-teal underline-offset-4 hover:underline'
		},
		size: {
			default: 'h-10 px-md py-sm',
			sm: 'h-9 px-sm py-xs',
			lg: 'h-11 px-lg py-md',
			icon: 'h-10 w-10'
		},
		disabled: {
			true: 'bg-disabled text-disabled-foreground cursor-not-allowed opacity-100',
			false: ''
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});
