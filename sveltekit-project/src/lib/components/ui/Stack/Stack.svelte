<script lang="ts">
	import type { Snippet } from 'svelte';
	import { stackVariants, type StackVariants } from './variants';

	// Combine variant props with component-specific props
	type Props = StackVariants & {
		className?: string;
		children: Snippet;
	};

	// Get all props, including the variants
	let {
		direction,
		spacing,
		align,
		justify,
		className,
		children
	}: Props = $props();

</script>

<div class={stackVariants({ direction, spacing, align, justify, className })}>
	{@render children?.()}
</div>
