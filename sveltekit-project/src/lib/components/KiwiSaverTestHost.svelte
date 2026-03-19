<script lang="ts">
    import KiwiSaver from './KiwiSaver.svelte';
    let props = $props();
</script>

<form>
    <KiwiSaver {...props} />
</form>
