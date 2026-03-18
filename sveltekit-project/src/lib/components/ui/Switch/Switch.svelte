<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { t } from '$lib/stores/localeStore';
  import { switchVariants } from './variants';

  // Svelte 5 simplified type definitions
  type Size = 'sm' | 'lg';
  type Color = 'secondary' | 'success';

  let {
    checked = $bindable(false), // ALLOWS TWO-WAY BINDING
    disabled = false,
    labelKey = '',
    size = 'sm',
    color = 'secondary',
    class: className = '',
    onchange, // Event handler as a prop
    ...rest // Catch-all for aria-labels, etc.
  } = $props<{
    checked?: boolean;
    disabled?: boolean;
    labelKey?: string;
    size?: Size;
    color?: Color;
    class?: string;
    onchange?: (checked: boolean) => void;
  }>();

  // Stable IDs are better handled via $state or crypto.randomUUID
  const id = labelKey ? `switch-${Math.random().toString(36).slice(2, 9)}` : undefined;

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggle();
    }
  }

  // Derived variants ensure the UI updates instantly when props change
  const classes = $derived(switchVariants({ size, color, checked, disabled }));
</script>

<div class="flex items-center">
  <button
    {...rest}
    type="button"
    role="switch"
    aria-checked={checked}
    {id}
    class={twMerge(classes.track(), className)}
    onclick={toggle}
    onkeydown={handleKeydown}
    {disabled}
  >
    <span class={classes.thumb()}></span>
  </button>
  {#if labelKey}
    <label for={id} class="ml-3 text-sm font-medium text-foreground">
      {$t(labelKey)}
    </label>
  {/if}
</div>
