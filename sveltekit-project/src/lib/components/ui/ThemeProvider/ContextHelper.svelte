<script>
    import { getContext } from 'svelte';
    
    // Grab the theme context
    const themeCtx = getContext('theme');
    
    // Grab the 'onReady' callback if it was provided in the context
    // (We will set this up in the test)
    const onReady = getContext('test_onReady');

    if (onReady) {
        onReady(themeCtx);
    }
</script>
