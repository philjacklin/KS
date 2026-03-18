import { tv } from 'tailwind-variants';

export const numberInputVariants = tv({
    slots: {
        wrapper: 'relative',
        input: 'w-full border rounded-lg p-2 bg-white focus:ring-2 focus:outline-none transition-colors duration-200',
        prefix: 'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500',
        suffix: 'absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500'
    },
    variants: {
        error: {
            true: {
                input: 'border-red-600 text-red-600 focus:ring-red-500'
            },
            false: {
                input: 'border-gray-300 focus:border-payroll-teal focus:ring-payroll-teal'
            }
        },
        disabled: {
            true: {
                input: 'opacity-50 pointer-events-none bg-gray-100'
            }
        },
        hasPrefix: {
            true: {
                input: 'pl-7'
            }
        },
        hasSuffix: {
            true: {
                input: 'pr-7'
            }
        }
    },
    defaultVariants: {
        error: false,
        disabled: false
    }
});
