<script lang="ts">
	import { computePosition, offset as offsetMiddleware, flip, shift } from '@floating-ui/dom';
	import { slide } from 'svelte/transition';
	import { dropdownMenuVariants, dropdownMenuItemVariants } from './variants';
	import { twMerge } from 'tailwind-merge';
	import { t } from '$lib/stores/localeStore';
	import type { Snippet } from 'svelte';

	interface MenuItem {
		label: string;
		onClick?: () => void;
		variant?: 'default' | 'danger';
		disabled?: boolean;
		active?: boolean;
	}

	interface Props {
		trigger?: Snippet;
		content?: Snippet<[() => void]>;
		items?: MenuItem[];
		placement?: import('@floating-ui/dom').Placement;
		offset?: number;
		className?: string;
		contentClass?: string;
		isOpen?: boolean;
	}

	let {
		trigger,
		content,
		items = [],
		placement = 'bottom-start',
		offset = 4,
		className = '',
		contentClass = '',
		isOpen = $bindable(false)
	} = $props<Props>();

	let triggerEl = $state<HTMLElement>();
	let menuEl = $state<HTMLElement>();
	let focusedIndex = $state(-1);

	function toggle() {
		if (isOpen) {
			close();
		} else {
			isOpen = true;
			focusedIndex = -1;
		}
	}

	function close() {
		isOpen = false;
		focusedIndex = -1;
	}

	function handleItemClick(item: MenuItem) {
		if (item.disabled) return;
		close();
		item.onClick?.();
	}

	function focusItem(index: number) {
		if (!menuEl) return;
		const buttons = menuEl.querySelectorAll('button');
		if (buttons && buttons[index]) {
			(buttons[index] as HTMLElement).focus();
		}
	}

	function focusFirstEnabledItem() {
		const enabledIndex = items.findIndex((item) => !item.disabled);
		if (enabledIndex !== -1) {
			focusedIndex = enabledIndex;
			focusItem(focusedIndex);
		}
	}

	function focusLastEnabledItem() {
		for (let i = items.length - 1; i >= 0; i--) {
			if (!items[i].disabled) {
				focusedIndex = i;
				focusItem(focusedIndex);
				return;
			}
		}
	}

	function navigateItems(direction: number) {
		if (items.length === 0) return;

		let newIndex = focusedIndex;
		const startSearchIndex = focusedIndex;

		do {
			newIndex = (newIndex + direction + items.length) % items.length;
			if (!items[newIndex].disabled) {
				focusedIndex = newIndex;
				focusItem(focusedIndex);
				return;
			}
		} while (newIndex !== startSearchIndex);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				navigateItems(1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				navigateItems(-1);
				break;
			case 'Home':
				event.preventDefault();
				focusFirstEnabledItem();
				break;
			case 'End':
				event.preventDefault();
				focusLastEnabledItem();
				break;
			case 'Escape':
				event.preventDefault();
				close();
				triggerEl?.focus();
				break;
			case 'Tab':
				close();
				break;
		}
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (!isOpen) {
				isOpen = true;
				setTimeout(focusFirstEnabledItem, 0);
			} else {
				close();
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!isOpen) {
				isOpen = true;
				setTimeout(focusFirstEnabledItem, 0);
			} else {
				// If already open, move focus to the first item if focus was on trigger
				focusFirstEnabledItem();
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!isOpen) {
				isOpen = true;
				setTimeout(focusLastEnabledItem, 0);
			} else {
				focusLastEnabledItem();
			}
		}
	}

	$effect(() => {
		if (isOpen && triggerEl && menuEl) {
			computePosition(triggerEl, menuEl, {
				placement,
				middleware: [offsetMiddleware(Number(offset)), flip(), shift({ padding: 8 })]
			}).then(({ x, y }) => {
				if (!menuEl) return;
				Object.assign(menuEl.style, {
					left: `${x}px`,
					top: `${y}px`,
					position: 'absolute',
					zIndex: '50'
				});
			});
		}
	});

	// Global listeners for click-outside and Escape
	$effect(() => {
		if (isOpen) {
			const handleClickOutside = (event: MouseEvent) => {
				const target = event.target as Node;
				if (
					triggerEl &&
					!triggerEl.contains(target) &&
					menuEl &&
					!menuEl.contains(target)
				) {
					close();
				}
			};

			const handleGlobalKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					close();
					triggerEl?.focus();
				}
			};

			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleGlobalKeyDown);

			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
				document.removeEventListener('keydown', handleGlobalKeyDown);
			};
		}
	});

	const menuId = $derived(`menu-${Math.random().toString(36).slice(2, 9)}`);
</script>

<div class={twMerge('relative inline-block', className)}>
	<div
		bind:this={triggerEl}
		onclick={toggle}
		onkeydown={handleTriggerKeydown}
		class="cursor-pointer focus:outline-none"
		role="button"
		tabindex="0"
		aria-haspopup="menu"
		aria-expanded={isOpen}
		aria-controls={menuId}
	>
		{@render trigger?.()}
	</div>

	{#if isOpen}
		<div
			bind:this={menuEl}
			id={menuId}
			class={twMerge(dropdownMenuVariants(), contentClass)}
			transition:slide={{ duration: 150 }}
			onkeydown={handleKeydown}
			role="menu"
			tabindex="-1"
		>
			{#if content}
				{@render content(close)}
			{:else}
				{#each items as item, index}
					<button
						type="button"
						class={dropdownMenuItemVariants({ variant: item.variant, active: item.active })}
						onclick={() => handleItemClick(item)}
						disabled={item.disabled}
						role="menuitem"
						tabindex={focusedIndex === index ? 0 : -1}
					>
						{$t(item.label)}
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Styles are handled by Tailwind CSS via variants.ts */
</style>
