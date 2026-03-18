<script lang="ts">
    import { rangeSliderVariants } from './variants';
    import { twMerge } from 'tailwind-merge';

    let {
        id,
        label,
        employeeRate,
        value = $bindable(0),
        disabled = false,
        onchange,
        className = ''
    } = $props();

    const minRate = $derived(id === "employer-rate" ? Math.max(employeeRate, 3.5) : employeeRate);
    const maxRate = 30;

    const variants = $derived(rangeSliderVariants({ disabled }));

    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        let newValue = parseFloat(target.value);
        
        // Enforce constraints
        newValue = Math.max(minRate, Math.min(newValue, maxRate));
        
        value = newValue;
        onchange?.(newValue);
    }
</script>

<div class={twMerge(variants.container(), className)}>
    {#if label}
        <label for={id} class={variants.label()}>{label}</label>
    {/if}
    <input
        type="range"
        {id}
        min={minRate}
        max={maxRate}
        step="0.5"
        {value}
        oninput={handleChange}
        {disabled}
        class={variants.input()}
    />
    <div class={variants.valueDisplay()}>
        {value}%
    </div>
</div>
