<script lang="ts">
  import Progress from './Progress.svelte';
  import { t } from '$lib/stores/localeStore';

  // Destructure label out, and collect everything else into 'rest'
  let { label, ...rest } = $props<{
    label?: string;
    [key: string]: any;
  }>();

  // Reactively translate if it's a key, otherwise use raw string
  let translatedLabel = $derived(label?.includes('.') ? $t(label) : label);
</script>

<Progress label={translatedLabel} {...rest} />
