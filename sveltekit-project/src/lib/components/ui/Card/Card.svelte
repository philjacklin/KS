<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { card } from './card.variants';

  let {
    variant = 'default',
    children,
    className = '',
    ...rest
  } = $props();
</script>

<div class={cn(card({variant}), className)} {...rest}>
  {@render children?.()}
</div>
