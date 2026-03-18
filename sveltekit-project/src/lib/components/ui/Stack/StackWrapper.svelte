<script>
  import Stack from '$lib/components/ui/stack/Stack.svelte';
  let { children, ...rest } = $props();
</script>

<Stack {...rest}>
  <div class="bg-payroll-teal text-white p-md rounded-md">Item 1</div>
  <div class="bg-payroll-gold text-payroll-teal p-xl rounded-md">Item 2 (Taller)</div>
  <div class="bg-payroll-cyan text-white p-md rounded-md">Item 3</div>
</Stack>
