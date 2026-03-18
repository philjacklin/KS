<script lang="ts">
    import Popover from './Popover.svelte';
    let { placement = 'bottom', offset = 8, className = '', contentClass = '' } = $props();
</script>

<Popover {placement} {offset} {className} {contentClass}>
    {#snippet children()}
        <button>Trigger</button>
    {/snippet}
    {#snippet content()}
        <div>Popover Content</div>
    {/snippet}
</Popover>
