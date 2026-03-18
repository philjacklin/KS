<script lang="ts">
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  import { t } from '$lib/stores/localeStore';
  import { ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-svelte';

  type Column = {
    id: string;
    label: string;
  };

  type DataRow = Record<string, any> & { id: any };

  let {
    columns = [],
    data = [],
    stickyHeader = false,
    sortableColumns = [],
    rowSelectionEnabled = false,
    className = '',
  } = $props();

  let sortedBy = $state<{ key: string | null; order: 'asc' | 'desc' }>({ key: null, order: 'asc' });
  let selectedRows = $state(new Set());

  const hasData = $derived(data && data.length > 0);
  const isAllSelected = $derived(hasData && selectedRows.size === data.length);
  const isSomeSelected = $derived(selectedRows.size > 0 && !isAllSelected);

  // --- ACTIONS ---
  function indeterminate(node: HTMLInputElement, value: boolean) {
    node.indeterminate = value;
    return {
      update(newValue: boolean) {
        node.indeterminate = newValue;
      }
    };
  }

function toggleAllRows() {
    if (isAllSelected) {
      selectedRows.clear();
    } else {
      data.forEach(row => selectedRows.add(row.id));
    }
    // Force a fresh Set to ensure reactivity triggers everywhere
    selectedRows = new Set(selectedRows);
  }

  function toggleRow(rowId: any) {
    if (selectedRows.has(rowId)) {
      selectedRows.delete(rowId);
    } else {
      selectedRows.add(rowId);
    }
    selectedRows = new Set(selectedRows);
  }

  const sortedData = $derived((() => {
    if (!sortedBy.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortedBy.key!];
      const bValue = b[sortedBy.key!];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return aValue.getTime() - bValue.getTime();
      }

      // Default to string comparison
      const stringA = String(aValue).toLowerCase();
      const stringB = String(bValue).toLowerCase();

      if (stringA < stringB) return -1;
      if (stringA > stringB) return 1;
      return 0;
    });

    if (sortedBy.order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  })());


  function handleSort(columnId: string) {
    if (!sortableColumns.includes(columnId)) return;

    if (sortedBy.key === columnId) {
      sortedBy.order = sortedBy.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortedBy.key = columnId;
      sortedBy.order = 'asc';
    }
  }

  const mergedClasses = $derived(twMerge(clsx('w-full caption-bottom text-sm', className)));
  
  // Header classes: Background is essential for sticky headers to hide content behind them
  const headerClasses = $derived(
    clsx(
      'border-b border-payroll-teal/10 bg-payroll-paper text-payroll-teal/70',
      'transition-colors'
    )
  );

</script>

<div class={twMerge("relative w-full overflow-auto touch-manipulation rounded-payroll shadow-payroll border border-payroll-teal/5", className)}>
  <table class={mergedClasses} style="border-separate; border-spacing: 0;">
    <thead class={headerClasses}>
      <tr>
        {#if rowSelectionEnabled}
          <th 
              class={clsx(
                "h-12 px-md text-left align-middle font-medium cursor-pointer bg-payroll-paper",
                stickyHeader && "sticky"
              )}
            >
            <input
              type="checkbox"
              use:indeterminate={isSomeSelected}
              class="accent-payroll-teal"
              checked={isAllSelected}
              onchange={toggleAllRows}
              aria-label="Select all rows"
            />
          </th>
        {/if}
        {#each columns as column (column.id)}
          <th
            class={clsx(
              "h-12 px-md text-left align-middle font-medium bg-payroll-paper",
              stickyHeader && "sticky",
              sortableColumns.includes(column.id) && "is-sortable"
            )}            
            onclick={() => handleSort(column.id)}
            aria-sort={sortedBy.key === column.id ? (sortedBy.order === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            <div class="flex items-center gap-sm">
              {$t(column.label)}
              {#if sortableColumns.includes(column.id)}
                {#if sortedBy.key === column.id}
                  {#if sortedBy.order === 'asc'}
                    <ArrowUp class="h-4 w-4" />
                  {:else}
                    <ArrowDown class="h-4 w-4" />
                  {/if}
                {:else}
                  <ChevronsUpDown class="h-4 w-4 text-payroll-teal/30" />
                {/if}
              {/if}
            </div>
          </th>
        {/each}
      </tr>
    </thead>
    {#if hasData}
      <tbody class="[&_tr:last-child]:border-0">
        {#each sortedData as row (row.id)}
          <tr
            class={clsx(
                    "table-row-hover border-b border-payroll-teal/5 transition-colors",
                    selectedRows.has(row.id) && "selected"
                )}              
          >
            {#if rowSelectionEnabled}
              <td class="p-md align-middle [&:has([role=checkbox])]:pr-0">
                <input
                  type="checkbox"
                  class="accent-payroll-teal cursor-pointer"
                  checked={selectedRows.has(row.id)}
                  onchange={() => toggleRow(row.id)}
                  aria-label={`Select row ${row.id}`}
                />
              </td>
            {/if}
            {#each columns as column}
              <td class="p-md align-middle [&:has([role=checkbox])]:pr-0">
                {row[column.id]}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {:else}
      <tbody>
        <tr>
          <td colspan={columns.length + (rowSelectionEnabled ? 1 : 0)} class="h-24 text-center text-payroll-teal/70">
            {$t('table.no_data_available')}
          </td>
        </tr>
      </tbody>
    {/if}
  </table>
</div>

<style>
  /* 1. Sticky Header Fix: Must target the cell (th) and have a background */
  .sticky {
    position: sticky !important;
    top: 0 !important;
    z-index: 30 !important;
    /* We must use a solid background to hide the rows scrolling underneath */
    background-color: var(--payroll-paper); 
    /* Ensures borders stay visible while sticking */
    box-shadow: inset 0 -1px 0 0 color-mix(in srgb, var(--payroll-teal), transparent calc(100% - 10%)); 
  }
  /* 2. Cursor: Pointer only if sortable */
  th.is-sortable {
    cursor: pointer;
  }

  /* 3. Row Hover */
  tr.table-row-hover:hover td {
    background-color: color-mix(in srgb, var(--payroll-teal), transparent calc(100% - 8%)) !important;
  }

  /* 4. Selected state */
  tr.selected td {
    background-color: color-mix(in srgb, var(--payroll-cyan), transparent calc(100% - 10%)) !important;
  }

  /* Ensure the table borders don't disappear with sticky */
  th, td {
    background-clip: padding-box;
  }
</style>
