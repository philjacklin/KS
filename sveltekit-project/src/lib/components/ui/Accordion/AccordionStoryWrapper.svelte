<script lang="ts">
  import Accordion from './Accordion.svelte';
  import AccordionItem from './AccordionItem.svelte';
  import AccordionHeader from './AccordionHeader.svelte';
  import AccordionContent from './AccordionContent.svelte';
  import { t } from '$lib/stores/localeStore';

  let { 
    allowMultiple = false, 
    value = $bindable([]), 
    onValueChange, 
    className = "",
    items = [
      { id: 'item-1', header: 'accordion.item1.header', content: 'accordion.item1.content' },
      { id: 'item-2', header: 'accordion.item2.header', content: 'accordion.item2.content' },
      { id: 'item-3', header: 'accordion.item3.header', content: 'accordion.item3.content' }
    ]
  } = $props();
</script>

<Accordion {allowMultiple} bind:value {onValueChange} {className}>
  {#each items as item}
    <AccordionItem id={item.id}>
      {#snippet children()}
        <AccordionHeader>{$t(item.header)}</AccordionHeader>
        <AccordionContent>{$t(item.content)}</AccordionContent>
      {/snippet}
    </AccordionItem>
  {/each}
</Accordion>
