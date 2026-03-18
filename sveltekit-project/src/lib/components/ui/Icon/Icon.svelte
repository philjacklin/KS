<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    import { clsx, type ClassValue } from 'clsx';

    // Svelte 5 uses $props() instead of export let
    let { 
        svg, 
        size = '1em', 
        alt = undefined, 
        className = undefined 
    }: {
        svg: string;
        size?: string;
        alt?: string;
        className?: ClassValue;
    } = $props();

    const baseIconStyle = 'inline-block';

    // Use $derived for reactive class computation in Svelte 5
    let finalClasses = $derived(twMerge(clsx(baseIconStyle, className)));
</script>

{#if alt}
    <div 
        style="width: {size}; height: {size};" 
        class={finalClasses} 
        role="img" 
        aria-label={alt}
        data-testid="icon-container"
    >
        {@html svg}
    </div>
{:else}
    <div 
        style="width: {size}; height: {size};" 
        class={finalClasses} 
        aria-hidden="true" 
        role="presentation"
        data-testid="icon-container"
    >
        {@html svg}
    </div>
{/if}
