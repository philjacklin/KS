<script lang="ts">
    import Drawer from '$lib/components/ui/Drawer/Drawer.svelte';
    import Button from '$lib/components/ui/button/Button.svelte';

    let { position = 'left' } = $props();
    let isOpen = $state(false);

    function openDrawer() {
        isOpen = true;
    }

    function closeDrawer() {
        isOpen = false;
    }
</script>

<Button onclick={openDrawer}>Open Drawer</Button>

<Drawer {position} isOpen={isOpen} onClose={closeDrawer}>
    <div class="p-4">
        <h2 class="text-lg font-semibold">Drawer Title</h2>
        <p>This is the content of the drawer.</p>
        <Button onclick={closeDrawer}>Close</Button>
    </div>
</Drawer>

