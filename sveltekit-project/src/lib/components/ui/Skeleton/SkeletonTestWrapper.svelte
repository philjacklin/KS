<script lang="ts">
  import Skeleton from './Skeleton.svelte';

  // Define props that the story can pass to this wrapper
  let {
    variant = 'rectangle',
    width = 'w-32',
    height = 'h-8',
    class: customClass = '' // Use 'customClass' to avoid keyword conflict
  } = $props();
</script>

<Skeleton {variant} {width} {height} class={customClass} />
