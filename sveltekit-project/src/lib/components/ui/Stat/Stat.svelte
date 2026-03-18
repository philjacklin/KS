<script lang="ts">
  import { t } from '$lib/stores/localeStore';
  import { statVariants } from './variants';
  import { twMerge } from 'tailwind-merge';

  interface Props {
    /** The label display above the value (translation key) */
    label: string;
    /** The numeric value to display */
    value: number;
    /** The translation key for the aria-label of the section */
    ariaLabel?: string;
    /** Optional variant for styling */
    variant?: 'default' | 'cyan';
    /** Additional CSS classes */
    className?: string;
    /** The currency to use for formatting (default: USD) */
    currency?: string;
    /** Locale for formatting (default: en-US) */
    locale?: string;
    /** The trend direction */
    trend?: 'up' | 'down' | 'neutral';
  }

  let {
    label,
    value,
    ariaLabel = 'stat.payroll_statistic',
    variant = 'default',
    className = '',
    currency = 'USD',
    locale = 'en-US',
    trend,
  }: Props = $props();

  const styles = $derived(statVariants({ variant, trend }));

  const formattedValue = $derived(
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value)
  );

  const trendPath = $derived.by(() => {
    switch (trend) {
      case 'up':
        return 'M7 11l5-5 5 5M12 18V6';
      case 'down':
        return 'M7 13l5 5 5-5M12 6v12';
      case 'neutral':
        return 'M5 12h14';
      default:
        return '';
    }
  });
</script>

<section 
  aria-label={$t(ariaLabel)} 
  class={twMerge(styles.root(), className)}
>
  <span class={styles.label()}>
    {$t(label)}
  </span>
  <div class={styles.valueContainer()}>
    <span class={styles.value()}>
      {formattedValue}
    </span>
    {#if trend}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class={styles.trend()}
        aria-hidden="true"
      >
        <path d={trendPath} />
      </svg>
    {/if}
  </div>
</section>
