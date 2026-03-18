<script lang="ts">
  import Accordion from './Accordion.svelte';
  import AccordionItem from './AccordionItem.svelte';
  import AccordionHeader from './AccordionHeader.svelte';
  import AccordionContent from './AccordionContent.svelte';

  let { allowMultiple = false, value = $bindable([]), onValueChange, className = "" } = $props();
</script>

<Accordion {allowMultiple} bind:value {onValueChange} {className}>
  <AccordionItem id="item-1">
    {#snippet children()}
      <AccordionHeader>Header 1</AccordionHeader>
      <AccordionContent>Content 1</AccordionContent>
    {/snippet}
  </AccordionItem>
  <AccordionItem id="item-2">
    {#snippet children()}
      <AccordionHeader>Header 2</AccordionHeader>
      <AccordionContent>Content 2</AccordionContent>
    {/snippet}
  </AccordionItem>
  <AccordionItem id="item-3">
    {#snippet children()}
      <AccordionHeader>Header 3</AccordionHeader>
      <AccordionContent>Content 3</AccordionContent>
    {/snippet}
  </AccordionItem>
</Accordion>
