<script lang="ts">
  import Table from '$lib/components/ui/table/Table.svelte';

  let { columns, data, stickyHeader, sortableColumns, rowSelectionEnabled, className } = $props();
</script>

<Table {columns} {data} {stickyHeader} {sortableColumns} {rowSelectionEnabled} {className} />
