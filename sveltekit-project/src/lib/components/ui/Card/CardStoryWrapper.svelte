<script>
  import Card from '$lib/components/ui/Card/Card.svelte';
  import { t } from '$lib/stores/localeStore';

  let { variant = 'default', contentKey = 'card.default_text' } = $props();
</script>

<Card {variant}>
  {$t(contentKey)}
</Card>
