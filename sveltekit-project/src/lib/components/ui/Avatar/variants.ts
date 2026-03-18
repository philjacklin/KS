import { tv } from 'tailwind-variants';

export const avatarVariants = tv({
	slots: {
		base: 'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-payroll-teal/5 bg-payroll-paper',
		image: 'h-full w-full object-cover',
		fallback: 'flex items-center justify-center font-semibold text-payroll-teal select-none'
	}
});
