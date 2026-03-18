<script lang="ts">
	import { formFieldVariants } from './variants';
	import { cn } from '../../../utils/cn';

	let {
		id = `form-field-${Math.random().toString(36).substring(2, 9)}`,
		label,
		required = false,
		description = '',
		errorMessage = '',
		className,
		...rest
	} = $props();

	const descriptionId = description ? `description-${id}` : '';
	const errorId = errorMessage ? `error-${id}` : '';

	const describedby = [description ? descriptionId : null, errorMessage ? errorId : null]
		.filter(Boolean)
		.join(' ');

	const hasError = $derived(!!errorMessage);

	const { container, label: labelClass, requiredIndicator, input, description: descriptionClass, errorMessage: errorMessageClass } = formFieldVariants({ error: hasError });
</script>

<div class={cn(container(), className)}>
	<label for={id} class={labelClass()}>
		{label}
		{#if required}
			<span class={requiredIndicator()} aria-hidden="true">*</span>
		{/if}
	</label>

	<input
		{id}
		{required}
		aria-invalid={hasError}
		aria-describedby={describedby || undefined}
		class={input()}
		{...rest}
	/>

	{#if description}
		<p id={descriptionId} class={descriptionClass()}>
			{description}
		</p>
	{/if}

	{#if errorMessage}
		<p id={errorId} class={errorMessageClass()} role="alert">
			{errorMessage}
		</p>
	{/if}
</div>
