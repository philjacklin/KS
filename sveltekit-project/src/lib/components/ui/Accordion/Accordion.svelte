<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { accordionVariants } from './variants';

  interface Props {
    /** The content of the accordion, typically multiple AccordionItem components */
    children?: Snippet;
    /** Additional CSS classes for the accordion container */
    className?: string;
    /** Whether multiple items can be expanded at once */
    allowMultiple?: boolean;
    /** The IDs of the currently expanded items */
    value?: string[];
    /** Callback called when the expanded items change */
    onValueChange?: (value: string[]) => void;
  }

  let { 
    children, 
    className, 
    allowMultiple = false, 
    value = $bindable([]),
    onValueChange
  }: Props = $props();

  let container: HTMLDivElement;

  /**
   * Toggles the expanded state of an item
   * @param id The ID of the item to toggle
   */
  function toggleItem(id: string) {
    let newValue: string[];
    if (allowMultiple) {
      if (value.includes(id)) {
        newValue = value.filter((i) => i !== id);
      } else {
        newValue = [...value, id];
      }
    } else {
      if (value.includes(id)) {
        newValue = [];
      } else {
        newValue = [id];
      }
    }
    value = newValue;
    onValueChange?.(newValue);
  }

  /**
   * Handles keyboard navigation for accessibility
   */
  function handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const isHeader = target.tagName === 'BUTTON' && target.id.startsWith('accordion-header-');
    
    if (!isHeader) return;

    const headers = Array.from(container.querySelectorAll('button[id^="accordion-header-"]')) as HTMLElement[];
    const currentIndex = headers.indexOf(target);
    
    if (currentIndex === -1) return;

    let nextIndex;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % headers.length;
        headers[nextIndex].focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = (currentIndex - 1 + headers.length) % headers.length;
        headers[nextIndex].focus();
        break;
      case 'Home':
        event.preventDefault();
        headers[0].focus();
        break;
      case 'End':
        event.preventDefault();
        headers[headers.length - 1].focus();
        break;
    }
  }

  // Provide the accordion state and toggle function to child components
  setContext('accordion', {
    getOpenItems: () => value,
    toggleItem,
  });
</script>

<div 
  bind:this={container}
  class={accordionVariants({ className })}
  onkeydown={handleKeyDown}
  aria-multiselectable={allowMultiple}
>
  {@render children?.()}
</div>
