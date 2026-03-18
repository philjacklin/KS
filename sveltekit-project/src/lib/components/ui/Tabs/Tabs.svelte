<script lang="ts">
  import type { Snippet } from 'svelte';
  import { t } from '$lib/stores/localeStore';
  import { tabVariants } from './variants';

  type TabItem = {
    labelKey: string;
    identifier: string;
    content: Snippet;
  };

  let {
    items,
    className,
    onSelect
  }: {
    items: TabItem[];
    className?: string;
    onSelect?: (identifier: string) => void;
  } = $props();

  let activeTabIdentifier = $state(items[0]?.identifier || '');

  function handleTabClick(identifier: string) {
    activeTabIdentifier = identifier;
    if (onSelect) {
      onSelect(identifier);
    }
  }

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const tabs = Array.from(event.currentTarget?.parentElement?.children || []) as HTMLElement[];
    let newIndex = index;

    if (event.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
      event.preventDefault();
    }

    if (newIndex !== index) {
      const newTab = tabs[newIndex];
      if (newTab instanceof HTMLButtonElement) {
        newTab.focus();
        handleTabClick(items[newIndex].identifier);
      }
    }
  }
</script>

<div class={className}>
  <div
    class="flex border-b border-payroll-teal/10"
    role="tablist"
    aria-label="Tabs"
  >
    {#each items as item, index}
      <button
        role="tab"
        id="tab-{item.identifier}"
        aria-controls="tabpanel-{item.identifier}"
        aria-selected={activeTabIdentifier === item.identifier}
        tabindex={activeTabIdentifier === item.identifier ? 0 : -1}
        onclick={() => handleTabClick(item.identifier)}
        onkeydown={(event) => handleKeyDown(event, index)}
        class={tabVariants({ isActive: activeTabIdentifier === item.identifier })}
      >
        {$t(item.labelKey)}
      </button>
    {/each}
  </div>

  {#each items as item}
    <div
      role="tabpanel"
      id="tabpanel-{item.identifier}"
      aria-labelledby="tab-{item.identifier}"
      hidden={activeTabIdentifier !== item.identifier}
      class="p-6 bg-white rounded-b-lg shadow-payroll"
    >
      {@render item.content()}
    </div>
  {/each}
</div>

<style>
</style>
