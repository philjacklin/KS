import { tv, type VariantProps } from 'tailwind-variants';

export const stackVariants = tv({
    base: 'flex',
    variants: {
        direction: {
            vertical: 'flex-col',
            horizontal: 'flex-row'
        },
        spacing: {
            xs: 'gap-xs',
            sm: 'gap-sm',
            md: 'gap-md',
            lg: 'gap-lg',
            xl: 'gap-xl'
        },
        align: {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
            baseline: 'items-baseline'
        },
        justify: {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly'
        }
    },
    defaultVariants: {
        direction: 'vertical',
        spacing: 'md',
        align: 'stretch',
        justify: 'start'
    }
});

export type StackVariants = VariantProps<typeof stackVariants>;
