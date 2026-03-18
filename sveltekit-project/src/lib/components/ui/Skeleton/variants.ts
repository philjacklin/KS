import { tv } from 'tailwind-variants';

export const skeletonVariants = tv({
	base: 'bg-payroll-teal/5',
	variants: {
		variant: {
			circle: 'rounded-full',
			text: 'rounded-sm',
			rectangle: 'rounded-md'
		},
		animation: {
			pulse: 'animate-pulse',
			wave: 'animate-wave',
			none: ''
		}
	},
	defaultVariants: {
		variant: 'rectangle',
		animation: 'pulse'
	}
});
