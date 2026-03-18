import { tv } from 'tailwind-variants';

export const textInputVariants = tv({
	slots: {
		container:
			'flex items-center border rounded-payroll overflow-hidden bg-payroll-teal/5 transition-all',
		input: 'w-full p-2 outline-none bg-transparent',
		prefix: 'pl-3 text-payroll-teal/60',
		suffix: 'pr-3 text-payroll-teal/60'
	},
	variants: {
		error: {
			true: {
				container: 'border-payroll-error'
			},
			false: {
				container: 'border-payroll-teal/20 focus-within:ring-2 focus-within:ring-payroll-teal focus-within:border-payroll-teal focus-within:bg-white'
			}
		},
		disabled: {
			true: {
				container: 'bg-payroll-teal/5 cursor-not-allowed'
			},
			false: {}
		}
	},
	defaultVariants: {
		error: false,
		disabled: false
	}
});
