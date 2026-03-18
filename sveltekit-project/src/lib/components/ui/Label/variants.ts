import { tv } from 'tailwind-variants';

export const labelVariants = tv({
	base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
	variants: {
		required: {
			true: "after:content-['*'] after:ml-0.5 after:text-red-500"
		}
	}
});
