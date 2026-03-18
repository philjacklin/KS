<script lang="ts">
    import Button from './Button.svelte';
    import type { Snippet } from 'svelte';

    // Allow both the old string-style 'slot' and the new Snippet
    interface Props extends Record<string, any> {
        slot?: string | Snippet;
    }

    let { onClick, slot, ...rest }: Props = $props();
</script>

<Button onclick={onClick} {...rest}>
    {#if typeof slot === 'function'}
        {@render slot()}
    {:else if slot}
        {slot}
    {/if}
</Button>
