import { tv, type VariantProps } from 'tailwind-variants';

export const tableVariants = tv({
	base: 'min-w-full divide-y divide-gray-200',
	variants: {
		variant: {
			default: 'border-collapse',
			striped: 'border-collapse'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type TableVariants = VariantProps<typeof tableVariants>;
