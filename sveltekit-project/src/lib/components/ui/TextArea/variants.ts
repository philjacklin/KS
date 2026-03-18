import { tv } from 'tailwind-variants';

export const textAreaVariants = tv({
	base: [
		'min-h-20',
		'w-full',
		'rounded-md',
		'border',
		'border-payroll-teal/20',
		'bg-payroll-teal/5',
		'px-md py-sm',
		'text-sm',
		'placeholder:text-payroll-teal/50',
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-payroll-teal',
		'focus:bg-white',
		'disabled:cursor-not-allowed',
		'disabled:opacity-50',
		'box-border',
		'resize-none',
	],
});
