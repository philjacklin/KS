<script>
    import { labelVariants } from './variants';

    let {
        for: forAttribute,
        id,
        class: className,
        children,
        required = false,
        ...restProps
    } = $props();
</script>

<label 
    for={forAttribute} 
    {id} 
    class={labelVariants({ required, class: className })}
    {...restProps}
>
    {#if children}
        {#if typeof children === 'function'}
            {@render children()}
        {:else}
            {children}
        {/if}
    {/if
    }
</label>
