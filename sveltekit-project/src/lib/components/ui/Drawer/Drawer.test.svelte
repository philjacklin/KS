<script lang="ts">
    import Drawer from './Drawer.svelte';
    import type { Snippet } from 'svelte';

    let {
        isOpen = false,
        position = 'left',
        onClose = () => {},
        class: className = '', // 1. Add this to the destructuring
        children
    }: {
        isOpen?: boolean;
        position?: 'left' | 'right' | 'top' | 'bottom';
        onClose?: () => void;
        class?: string;       // 2. Add to type definition
        children?: Snippet;
    } = $props();
</script>

<Drawer {isOpen} {position} {onClose} class={className}>
    {#if children}
        {@render children()}
    {:else}
        <div>Default Content</div>
    {/if}
</Drawer>
