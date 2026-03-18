<script lang="ts">
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { t } from '$lib/stores/localeStore';
	import { selectVariants } from './variants';

	// Props
	let {
		options = [],
		value = null,
		multiple = false,
		placeholder = $t('select.placeholder'),
		disabled = false,
		showSelectedCount = false,
		className = '',
		onchange // Callback prop for Svelte 5
	} = $props();

	// State
	let open = $state(false);
	let selected = $state(value);
	let searchTerm = $state('');
	let focusedIndex = $state(-1);

	// Refs
	let toggleButton: HTMLButtonElement;
	let searchInput: HTMLInputElement;
	let listbox: HTMLUListElement;

	// Sync internal state if the prop changes
	$effect(() => {
		selected = value;
	});

	const classes = $derived(selectVariants({ isOpen: open }));

	let filteredOptions = $derived(
		options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	const selectedLabels = $derived(
		Array.isArray(selected)
			? options.filter((option) => selected.includes(option.value)).map((option) => option.label)
			: options.find((option) => option.value === selected)?.label || ''
	);

	const displayLabel = $derived.by(() => {
		if (multiple) {
			if (showSelectedCount) {
				const count = Array.isArray(selected) ? selected.length : 0;
				return count > 0 ? `${count} ${$t('select.items_selected')}` : placeholder;
			}
			const labels = Array.isArray(selectedLabels) ? selectedLabels.join(', ') : '';
			return labels || placeholder;
		}
		return selectedLabels || placeholder;
	});

	$effect(() => {
		searchTerm; 
		focusedIndex = -1;
	});

	$effect(() => {
		if (open && searchInput) {
			searchInput.focus();
		}
	});

	function toggleDropdown() {
		if (disabled) return;
		open = !open;
		if (!open) searchTerm = '';
	}

	function handleOptionClick(optionValue: any) {
		if (multiple) {
			const currentSelected = Array.isArray(selected) ? [...selected] : [];
			const index = currentSelected.indexOf(optionValue);
			if (index > -1) {
				currentSelected.splice(index, 1);
			} else {
				currentSelected.push(optionValue);
			}
			selected = currentSelected;
			onchange?.(selected);
		} else {
			selected = optionValue;
			onchange?.(selected);
			open = false;
		}
	}

	function clearAll() {
		if (multiple) {
			selected = [];
			onchange?.([]);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (!open) {
					open = true;
				} else {
					focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
					scrollIntoView(focusedIndex);
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (open) {
					focusedIndex = Math.max(focusedIndex - 1, 0);
					scrollIntoView(focusedIndex);
				}
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (open && focusedIndex > -1) {
					handleOptionClick(filteredOptions[focusedIndex].value);
				} else {
					toggleDropdown();
				}
				break;
			case 'Escape':
				open = false;
				break;
			case 'Tab':
				if (open) open = false;
				break;
		}
	}

	function scrollIntoView(index: number) {
		const items = listbox?.querySelectorAll('li');
		if (items && items[index]) {
			// This can crash in Vitest/JSDOM if not mocked
			items[index].scrollIntoView?.({ block: 'nearest' });
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (open && toggleButton && !toggleButton.contains(event.target as Node) && listbox && !listbox.contains(event.target as Node)) {
			open = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => document.removeEventListener('click', handleClickOutside, true);
	});
</script>

<div class={twMerge('relative w-full', className)} onkeydown={handleKeydown} role="none">
	<button
		bind:this={toggleButton}
		type="button"
		class={classes.button()}
		onclick={toggleDropdown}
		disabled={disabled}
		aria-haspopup="listbox"
		aria-expanded={open}
	>
		<span class="truncate">{displayLabel}</span>
		<svg class={classes.dropdownIcon()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
		</svg>
	</button>

	{#if open}
		<div class={classes.listbox()} role="listbox" tabindex="-1">
			<div class="p-2">
				<input
					bind:this={searchInput}
					type="text"
					placeholder={$t('select.search_placeholder')}
					class={classes.searchInput()}
					value={searchTerm}
					oninput={(e) => (searchTerm = e.currentTarget.value)}
				/>
			</div>

			{#if multiple}
				<div class="flex justify-end px-2 pb-2">
					<button type="button" class={classes.clearButton()} onclick={clearAll}>
						{$t('select.clear_all')}
					</button>
				</div>
			{/if}

			<ul bind:this={listbox} class="py-1 overflow-auto max-h-60 outline-none">
				{#each filteredOptions as opt, index}
					<li
						id={`option-${index}`}
						class={classes.option({
							focused: focusedIndex === index,
							selected: multiple
								? Array.isArray(selected) && selected.includes(opt.value)
								: selected === opt.value
						})}
						role="option"
						aria-selected={multiple
							? Array.isArray(selected) && selected.includes(opt.value)
							: selected === opt.value}
						onclick={() => handleOptionClick(opt.value)}
					>
						<span class="truncate">{opt.label}</span>
						{#if (multiple && Array.isArray(selected) && selected.includes(opt.value)) || (!multiple && selected === opt.value)}
							<svg class={classes.checkIcon()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
							</svg>
						{/if}
					</li>
				{:else}
					<li class={classes.noResults()}>{$t('select.no_results')}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
