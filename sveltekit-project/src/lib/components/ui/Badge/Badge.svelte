<script lang="ts">
	import { badgeVariants } from './variants';
	import { twMerge } from 'tailwind-merge';

	let {
		variant = 'default',
		class: className = '',
		children
	} = $props();
</script>

<span 
	role="status"
	class={twMerge(badgeVariants({ variant, className }))}>
	{#if children}
		{@render children()}
	{/if}
</span>
