<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { accordionHeaderVariants, accordionIconVariants } from './variants';

  interface Props {
    /** The content of the header, typically text or icons */
    children?: Snippet;
    /** Additional CSS classes for the header button */
    className?: string;
  }

  let { children, className }: Props = $props();

  const { id, isOpen, toggle } = getContext<{
    id: string;
    isOpen: () => boolean;
    toggle: () => void;
  }>('accordion-item');

  // Reactively track if this item is open using a derived value
  const open = $derived(isOpen());

  /**
   * Handles Enter and Space keys to toggle the accordion
   * Although buttons handle this naturally, we can be explicit if needed.
   * But here we just rely on onclick for the button.
   */
</script>

<div role="heading" aria-level="3">
  <button
    type="button"
    id="accordion-header-{id}"
    aria-expanded={open}
    aria-controls="accordion-content-{id}"
    onclick={toggle}
    class={accordionHeaderVariants({ isOpen: open, className })}
  >
    <span class="flex-1 font-semibold text-payroll-teal">
      {@render children?.()}
    </span>
    <svg
      class={accordionIconVariants({ isOpen: open })}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
</div>
