<script lang="ts">
	import TextArea from './TextArea.svelte';
	let {
		className,
		maxHeight,
		...rest
	}: {
		className?: string;
		maxHeight?: number;
		[x: string]: any;
	} = $props();
</script>

<TextArea {className} {maxHeight} {...rest} />
