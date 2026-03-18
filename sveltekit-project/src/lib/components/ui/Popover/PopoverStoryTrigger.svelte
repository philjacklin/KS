<script lang="ts">
    import Popover from './Popover.svelte';
    import Button from '$lib/components/ui/button/Button.svelte';

    let { 
        triggerText = "Click Me", 
        popoverText = "Popover Content", 
        placement = 'bottom',
        offset = 8,
        className = "",
        contentClass = ""
    } = $props();
</script>

<div class="flex items-center justify-center min-h-[400px] w-full border border-dashed border-gray-200 rounded-lg">
    <Popover 
        {placement} 
        offset={offset} 
        {className} 
        {contentClass}
    >
        {#snippet children()}
            <Button>{triggerText}</Button>
        {/snippet}
        
        {#snippet content()}
            <div class="w-64">
                <p class="text-sm">{popoverText}</p>
            </div>
        {/snippet}
    </Popover>
</div>
