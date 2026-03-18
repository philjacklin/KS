import { tv } from 'tailwind-variants';

export const drawerVariants = tv({
	base: 'fixed inset-0 bg-payroll-teal/50 z-50 flex',
	variants: {
		position: {
			left: 'justify-start',
			right: 'justify-end',
			top: 'items-start',
			bottom: 'items-end'
		}
	},
	defaultVariants: {
		position: 'left'
	}
});

export const drawerContentVariants = tv({
	base: 'bg-payroll-paper h-full shadow-payroll',
	variants: {
		position: {
			left: 'w-drawer',
			right: 'w-drawer',
			top: 'h-auto w-full',
			bottom: 'h-auto w-full'
		}
	}
});
