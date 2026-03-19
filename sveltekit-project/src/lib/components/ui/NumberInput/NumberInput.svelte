<script lang="ts">
    import { numberInputVariants } from './variants';
    import { twMerge } from 'tailwind-merge';
    import type { Snippet } from 'svelte';

    let idCounter = 0;

    let {
        id: idProp,
        type = 'default',
        label = '',
        placeholder = '',
        error = false,
        errorMessage = '',
        helpText = '',
        disabled = false,
        value = $bindable(null),
        allowNegative = false,
        min = -Infinity,
        max = Infinity,
        step = 1,
        onChange,
        class: customClass,
        leadingIcon,
        trailingIcon,
        ...restProps
    }: {
        type?: 'currency' | 'tax-rate' | 'default';
        label?: string;
        placeholder?: string;
        error?: boolean;
        errorMessage?: string;
        helpText?: string;
        disabled?: boolean;
        value?: number | null;
        allowNegative?: boolean;
        min?: number;
        max?: number;
        step?: number;
        onChange?: (value: number | null) => void;
        class?: string;
        leadingIcon?: Snippet;
        trailingIcon?: Snippet;
        [key: string]: any;
    } = $props();

    const id = idProp || `number-input-${++idCounter}`;
    const errorId = `error-${id}`;
    const helpId = `help-${id}`;

    let displayValue = $state('');
    let isFocused = $state(false);

    const { wrapper, input, prefix, suffix } = numberInputVariants({
        error,
        disabled,
        hasPrefix: type === 'currency',
        hasSuffix: type === 'tax-rate'
    });

    const formatValue = (val: number | null) => {
        if (val === null || isNaN(val)) return '';
        return new Intl.NumberFormat('en-NZ', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(val);
    };

    $effect(() => {
        if (!isFocused) displayValue = formatValue(value);
    });

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        let rawValue = target.value;

        let filteredValue = rawValue.replace(/[^0-9.-]/g, '');

        if (!allowNegative) {
            filteredValue = filteredValue.replace(/-/g, '');
        } else {
            const isNegative = filteredValue.startsWith('-');
            filteredValue = filteredValue.replace(/-/g, '');
            if (isNegative) filteredValue = '-' + filteredValue;
        }

        const parts = filteredValue.split('.');
        if (parts.length > 2) {
            filteredValue = parts[0] + '.' + parts.slice(1).join('');
        }

        let numericValue = parseFloat(filteredValue);
        
        if (!isNaN(numericValue)) {
            // CLAMP HERE before updating state or calling onChange
            numericValue = Math.min(Math.max(numericValue, min), max);
            
            // If the value was clamped, we update the display string 
            // so the user sees it immediately
            displayValue = isFocused ? numericValue.toString() : formatValue(numericValue);
            value = numericValue;
            onChange?.(numericValue);
        } else {
            displayValue = filteredValue;
            value = null;
            onChange?.(null);
        }
    }
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const increment = e.key === 'ArrowUp' ? step : -step;
            const newValue = Math.min(Math.max((value || 0) + increment, min), max);
            value = newValue;
            displayValue = isFocused ? newValue.toString() : formatValue(newValue);
            onChange?.(newValue);
        }
    }
</script>

<div class={twMerge(wrapper(), customClass)}>
    {#if label}
        <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
    {/if}
    <div class="relative mt-1 flex items-center">
        {#if type === 'currency'}
            <div class={prefix()}>$</div>
        {:else if leadingIcon}
            <div class="absolute left-3 flex items-center">{@render leadingIcon()}</div>
        {/if}

        <input {...restProps}
            type="text"
            {id}
            {placeholder}
            bind:value={displayValue}
            oninput={handleInput}
            onkeydown={handleKeyDown}
            onfocus={() => { isFocused = true; displayValue = value?.toString() ?? ''; }}
            onblur={() => { isFocused = false; displayValue = formatValue(value); }}
            class={twMerge(input(), (leadingIcon || type === 'currency') ? 'pl-10' : '')}
            aria-invalid={error}
            aria-describedby={twMerge(error ? errorId : '', helpText ? helpId : '')}
            inputmode="decimal"
            {disabled}
        />

        {#if type === 'tax-rate'}
            <div class={suffix()}>%</div>
        {:else if trailingIcon}
            <div class="absolute right-3 flex items-center">{@render trailingIcon()}</div>
        {/if}
    </div>
    
    {#if helpText && !error}
        <p id={helpId} class="text-sm text-gray-500 mt-1">{helpText}</p>
    {/if}

    {#if error && errorMessage}
        <span id={errorId} class="text-sm text-red-600 mt-1">{errorMessage}</span>
    {/if}
</div>
