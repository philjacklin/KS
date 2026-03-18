<script lang="ts">
    import Switch from './Switch.svelte';
    import type { Snippet } from 'svelte';

    let {
        checked = $bindable(false),
        class: className,
        children,
        ...rest
    } = $props<{
        checked?: boolean;
        class?: string;
        children?: Snippet;
        [key: string]: any;
    }>();
</script>

<Switch bind:checked class={className} {...rest}>
    {#if children}
        {@render children()}
    {/if}
</Switch>
