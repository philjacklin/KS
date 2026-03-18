<script lang="ts">
  import Switch from '$lib/components/ui/Switch/Switch.svelte';
  import type { SwitchProps } from '$lib/components/ui/Switch/variants';

  type $$Props = SwitchProps & { id: string; label: string };
  export let id: string;
  export let label: string = 'Enable Notifications';
</script>

<div class="flex items-center space-x-2">
  <Switch {...$$props} on:click />
  <label for={id}>{label}</label>
</div>
