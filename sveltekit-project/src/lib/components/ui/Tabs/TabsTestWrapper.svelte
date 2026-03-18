<script lang="ts">
  import Tabs from './Tabs.svelte';
  let { onSelect, className } = $props();

  const items = [
    { labelKey: 'tab1_label', identifier: 'tab1', content: tab1Content },
    { labelKey: 'tab2_label', identifier: 'tab2', content: tab2Content },
    { labelKey: 'tab3_label', identifier: 'tab3', content: tab3Content },
  ];
</script>

{#snippet tab1Content()}
  Content for Tab 1
{/snippet}

{#snippet tab2Content()}
  Content for Tab 2
{/snippet}

{#snippet tab3Content()}
  Content for Tab 3
{/snippet}

<Tabs {items} {onSelect} {className} />
