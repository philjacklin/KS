<script>
    import Label from './Label.svelte';

    let {
        for: forProp = undefined,
        children = undefined,
        class: className = undefined,
        required = false
    } = $props(); // Fixed: Added $props()
</script>

<Label data-testid="label" for={forProp} class={className} {required}>
    {#if children}
        {#if typeof children === 'string'}
            {children}
        {:else}
            {@render children()}
        {/if}
    {:else}
        Default label text
    {/if}
</Label>
