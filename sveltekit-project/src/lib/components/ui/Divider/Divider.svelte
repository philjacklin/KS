<script lang="ts">
    import { dividerVariants } from './variants';
    import { cn } from '$lib/utils';
    import { t } from '$lib/stores/localeStore';

    let {
        orientation = 'horizontal',
        dashed = false,
        thickness = 'normal',
        color = 'default',
        labelKey = '',
        labelPosition = 'center',
        class: className,
        children,
        ...rest
    } = $props();

    const labelPosClass = $derived.by(() => {
        if (labelPosition === 'left') return 'left-md';
        if (labelPosition === 'right') return 'right-md';
        return 'left-1/2 -translate-x-1/2';
    });
</script>

{#if orientation === 'vertical'}
    <div
        role="separator"
        aria-orientation="vertical"
        class={cn(dividerVariants({ orientation, dashed, thickness, color }), className, 'relative')}
        {...rest}
    >
        {#if children}
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-payroll-paper px-xs">
                {@render children()}
            </div>
        {/if}
    </div>
{:else if labelKey && labelKey.length > 0}
    <div
        role="separator"
        aria-orientation="horizontal"
        class={cn('relative flex w-full items-center py-md', className)}
        {...rest}
    >
        <hr class={cn('w-full', dividerVariants({ orientation: 'horizontal', dashed, thickness, color }))} />
        <span class={cn('absolute bg-payroll-paper px-sm text-sm font-medium z-10', labelPosClass)}>
            {$t(labelKey)}
        </span>
    </div>
{:else}
    <hr
        aria-orientation="horizontal"
        class={cn(dividerVariants({ orientation, dashed, thickness, color }), className)}
        {...rest}
    />
{/if}
