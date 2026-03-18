<script lang="ts">
  import type { VariantProps } from 'tailwind-variants';
  import type { Snippet } from 'svelte';
  import { buttonVariants } from './variants';
  import './button-states.css';

  interface Props extends VariantProps<typeof buttonVariants> {
    children: Snippet;
    disabled?: boolean;
    loading?: boolean;
    class?: string;
    onclick?: (e: MouseEvent) => void;
  }

  let { variant, size, disabled = false, loading = false, children, class: className, onclick, ...props }: Props = $props();

  // Logic: Disable button if either disabled OR loading is true
  const isDisabled = $derived(disabled || loading);

  function handleClick(event: MouseEvent) {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onclick?.(event);
  }
</script>

<button
  class={buttonVariants({ variant, size, disabled: isDisabled, class: className })}
  class:button-suppress-interactions={loading}
  disabled={isDisabled}
  onclick={handleClick}
  {...props}
>
  {#if loading}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16" 
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="animate-spin"
      data-testid="button-spinner"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  {/if}
  
  {@render children()}
</button>
