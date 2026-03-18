<script lang="ts">
    import { radioGroupVariants } from './variants';
    import { clsx } from 'clsx';
    import { t } from '$lib/stores/localeStore';
    import { twMerge } from 'tailwind-merge';
    import { tick } from 'svelte'; // Import tick

    type Item = {
        value: string;
        labelKey: string;
        disabled?: boolean;
    };

    let {
        items = [],
        value = $bindable(''),
        name,
        orientation = 'vertical',
        onChange,
        className = ''
    } = $props<{
        items: Item[];
        value?: string;
        name: string;
        orientation?: 'vertical' | 'horizontal';
        onChange?: (value: string) => void;
        className?: string;
    }>();

    let focusedIndex = $state(-1);
    let radioRefs = $state<Array<HTMLInputElement | null>>([]);

    // Initialize/Sync indices
    $effect(() => {
        if (radioRefs.length !== items.length) {
            radioRefs = new Array(items.length).fill(null);
        }
        const selectedIndex = items.findIndex((item) => item.value === value);
        if (selectedIndex !== -1) {
            focusedIndex = selectedIndex;
        } else if (focusedIndex === -1) {
            focusedIndex = items.findIndex((item) => !item.disabled);
        }
    });

    async function handleKeyDown(event: KeyboardEvent) {
        if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Enter', ' '].includes(event.key)) return;
        
        event.preventDefault();
        const direction = (event.key === 'ArrowDown' || event.key === 'ArrowRight') ? 1 : -1;

        if (event.key === 'Enter' || event.key === ' ') {
            if (focusedIndex !== -1 && !items[focusedIndex].disabled) {
                value = items[focusedIndex].value;
                onChange?.(value);
            }
            return;
        }

        // Navigation logic
        let nextIndex = focusedIndex;
        for (let i = 1; i <= items.length; i++) {
            const candidate = (focusedIndex + i * direction + items.length) % items.length;
            if (!items[candidate].disabled) {
                nextIndex = candidate;
                break;
            }
        }

        if (nextIndex !== focusedIndex) {
            focusedIndex = nextIndex;
            await tick(); // Wait for tabindex to update in DOM
            radioRefs[focusedIndex]?.focus();
        }
    }
</script>

<div
    class={twMerge(radioGroupVariants({ orientation }), className)}
    role="radiogroup"
    onkeydown={handleKeyDown}
>
    {#each items as item, index}
        <label
            class={clsx(
                'inline-flex items-center cursor-pointer',
                item.disabled && 'cursor-not-allowed opacity-50'
            )}
        >
            <input
                type="radio"
                {name}
                value={item.value}
                checked={value === item.value}
                disabled={item.disabled}
                bind:this={radioRefs[index]}
                onchange={() => { value = item.value; onChange?.(value); }}
                tabindex={focusedIndex === index ? 0 : -1}
                class="appearance-none h-4 w-4 rounded-full border-2 border-payroll-teal/30 checked:bg-payroll-teal"
            />
            <span class="ml-2">{$t(item.labelKey)}</span>
        </label>
    {/each}
</div>
