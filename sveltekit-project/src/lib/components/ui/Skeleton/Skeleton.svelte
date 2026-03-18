<script lang="ts">
    import { skeletonVariants } from './variants';
    import { cn } from '$lib/utils';

    // Define props using Svelte 5 Interface pattern
    interface Props {
        class?: string;
        variant?: 'circle' | 'text' | 'rectangle';
        animation?: 'pulse' | 'wave' | 'none';
        width?: string;
        height?: string;
    }

    let {
        class: className,
        variant = 'rectangle',
        animation = 'pulse',
        width = 'w-full',
        height = 'h-4'
    }: Props = $props();
</script>

<div
    role="status"
    aria-live="polite"
    aria-busy="true"
    class={cn(
        skeletonVariants({ variant, animation }), 
        width, 
        height, 
        className
    )}
></div>

<style>
    @keyframes wave {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }

    .animate-wave {
        background: linear-gradient(90deg, 
            rgba(0, 91, 107, 0.05) 25%, 
            rgba(0, 91, 107, 0.15) 50%, 
            rgba(0, 91, 107, 0.05) 75%
        );
        background-size: 200% 100%;
        animation: wave 2s linear infinite;
    }
</style>
