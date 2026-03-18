<script lang="ts">
  import { t } from '$lib/stores/localeStore';
  import { stepperVariants } from './variants';
  import { cn } from '$lib/utils/cn';
  import Button from '$lib/components/ui/button/Button.svelte';

  /**
   * Represents a single step in the stepper.
   */
  interface Step {
    label: string;
    description?: string;
  }

  /**
   * Props for the Stepper component.
   */
  interface Props {
    /** The array of steps to display. */
    steps: Step[];
    /** The index of the currently active step. Defaults to 0. */
    activeStepIndex?: number;
    /** Additional CSS classes for the root element. */
    className?: string;
    /** Callback function when the Finish button is clicked. */
    onFinish?: () => void;
  }

  let { 
    steps = [], 
    activeStepIndex = 0, 
    className,
    onFinish
  }: Props = $props();

  let currentIndex = $state(activeStepIndex);

  $effect(() => {
    currentIndex = activeStepIndex;
  });

  const variants = stepperVariants();

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      currentIndex += 1;
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
    }
  };

  const handleFinish = () => {
    onFinish?.();
  };

  const isLastStep = $derived(currentIndex === steps.length - 1);
  const isFirstStep = $derived(currentIndex === 0);
</script>

<div class={cn('w-full flex flex-col gap-xl', className)}>
  <nav 
    class={variants.root()} 
    aria-label={$t('stepper.progress')}
  >
    <ol class={variants.list()}>
      {#each steps as step, index}
        {@const isActive = index === currentIndex}
        {@const isCompleted = index < currentIndex}
        {@const currentState = isActive ? 'active' : (isCompleted ? 'completed' : 'inactive')}
        
        <li 
          class={variants.item()}
          data-state={currentState}
          aria-current={isActive ? 'step' : undefined}
        >
          <div class={variants.step()}>
            <div class={variants.icon({ state: currentState })}>
              {index + 1}
            </div>
            <span class={variants.label({ state: currentState })}>
              {step.label}
            </span>
          </div>
          
          {#if index < steps.length - 1}
            <div 
              class={cn(
                'h-px flex-1 min-w-xl mx-md transition-colors duration-200',
                isCompleted ? 'bg-payroll-teal' : 'bg-payroll-teal/10'
              )} 
              aria-hidden="true"
            ></div>
          {/if}
        </li>
      {/each}
    </ol>
  </nav>

  <div class="flex justify-end items-center gap-md mt-md">
    <Button 
      variant="outline" 
      onclick={handleBack} 
      disabled={isFirstStep}
    >
      {$t('stepper.back')}
    </Button>

    {#if isLastStep}
      <Button 
        variant="secondary" 
        onclick={handleFinish}
      >
        {$t('stepper.finish')}
      </Button>
    {:else}
      <Button 
        variant="default" 
        onclick={handleNext}
      >
        {$t('stepper.next')}
      </Button>
    {/if}
  </div>
</div>
