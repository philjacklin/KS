import PopoverStoryTrigger from './PopoverStoryTrigger.svelte';

export default {
    title: 'UI/Popover',
    component: PopoverStoryTrigger,
    tags: ['autodocs'],
    argTypes: {
        placement: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
        },
        offset: { control: 'number' },
        triggerText: { control: 'text' },
        popoverText: { control: 'text' },
        contentClass: { control: 'text' },
    },
};

export const Default = {
    args: {
        triggerText: 'Toggle Popover',
        popoverText: 'This is a standard popover using Svelte 5 snippets.',
        placement: 'bottom'
    },
};

export const CustomStyling = {
    args: {
        triggerText: 'Branded Popover',
        popoverText: 'Testing with forced specificity.',
        // Added '!' to the start of classes to force them to win
        contentClass: '!bg-slate-900 !text-white !border-none shadow-2xl p-6',
        placement: 'bottom'
    },
};

export const CustomStylingAndOffset = {
    args: {
        triggerText: 'Surgery Test',
        popoverText: 'If this is 100px away and Gold, we win.',
        placement: 'top',
        offset: 100, // Massive offset for testing
        // Use ! to bypass any variant conflicts
        contentClass: '!bg-payroll-gold !text-payroll-teal !p-10 !rounded-none shadow-2xl',
    },
};

export const CustomOffset = {
    args: {
        triggerText: 'I am far away',
        popoverText: 'This popover is positioned 40px from the trigger.',
        offset: 40,
        placement: 'top'
    },
};