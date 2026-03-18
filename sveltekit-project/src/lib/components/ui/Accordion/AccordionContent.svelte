<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { accordionContentVariants } from './variants';

  interface Props {
    /** The content of the panel, typically body text or other components */
    children?: Snippet;
    /** Additional CSS classes for the content container */
    className?: string;
  }

  let { children, className }: Props = $props();

  const { id, isOpen } = getContext<{
    id: string;
    isOpen: () => boolean;
  }>('accordion-item');

  // Reactively track if this item is open using a derived value
  const open = $derived(isOpen());
</script>

<div
  role="region"
  id="accordion-content-{id}"
  aria-labelledby="accordion-header-{id}"
  aria-hidden={!open}
  hidden={!open}
  class={accordionContentVariants({ isOpen: open, className })}
>
  <div class="overflow-hidden">
    <div class="text-payroll-teal/80">
      {@render children?.()}
    </div>
  </div>
</div>
