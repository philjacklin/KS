// label.stories.js
import Label from '$lib/components/ui/label/Label.svelte';

export default {
    title: 'UI/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {
        for: { control: 'text' },
        id: { control: 'text' },
        required: { control: 'boolean' },
        // Remove children control if you want to use the template below
    },
};

// Use a render function that creates a proper Svelte context
export const Default = {
    args: {
        for: 'name',
        required: false,
    },
    // In Svelte 5 Storybook, use the 'children' property as a string 
    // or a specialized render function.
    render: (args) => ({
        Component: Label,
        props: {
            ...args,
            // Svelte 5 Storybook wrapper often handles strings 
            // by converting them to snippets automatically.
            children: 'Name' 
        },
    }),
};

export const Required = {
    args: {
        for: 'email',
        required: true,
    },
    render: (args) => ({
        Component: Label,
        props: {
            ...args,
            children: 'Email'
        },
    }),
};