<!-- src/lib/components/ui/Alert/AlertStoryWrapper.svelte -->
<script>
  import Alert from './Alert.svelte';
  import { t } from '$lib/stores/localeStore';

  let {
    type = 'info',
    title = '',
    message = '',
    dismissible = false,
    inline = false
  } = $props();

  const translatedTitle = $derived(title ? $t(title) : '');
  const translatedMessage = $derived(message ? $t(message) : '');
</script>

<Alert
  {type}
  title={translatedTitle}
  message={translatedMessage}
  {dismissible}
  {inline}
/>
