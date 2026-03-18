<script lang="ts">
    import { tv, type VariantProps } from 'tailwind-variants';
    import { cn } from '$lib/utils.js';
    import type { Snippet } from 'svelte';

    const layoutVariants = tv({
        base: 'grid',
        variants: {
            gap: {
                sm: 'gap-2',
                md: 'gap-4',
                lg: 'gap-8'
            },
            placeItems: {
                start: 'place-items-start',
                center: 'place-items-center',
                end: 'place-items-end'
            }
        },
        defaultVariants: {
            placeItems: 'start'
            // Removing default gap here so it doesn't clash with inline style
        }
    });

    let { 
        children, 
        cols = 1, 
        gap = "1rem", // Default value for the style:gap
        placeItems, 
        className,   // This catches 'className'
        class: internalClass, // This catches 'class' from tests
        container = false, 
        sm, md, lg, xl 
    } = $props<{
        children: Snippet;
        cols?: number;
        gap?: any; 
        placeItems?: 'start' | 'center' | 'end';
        className?: string;
        class?: string;
        container?: boolean;
        sm?: number; md?: number; lg?: number; xl?: number;
    }>();

    const sanitizedCols = $derived(Number.isInteger(cols) && cols > 0 ? cols : 1);
    
    // Determine if gap is a preset (sm, md, lg) or a raw CSS value
    const gapClass = $derived(['sm', 'md', 'lg'].includes(gap) ? gap : undefined);
    const gapStyle = $derived(!gapClass ? gap : undefined);

    const finalClasses = $derived(cn(
        layoutVariants({ gap: gapClass, placeItems }),
        `grid-cols-${sanitizedCols}`,
        sm && `sm:grid-cols-${sm}`,
        md && `md:grid-cols-${md}`,
        lg && `lg:grid-cols-${lg}`,
        xl && `xl:grid-cols-${xl}`,
        container && "container mx-auto",
        className,
        internalClass
    ));
</script>

<div 
    role="grid" 
    class={finalClasses}
    style:gap={gapStyle}
>
    {@render children()}
</div>

<!-- tailwind classes used for JIT
 grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6 sm:grid-cols-7 sm:grid-cols-8 sm:grid-cols-9 sm:grid-cols-10 sm:grid-cols-11 sm:grid-cols-12
md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6 md:grid-cols-7 md:grid-cols-8 md:grid-cols-9 md:grid-cols-10 md:grid-cols-11 md:grid-cols-12
lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 lg:grid-cols-7 lg:grid-cols-8 lg:grid-cols-9 lg:grid-cols-10 lg:grid-cols-11 lg:grid-cols-12
xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 xl:grid-cols-7 xl:grid-cols-8 xl:grid-cols-9 xl:grid-cols-10 xl:grid-cols-11 xl:grid-cols-12
-->
