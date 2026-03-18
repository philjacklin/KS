<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  let {
    id,
    name = "",
    checked = $bindable(false),
    disabled = false,
    class: className = '',
    onchange,
    ...rest
  } = $props<{
    id?: string;
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    class?: string;
    onchange?: (checked: boolean) => void;
  }>();

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<input type="hidden" {name} value={checked ? "true" : "false"} />
<button
  {id}
  {...rest}
  type="button"
  role="switch"
  aria-checked={checked}
  class={twMerge('w-12 h-6 rounded-full relative bg-gray-200 transition-colors', checked ? 'bg-payroll-teal' : 'bg-gray-300', className)}
  onclick={toggle}
  {disabled}
>
  <span class={twMerge('absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform', checked ? 'translate-x-6' : 'translate-x-0')}></span>
</button>
