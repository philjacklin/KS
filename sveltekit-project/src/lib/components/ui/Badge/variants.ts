import { tv } from 'tailwind-variants';

export const badgeVariants = tv({
	base: 'inline-flex items-center rounded-full px-sm py-xs text-xs font-medium',
	variants: {
		variant: {
			success: 'bg-payroll-teal/10 text-payroll-teal',
			warning: 'bg-payroll-gold/10 text-payroll-gold',
			error: 'bg-payroll-destructive/10 text-payroll-destructive',
			info: 'bg-payroll-cyan/10 text-payroll-cyan',
			default: 'bg-payroll-teal/5 text-payroll-teal/80'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});
