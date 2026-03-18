import { tv } from 'tailwind-variants';

export const rangeSliderVariants = tv({
    slots: {
        container: 'w-full',
        label: 'block text-sm font-medium text-payroll-teal mb-2',
        input: 'w-full h-[44px] bg-payroll-paper rounded-payroll appearance-none cursor-pointer accent-payroll-teal',
        valueDisplay: 'text-sm text-payroll-teal mt-2'
    },
    variants: {
        disabled: {
            true: {
                input: 'opacity-50 pointer-events-none'
            }
        }
    },
    defaultVariants: {
        disabled: false
    }
});
