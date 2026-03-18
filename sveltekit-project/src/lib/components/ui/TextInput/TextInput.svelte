<script lang="ts">
	import { type Snippet } from 'svelte';
	import { cn } from "$lib/utils/cn";
	import { textInputVariants } from './variants';

	let {
		id,
		name,
		placeholder = '',
		value = '',
		disabled = false,
		required = false,
		prefix: prefixSnippet,
		suffix: suffixSnippet,
		error = false,
		errorMessage = '',
		onChange,
		className
	}: {
		id: string;
		name: string;
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		prefix?: Snippet;
		suffix?: Snippet;
		error?: boolean;
		errorMessage?: string;
		onChange?: (event: Event) => void;
		className?: string;
	} = $props();

	const { container, input, prefix, suffix } = textInputVariants({
		error,
		disabled
	});

	const errorId = `${id}-error`;
</script>

<div class={cn(container(), className)}>
	{#if prefixSnippet}
        <span class={prefix()}>
            {#if typeof prefixSnippet === 'function'}
                {@render prefixSnippet()}
            {:else}
                {prefixSnippet}
            {/if}
        </span>
    {/if}
	<input
		{id}
		{name}
		{placeholder}
		bind:value
		{disabled}
		{required}
		class={input()}
		aria-invalid={error}
		aria-describedby={error ? errorId : undefined}
		onchange={onChange}
	/>
	{#if required}
        <span 
            class="pr-2 text-payroll-destructive select-none" 
            aria-hidden="true"
            data-testid="required-indicator"
        >
            *
        </span>
    {/if}
	{#if suffixSnippet}
        <span class={suffix()}>
            {#if typeof suffixSnippet === 'function'}
                {@render suffixSnippet()}
            {:else}
                {suffixSnippet}
            {/if}
        </span>
    {/if}
</div>

{#if error && errorMessage}
	<p id={errorId} class="text-payroll-error text-sm mt-1">
		{errorMessage}
	</p>
{/if}
