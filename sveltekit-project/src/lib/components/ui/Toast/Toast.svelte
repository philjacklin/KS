<script>
  import { toastVariants } from './variants';
  import { t } from '$lib/stores/localeStore';

  let {
    type = 'info',
    message,
    title,
    icon,
    duration = 5000,
    className,
    ondismiss = () => {}
  } = $props();

  let timerId;
  let isPaused = false;
  let remaining = duration;
  let startTime;

  function startTimer() {
    if (remaining > 0) {
      startTime = Date.now();
      timerId = setTimeout(() => {
        ondismiss();
      }, remaining);
    }
  }

  function pauseTimer() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
      const elapsedTime = Date.now() - startTime;
      remaining -= elapsedTime;
    }
  }

  $effect(() => {
    if (!isPaused) {
      startTimer();
    }
    return () => clearTimeout(timerId);
  });

  function handleMouseEnter() {
    isPaused = true;
    pauseTimer();
  }

  function handleMouseLeave() {
    isPaused = false;
    startTimer();
  }

  function handleCloseClick() {
    if (timerId) { // Clear timer only if it's active
      clearTimeout(timerId);
      timerId = null;
    }
    ondismiss();
  }

  const classes = toastVariants({ type, className });
</script>

<div
  role="status"
  aria-live="polite"
  class={classes}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  {#if icon}
    <div class="flex-shrink-0">
      {@render icon()}
    </div>
  {/if}
  <div class="flex-1">
    {#if title}
      <h3 class="font-semibold text-lg">{title}</h3>
    {/if}
    <p class="text-sm">{message}</p>
  </div>
  <button
    class="ml-auto p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-payroll-teal cursor-pointer"
    aria-label={$t('toast.close_button_label')}
    onclick={handleCloseClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</div>
