<script lang="ts">
    import Modal from './Modal.svelte';

    let {
        isOpen = $bindable(false), // Use bindable for the test to verify state
        title = 'Test Modal',
    } = $props();
</script>

<button onclick={() => (isOpen = true)}>Open Modal</button>

<Modal bind:isOpen {title}>
    <div>
        <p>This is the modal content.</p>
        <button>First</button>
        <button>Second</button>
    </div>
</Modal>
