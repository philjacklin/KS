<script lang="ts">
    import { computePosition, offset as offsetMiddleware, flip, shift } from '@floating-ui/dom';
    import { slide } from 'svelte/transition';
    import { popoverVariants } from './variants';
    import { twMerge } from 'tailwind-merge';

    let {
        children,
        content,
        placement = 'bottom',
        offset: offsetValue = 8,
        className = '',
        contentClass = ''
    } = $props();

    let open = $state(false);
    let triggerEl = $state<HTMLElement>();
    let popoverEl = $state<HTMLElement>();

    function toggle() { open = !open; }

    $effect(() => {
        if (open && triggerEl && popoverEl) {
            computePosition(triggerEl, popoverEl, {
                placement,
                middleware: [
                    offsetMiddleware(Number(offsetValue)),
                    flip(),
                    shift({ padding: 8 })
                ]
            }).then(({ x, y }) => {
                if (!popoverEl) return;
                Object.assign(popoverEl.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                    position: 'absolute',
                    zIndex: '50'
                });
            });
        }
    });

    const popoverId = `popover-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div 
    bind:this={triggerEl}
    onclick={toggle}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
    class={twMerge("inline-block cursor-pointer", className)}
    role="button"
    tabindex="0"
    aria-haspopup="dialog"
    aria-expanded={open}
    aria-controls={popoverId}
>
    {@render children?.()}
</div>

{#if open}
    <div
        bind:this={popoverEl}
        id={popoverId}
        class={twMerge(popoverVariants(), contentClass)}
        transition:slide={{ duration: 200 }}
        role="dialog"
    >
        {@render content?.()}
    </div>
{/if}
