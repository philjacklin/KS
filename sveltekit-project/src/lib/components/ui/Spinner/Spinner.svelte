<script lang="ts">
  import { t } from '$lib/stores/localeStore';
  import { spinnerVariants } from './variants';
  import type { VariantProps } from 'tailwind-variants';

  type SpinnerProps = VariantProps<typeof spinnerVariants> & {
    label?: string;
    className?: string;
  };

  let { size, color, className, label }: SpinnerProps = $props();

  const classes = $derived(spinnerVariants({ size, color, className }));
</script>

<!-- The SVG and Span must be siblings, not parent/child -->
<div role="status" aria-live="polite">
  <svg
    class={classes}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
  <span class="sr-only">{$t(label) ?? $t('spinner.loading')}</span>
</div>
