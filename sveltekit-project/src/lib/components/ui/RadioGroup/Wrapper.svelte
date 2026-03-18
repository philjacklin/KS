<script lang="ts">
	import RadioGroup from './RadioGroup.svelte';

	let { value, onChange, ...rest } = $props();

	// We use a local state synced with the prop to handle internal changes 
	// while still allowing Storybook controls to override it.
	let internalValue = $state(value);

	$effect(() => {
		internalValue = value;
	});

	function handleInternalChange(newValue: string) {
		internalValue = newValue;
		onChange?.(newValue);
	}
</script>

<RadioGroup 
	{...rest} 
	value={internalValue} 
	onChange={handleInternalChange} 
/>
