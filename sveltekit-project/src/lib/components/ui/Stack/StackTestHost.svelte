<script lang="ts">
    import Stack from './Stack.svelte';
    // We explicitly type the props to match what Stack expects
    let { 
        direction = 'vertical', 
        spacing = 'md', 
        align = 'stretch', 
        justify = 'start', 
        className = '',
        childrenText = 'Child 1'
    } = $props();
</script>

<Stack {direction} {spacing} {align} {justify} {className}>
    <div>{childrenText}</div>
    <div>Child 2</div>
</Stack>
