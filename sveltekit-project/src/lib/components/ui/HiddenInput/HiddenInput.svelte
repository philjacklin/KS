<script lang="ts">
    let { name, value }: { name: string, value: string | number } = $props();
</script>

<input type="hidden" {name} {value} />
