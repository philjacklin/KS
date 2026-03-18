<script lang="ts">
  import { t } from '$lib/stores/localeStore';
  import { sidebarVariants } from './variants';
  import { twMerge } from 'tailwind-merge';
  import type { Snippet } from 'svelte';

  interface Props {
    isOpen?: boolean;
    children?: Snippet;
    className?: string;
  }

  let { 
    isOpen = false, 
    children, 
    className = '' 
  }: Props = $props();

  const styles = $derived(sidebarVariants({ isOpen }));
</script>

<aside data-state={isOpen ? 'open' : 'closed'} class={twMerge(styles.root(), className)}>
  <nav aria-label={$t('sidebar.aria_label')} class={styles.nav()}>
    {#if children}
      {@render children()}
    {/if}
  </nav>
</aside>

<style>
  /* This CSS stays inside the component and works in EVERY project */
  aside {
    transition: transform 0.3s ease-in-out;
  }

  aside[data-state="closed"] {
    transform: translateX(-100%);
  }

  aside[data-state="open"] {
    transform: translateX(0);
  }
</style>