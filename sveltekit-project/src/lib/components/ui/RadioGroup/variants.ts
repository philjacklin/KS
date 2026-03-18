import { tv } from 'tailwind-variants';

export const radioGroupVariants = tv({
    base: 'flex',
    variants: {
        orientation: {
            vertical: 'flex-col space-y-2',
            horizontal: 'flex-row space-x-4'
        }
    }
});
