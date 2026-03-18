<script lang="ts">
  import NumberInput from './NumberInput.svelte';

  let { 
    label, 
    leadingIconPath, 
    trailingIconPath, 
    value = 0,
    ...rest 
  } = $props();

  let internalValue = $state(value);
</script>

<NumberInput
  {label}
  {...rest}
  value={internalValue}
  onChange={(v) => internalValue = v}
>
  {#snippet leadingIcon()}
    {#if leadingIconPath}
      <svg data-testid="leading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d={leadingIconPath} />
      </svg>
    {/if}
  {/snippet}

  {#snippet trailingIcon()}
    {#if trailingIconPath}
      <svg data-testid="trailing-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d={trailingIconPath} />
      </svg>
    {/if}
  {/snippet}
</NumberInput>
