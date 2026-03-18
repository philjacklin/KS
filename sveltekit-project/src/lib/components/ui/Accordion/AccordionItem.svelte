<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext, getContext } from 'svelte';
  import { accordionItemVariants } from './variants';

  interface Props {
    /** A unique identifier for this accordion item */
    id: string;
    /** The content of the item, typically AccordionHeader and AccordionContent */
    children?: Snippet;
    /** Additional CSS classes for the item container */
    className?: string;
  }

  let { id, children, className }: Props = $props();

  const { getOpenItems, toggleItem } = getContext<{
    getOpenItems: () => string[];
    toggleItem: (id: string) => void;
  }>('accordion');

  // Reactively track if this item is open
  let isOpen = $derived(getOpenItems().includes(id));

  // Provide the item state and toggle function to Header and Content components
  setContext('accordion-item', {
    id,
    isOpen: () => isOpen,
    toggle: () => toggleItem(id),
  });
</script>

<div class={accordionItemVariants({ className })}>
  {@render children?.()}
</div>
