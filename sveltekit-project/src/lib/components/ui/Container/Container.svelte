<script lang="ts">
    import type { Snippet } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

    type Props = {
        maxWidth?: MaxWidth | null;
        className?: string;
        children: Snippet;
    };

    let {
        maxWidth = null,
        className = '',
        children
    }: Props = $props();

    const maxWidthMap: Record<MaxWidth, string> = {
        sm: 'max-w-container-sm',
        md: 'max-w-container-md',
        lg: 'max-w-container-lg',
        xl: 'max-w-container-xl',
        '2xl': 'max-w-container-2xl'
    };
</script>

<div 
    class={twMerge(
        'w-full mx-auto block', 
        maxWidth ? maxWidthMap[maxWidth] : '', 
        className
    )}
>
    {@render children()}
</div>
