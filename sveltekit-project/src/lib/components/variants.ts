import { tv } from 'tailwind-variants';

export const kiwiSaverVariants = tv({
    slots: {
        container: 'space-y-8 p-8',
        cardTitle: 'mb-4',
        wrapper: 'h-11 flex items-center',
        inputWrapper: 'h-11',
        stack: 'h-11',
        button: 'h-11 min-w-[44px]',
    },
});
