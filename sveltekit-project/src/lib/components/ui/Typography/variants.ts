import { tv } from 'tailwind-variants';

export const typographyVariants = tv({
	base: 'font-sans',
	variants: {
		variant: {
			h1: 'text-4xl font-semibold tracking-crisp',
			h2: 'text-3xl font-semibold tracking-crisp',
			h3: 'text-2xl font-semibold tracking-crisp',
			h4: 'text-xl font-semibold tracking-crisp',
			body: 'text-base font-normal',
			'body-large': 'text-lg font-normal',
			small: 'text-sm font-normal',
			caption: 'text-xs font-normal'
		},
		color: {
			primary: 'text-payroll-teal',
			secondary: 'text-payroll-gold',
			tertiary: 'text-payroll-cyan',
			destructive: 'text-payroll-destructive'
		},
		italic: {
			true: 'italic'
		},
		underline: {
			true: 'underline'
		},
		delete: {
			true: 'line-through'
		}
	},
	defaultVariants: {
		variant: 'body',
		color: 'primary'
	}
});
