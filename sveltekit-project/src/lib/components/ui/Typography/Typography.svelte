<script lang="ts">
    import { typographyVariants } from '$lib/components/ui/typography/variants';
    import { cn } from '$lib/utils';
    import type { VariantProps } from 'tailwind-variants';
    import { t } from '$lib/stores/localeStore';

    interface Props extends VariantProps<typeof typographyVariants> {
        className?: string;
        as?: keyof HTMLElementTagNameMap;
        children: string | (() => string);
    }

    let {
        variant = 'body',
        color = 'primary',
        className = '',
        as: Component = 'p',
        children,
        italic = false,
        underline = false,
        delete: isDeleted = false
    } = $props<Props>();

//    const textContent = $derived(typeof children === 'function' ? children() : children);

    const finalClasses = $derived(cn(
        typographyVariants({ 
            variant, 
            color: color as any, 
            italic, 
            underline, 
            delete: isDeleted 
        }),
        className
    ));
</script>

<svelte:element this={Component} class={finalClasses}>
    {#if children}
        {#if typeof children === 'function'}
            {@render children()}
        {:else}
            {$t(children)}
        {/if}
    {/if}
</svelte:element>

