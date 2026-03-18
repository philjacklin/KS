<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	let { label, position, disabled, className } = $props();
</script>

<Tooltip 
    {label} 
    placement={position} 
    {disabled} 
    {className}
>
	<button>Trigger</button>
</Tooltip>
