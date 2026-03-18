<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { progressFillVariants, progressStepVariants } from './progressVariants';

  let {
    value = 0,
    max = 100,
    label,
    showLabel = false,
    status,
    isIndeterminate = false,
    steps,
    currentStep,
    className,
    ...rest
  } = $props<{
    value?: number;
    max?: number;
    label?: string;
    showLabel?: boolean;
    status?: 'error' | 'success';
    isIndeterminate?: boolean;
    steps?: number;
    currentStep?: number;
    className?: string;
    [key: string]: any;
  }>();

  const uniqueId = `progress-label-${Math.random().toString(36).slice(2, 9)}`;

  const progressPercentage = $derived(max > 0 ? (value / max) * 100 : 0);
  const ariaValueNow = $derived(isIndeterminate ? undefined : Math.round(progressPercentage));
  const ariaInvalid = $derived(status === 'error' ? true : undefined);  
  const labelId = $derived(label && showLabel ? uniqueId : undefined);
  const fillClasses = $derived(progressFillVariants({ status, isIndeterminate }));

  const getStepState = (stepIndex: number) => {
    if (currentStep === undefined || steps === undefined) return undefined;
    if (stepIndex < currentStep) return 'complete';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (stepIndex: number) => {
    const state = getStepState(stepIndex);
    return progressStepVariants({ state });
  };
</script>

{#if showLabel && label}
  <span id={labelId} class="text-sm font-medium text-payroll-teal mb-xs block">
    {label}
  </span>
{/if}

<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax={max}
  aria-valuenow={ariaValueNow}
  aria-invalid={ariaInvalid}
  aria-labelledby={labelId}
  class={cn(
    "w-full bg-payroll-teal/10 rounded-payroll h-sm overflow-hidden relative",
    { "flex items-center justify-between gap-xs px-xs": steps !== undefined },
    className
  )}
  {...rest}
>
  {#if steps !== undefined && currentStep !== undefined}
    {#each Array(steps) as _, i}
      <div
        class={getStepClasses(i)}
        aria-current={i === currentStep ? 'step' : undefined}
      ></div>
    {/each}
  {:else}
    <div
      class={cn(fillClasses, isIndeterminate && "animate-indeterminate")}
      style="width: {isIndeterminate ? 100 : progressPercentage}%"
    ></div>
  {/if}
</div>

<style>
  @keyframes indeterminate {
    0% { transform: translateX(-100%) scaleX(0.2); }
    50% { transform: translateX(0%) scaleX(0.5); }
    100% { transform: translateX(100%) scaleX(0.2); }
  }

  .animate-indeterminate {
    animation: indeterminate 2s infinite linear;
    transform-origin: left;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
</style>
