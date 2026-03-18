<script>
  import FormField from './FormField.svelte';
  import { t } from '$lib/stores/localeStore.js';

  let { labelKey, placeholderKey, descriptionKey, errorMessageKey, required = false } = $props();
</script>

<FormField
  label={labelKey ? $t(labelKey) : undefined}
  placeholder={placeholderKey ? $t(placeholderKey) : undefined}
  description={descriptionKey ? $t(descriptionKey) : undefined}
  errorMessage={errorMessageKey ? $t(errorMessageKey) : undefined}
  {required}
/>
