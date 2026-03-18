<script lang="ts">
    import Badge from './Badge.svelte';
    let { content = "Hello, Badge!" } = $props();
</script>

<Badge>
    {content}
</Badge>
