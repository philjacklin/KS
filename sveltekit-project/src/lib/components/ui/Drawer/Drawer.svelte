<script lang="ts">
	import { type VariantProps } from 'tailwind-variants';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { drawerVariants, drawerContentVariants } from './variants'; // Import variants

	type $$Props = VariantProps<typeof drawerVariants> & {
		isOpen: boolean;
		position?: 'left' | 'right' | 'top' | 'bottom';
		onClose: () => void;
		class?: string;
		children: import('svelte').Snippet;
	};

	let {
		isOpen,
		position = 'left',
		onClose,
		class: className,
		children
	} = $props();

	const transitions = {
		left: { x: -320, duration: 300, easing: quintOut },
		right: { x: 320, duration: 300, easing: quintOut },
		top: { y: -200, duration: 300, easing: quintOut },
		bottom: { y: 200, duration: 300, easing: quintOut }
	};
</script>

{#if isOpen}
	<div
		class={drawerVariants({ position, class: className })}
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
		role="presentation"
	>
		<div
			class={drawerContentVariants({ position })} 
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			in:fly={transitions[position]}
			out:fly={transitions[position]}
		>
			{@render children()}
		</div>
	</div>
{/if}

