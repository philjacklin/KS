<script>
  import Divider from './Divider.svelte';
  import { t } from '$lib/stores/localeStore'; // Import the i18n store

  let {
    orientation = 'horizontal',
    labelPosition = 'center',
    thickness = 'normal',
    color = 'default',
    dashed = false,
    labelKey = '' // Pass the key instead of the raw string
  } = $props();
</script>

{#if orientation === 'vertical'}
  <div style="height: 100px; display: flex; justify-content: center;">
    <Divider {orientation} {labelPosition} {thickness} {color} {dashed}>
      {#if labelKey}
        {$t(labelKey)}
      {/if}
    </Divider>
  </div>
{:else}
  <Divider 
    {orientation} 
    {labelPosition} 
    {thickness} 
    {color} 
    {dashed} 
    {labelKey} 
  />
{/if}
