<script lang="ts">
	import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom';
	import { twMerge } from 'tailwind-merge';
	import { tooltipVariants, arrowVariants } from './tooltip.variants';

	let {
		children,
		label,
		placement = 'bottom',
		offset: offsetValue = 8,
		className = '',
		disabled = false
	} = $props();

	let triggerEl = $state<HTMLElement>();
	let tooltipEl = $state<HTMLElement>();
	let arrowEl = $state<HTMLElement>();
	let isVisible = $state(false);

	const finalPlacement = $derived(placement);

	function show() { if (!disabled) isVisible = true; }
	function hide() { isVisible = false; }

$effect(() => {
    if (isVisible && triggerEl && tooltipEl && arrowEl) {
        computePosition(triggerEl, tooltipEl, {
            placement: finalPlacement,
            middleware: [
                offset(offsetValue),
                flip(),
                shift({ padding: 8 }),
                arrow({ element: arrowEl })
            ]
        }).then(({ x, y, middlewareData, placement: actualPlacement }) => {
            if (!tooltipEl) return;
            
            Object.assign(tooltipEl.style, {
                left: `${x}px`,
                top: `${y}px`
            });

            if (middlewareData.arrow && arrowEl) {
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const side = actualPlacement.split('-')[0];
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                }[side];

                Object.assign(arrowEl.style, {
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    [staticSide]: '-4px', // Pulls arrow out
                });
            }
        });
    }
});

	const tooltipId = `tooltip-${Math.random().toString(36).substring(2, 9)}`;
</script>

<div
	bind:this={triggerEl}
	class="inline-block"
	aria-describedby={isVisible ? tooltipId : undefined}
	onmouseenter={show}
	onfocus={show}
	onmouseleave={hide}
	onblur={hide}
>
	{@render children?.()}
</div>

{#if isVisible && label}
	<div
		bind:this={tooltipEl}
		id={tooltipId}
		role="tooltip"
		class={twMerge(tooltipVariants(), className)}
	>
		{label}
		<div bind:this={arrowEl} class={arrowVariants()}></div>
	</div>
{/if}
