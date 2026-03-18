<script lang="ts">
    import { focusTrap } from '$lib/actions/focusTrap';
    import { t } from '$lib/stores/localeStore';
    import { modalVariants } from './variants';
    import type { Snippet } from 'svelte';

    let {
        isOpen = $bindable(false), // Use $bindable so parent state stays in sync
        titleKey = '',
        children,
        className = ''
    }: {
        isOpen?: boolean;
        titleKey?: string;
        children: Snippet;
        className?: string;
    } = $props();

    // Use $state for the element binding to avoid "non_reactive_update" warning
    let dialog = $state<HTMLDialogElement>();
    let previouslyFocusedElement = $state<HTMLElement | null>(null);
    let titleId = `modal-title-${Math.random().toString(36).substring(2, 9)}`;

    const { base, title: titleClass } = modalVariants();

    function handleClose() {
        isOpen = false;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            handleClose();
        }
    }

    $effect(() => {
        if (isOpen && dialog) {
            previouslyFocusedElement = document.activeElement as HTMLElement;
            dialog.showModal();
            // Accessibility: Focus first element inside
            const firstFocusable = dialog.querySelector<HTMLElement>(
                'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
        } else if (dialog?.open) {
            dialog.close();
            previouslyFocusedElement?.focus();
        }
    });
</script>

{#if isOpen}
    <dialog
        bind:this={dialog}
        class={base({ class: className })}
        aria-modal="true"
        aria-labelledby={titleId}
        onclose={handleClose}
        onkeydown={handleKeydown}
        use:focusTrap
    >
        {#if titleKey}
            <h2 id={titleId} class={titleClass()}>{$t(titleKey)}</h2>
        {/if}
        {@render children()}
    </dialog>
{/if}
