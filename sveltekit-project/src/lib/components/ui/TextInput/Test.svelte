<script lang="ts">
    import TextInput from './TextInput.svelte';
    let { 
        prefixText = '', 
        suffixText = '', 
        ...rest 
    } = $props();
</script>

{#snippet pre()}
    {prefixText}
{/snippet}

{#snippet suf()}
    {suffixText}
{/snippet}

<TextInput 
    {...rest} 
    prefix={prefixText ? pre : undefined} 
    suffix={suffixText ? suf : undefined} 
/>
