<script>
	import Container from './Container.svelte';
	let { maxWidth, customClass, childrenText = 'Test' } = $props();
</script>

<Container {maxWidth} className={customClass}>
	<div>{childrenText}</div>
</Container>
