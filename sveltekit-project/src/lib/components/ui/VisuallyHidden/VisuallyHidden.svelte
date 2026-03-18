<script lang="ts">
    import { cn } from '$lib/utils/cn'; // Ensure this path correctly points to your cn utility
    import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { clsx } from 'clsx';

    let { children, className }: { children?: Snippet; className?: string } = $props();

    // Use $derived to ensure classes update if className changes
    let classes = $derived(cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden clip-rect-0 whitespace-nowrap border-0',
        className
    ));
</script>

<span class={classes}>
    {#if children}
        {@render children()}
    {/if}
</span>
