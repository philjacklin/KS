<script lang="ts">
  import { checkboxVariants } from './variants';
  import { twMerge } from 'tailwind-merge';

  let {
    checked = $bindable(false),    // Use $bindable to allow two-way binding from parents
    indeterminate = false,
    disabled = false,              // 1. Explicitly accept disabled
    label = '',
    id = `checkbox-${Math.random().toString(36).slice(2, 9)}`, // Provide a default ID
    className = '',
    onchange,                      // 2. Accept onchange as a prop
    onclick,
    ...rest                        // 3. Catch any other attributes (like aria-label)
  } = $props();

  let checkboxElement: HTMLInputElement;

  // Destructure variants - usually, variants are reactive based on props
  const { wrapper, input, label: labelClass } = checkboxVariants({ disabled });

  // Sync the indeterminate state to the actual DOM element
  $effect(() => {
    if (checkboxElement) {
      checkboxElement.indeterminate = indeterminate;
    }
  });
</script>

<div class={twMerge(wrapper(), className)}>
<input
  {...rest}
  bind:this={checkboxElement}
  type="checkbox"
  {id}
  {disabled}
  bind:checked
  class={input()}
  onchange={(e) => !disabled && onchange?.(e)}
  onclick={(e) => !disabled && onclick?.(e)}
  aria-checked={indeterminate ? 'mixed' : checked} 
/>  {#if label}
    <label for={id} class={labelClass()}>
      {label}
    </label>
  {/if}
</div>
