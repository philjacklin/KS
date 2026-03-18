<script lang="ts">
  import { t } from '$lib/stores/localeStore';
  import { breadcrumbVariants } from './variants';
  import { twMerge } from 'tailwind-merge';

  /**
   * Represents an individual breadcrumb navigation item.
   */
  export interface BreadcrumbItem {
    label: string;
    path: string;
  }

  interface Props {
    /**
     * An array of breadcrumb items to display.
     */
    items?: BreadcrumbItem[];
    /**
     * Optional additional CSS classes for the navigation container.
     */
    className?: string;
  }

  let { 
    items = [], 
    className = '' 
  }: Props = $props();

  const slots = $derived(breadcrumbVariants());
  
  const navClass = $derived(twMerge(slots.base(), className));
  const lastIndex = $derived(items.length - 1);
</script>

<nav
  aria-label={$t('breadcrumb.label')}
  class={navClass}
>
  <ol class={slots.list()}>
    {#each items as breadcrumbItem, index}
      {@const isLast = index === lastIndex}
      <li class={slots.item()}>
        {#if !isLast}
          <a
            href={breadcrumbItem.path}
            class={slots.link()}
          >
            {$t(breadcrumbItem.label)}
          </a>

          <span
            class={slots.separator()}
            aria-hidden='true'
          >
            /
          </span>
        {:else}
          <span
            class={slots.current()}
            aria-current='page'
          >
            {$t(breadcrumbItem.label)}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
</style>
