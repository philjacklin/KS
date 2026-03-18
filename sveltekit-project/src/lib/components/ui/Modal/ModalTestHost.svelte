<script lang="ts">
    import Modal from './Modal.svelte';
    import type { Snippet } from 'svelte';

    let {
        isOpen = $bindable(false),
        titleKey = '',
        className = '',
        contentType = 'default'
    }: {
        isOpen?: boolean;
        titleKey?: string;
        className?: string;
        contentType?: string;
    } = $props();
</script>

<Modal bind:isOpen {titleKey} {className}>
    {#snippet children()}
        {#if contentType === 'form'}
            <button type="button" data-testid="modal-button">Focus Target</button>
            <input type="text" aria-label="Name" />
            <a href="/">Focusable 3</a>
        {:else}
            <p>Modal Content</p>
        {/if}
    {/snippet}
</Modal>
