<script lang="ts">
	import { avatarVariants } from './variants';

	interface Props {
		/** The size of the avatar (e.g., '40px', '80px'). Defaults to '40px'. */
		size?: string;
		/** The name of the user, used for the aria-label and initials. */
		name: string;
		/** The URL of the user's avatar image. */
		imageUrl?: string;
		/** Additional CSS classes for the component. */
		className?: string;
	}

	let { 
		size = '40px', 
		name = '', 
		imageUrl,
		className = '' 
	}: Props = $props();

	let imageError = $state(false);

	// Reset error state if the imageUrl changes
	$effect(() => {
		imageUrl;
		imageError = false;
	});

	const { base, image, fallback } = avatarVariants();

	// Calculate initials (max 2 characters, from first and last parts of the name)
	const initials = $derived.by(() => {
		const parts = name.trim().split(' ').filter(Boolean);
		if (parts.length === 0) return '';
		if (parts.length === 1) return parts[0][0].toUpperCase();
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	});

	// Styles for dynamic sizing - used for arbitrary prop values
	const containerStyle = $derived(`width: ${size}; height: ${size};`);
	// Heuristic for font size: 40% of the avatar size for readability
	const textStyle = $derived(`font-size: calc(${size} / 2.5);`);

	function handleImageError() {
		imageError = true;
	}
</script>

<div
	class={base({ class: className })}
	style={containerStyle}
	aria-label={name}
	role="img"
>
	{#if imageUrl && !imageError}
		<img
			src={imageUrl}
			alt=""
			class={image()}
			onerror={handleImageError}
		/>
	{:else}
		<span 
			class={fallback()}
			style={textStyle}
		>
			{initials}
		</span>
	{/if}
</div>

<style>
	/* Styles are managed by tailwind-variants in variants.ts */
</style>
