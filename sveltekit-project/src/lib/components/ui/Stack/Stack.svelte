<script lang="ts">
	import type { Snippet } from 'svelte';
	import { stackVariants, type StackVariants } from './variants';

	// Combine variant props with component-specific props
	type Props = StackVariants & {
		className?: string;
		children: Snippet;
		[key: string]: any;
	};

	// Get all props, including the variants
	let {
		direction,
		spacing,
		align,
		justify,
		className,
		children,
		...rest
	}: Props = $props();

</script>

<div class={stackVariants({ direction, spacing, align, justify, class:className })} {...rest}>
	{@render children?.()}
</div>
