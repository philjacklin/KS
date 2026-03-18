<script lang="ts">
  import Stat from '$lib/components/ui/Stat/Stat.svelte';
  import { t } from '$lib/stores/localeStore';

  /**
   * Wrapper for Stat component to demonstrate internationalization in Storybook
   * according to coding standards.
   */
  let {
    labelKey = 'stat.total_payroll',
    value = 0,
    ariaLabelKey = 'stat.payroll_statistic',
    variant = 'default',
    className = '',
    currency = 'USD',
    locale = 'en-US',
    trend = undefined,
  } = $props();

  const translatedLabel = $derived($t(labelKey));
  const translatedAriaLabel = $derived($t(ariaLabelKey));
</script>

<Stat
  label={translatedLabel}
  {value}
  ariaLabel={translatedAriaLabel}
  {variant}
  {className}
  {currency}
  {locale}
  {trend}
/>
