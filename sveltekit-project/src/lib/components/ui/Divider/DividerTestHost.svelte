<script lang="ts">
    import Divider from './Divider.svelte';
    // Capture all props passed from the test
    let { ...props } = $props();
</script>

<Divider {...props} />
