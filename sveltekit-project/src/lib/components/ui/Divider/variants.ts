import { tv } from 'tailwind-variants';

export const dividerVariants = tv({
	base: 'shrink-0',
	variants: {
		orientation: {
            horizontal: 'w-full border-b',
            vertical: 'h-full border-r'
        },
        thickness: {
            thin: '',
            normal: '',
            thick: '',
            thicker: '',
            thickest: ''
        },
        color: {
            default: 'border-payroll-teal/10',
            teal: 'border-payroll-teal',
            gold: 'border-payroll-gold',
            cyan: 'border-payroll-cyan'
        },	
		dashed: {
			true: 'border-dashed',
			false: 'border-solid'
		},
	},
	compoundVariants: [
		{ orientation: 'horizontal', thickness: 'thin', className: 'border-b' },
		{ orientation: 'horizontal', thickness: 'normal', className: 'border-b-2' },
		{ orientation: 'horizontal', thickness: 'thick', className: 'border-b-4' },
		{ orientation: 'horizontal', thickness: 'thicker', className: 'border-b-8' },
		{ orientation: 'vertical', thickness: 'thin', className: 'border-r' },
		{ orientation: 'vertical', thickness: 'normal', className: 'border-r-2' },
		{ orientation: 'vertical', thickness: 'thick', className: 'border-r-4' },
		{ orientation: 'vertical', thickness: 'thicker', className: 'border-r-8' }
	],
	defaultVariants: {
		orientation: 'horizontal',
		dashed: false,
		thickness: 'thin',
		color: 'default'
	}
});
