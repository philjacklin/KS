<script lang="ts">
  import DropdownMenu from './DropdownMenu.svelte';

  let { 
    items = [], 
    isOpen = $bindable(false),
    trigger,
    content,
    ...props
  } = $props();
</script>

{#if trigger && content}
  <DropdownMenu {items} bind:isOpen {trigger} {content} {...props} />
{:else if trigger}
  <DropdownMenu {items} bind:isOpen {trigger} {...props} />
{:else if content}
  <DropdownMenu {items} bind:isOpen {content} {...props}>
    {#snippet trigger()}Open Menu{/snippet}
  </DropdownMenu>
{:else}
  <DropdownMenu {items} bind:isOpen {...props}>
    {#snippet trigger()}Open Menu{/snippet}
  </DropdownMenu>
{/if}
