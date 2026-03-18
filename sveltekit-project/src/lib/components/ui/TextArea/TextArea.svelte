<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { textAreaVariants } from './variants';

	let {
		className, // Correctly accept `className` as the prop
		maxHeight,
		...rest
	}: {
		className?: string;
		maxHeight?: number;
		[x: string]: any;
	} = $props();

	let textarea: HTMLTextAreaElement;
	let value = $state('');

	$effect(() => {
		if (textarea) {
			// Ensure the effect is reactive to value changes by referencing it
			const currentValue = value;
			textarea.style.height = 'auto';
			const { scrollHeight } = textarea;

			if (maxHeight && scrollHeight > maxHeight) {
				textarea.style.height = `${maxHeight}px`;
				textarea.style.overflowY = 'auto';
			} else {
				textarea.style.height = `${scrollHeight}px`;
				textarea.style.overflowY = 'hidden';
			}
		}
	});
</script>

<textarea
	bind:this={textarea}
	bind:value
	class={twMerge(textAreaVariants(), className)}
	{...rest}
></textarea>
