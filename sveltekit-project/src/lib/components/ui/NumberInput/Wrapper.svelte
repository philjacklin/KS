<script lang="ts">
    import NumberInput from './NumberInput.svelte';

    type $$Props = {
        type: 'currency' | 'tax-rate';
        label: string;
        error?: boolean;
        errorMessage?: string;
        disabled?: boolean;
        value: number | null;
        allowNegative?: boolean;
        maxValue?: number;
    };

    let { value, ...rest } = $props();
    let internalValue = $state(value);

    function handleChange(newValue: number | null) {
        internalValue = newValue;
    }
</script>

<NumberInput {...rest} value={internalValue} onChange={handleChange} />
