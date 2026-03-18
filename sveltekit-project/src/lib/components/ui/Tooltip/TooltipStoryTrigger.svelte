<script lang="ts">
	import Tooltip from './Tooltip.svelte';
	import Button from '$lib/components/ui/button/Button.svelte';

	let { 
		label, 
		placement = 'bottom', 
		offset = 8, 
		className = '', 
		triggerText = "Hover me", 
		disabled = false 
	} = $props();
</script>

<div class="flex items-center justify-center min-h-[200px] w-full">
	<Tooltip 
		{label} 
		{placement} 
		{offset} 
		{className}
		{disabled}
	>
		<Button {disabled}>{triggerText}</Button>
	</Tooltip>
</div>
