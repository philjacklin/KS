<script lang="ts">
  import Stepper from './Stepper.svelte';
  import { t } from '$lib/stores/localeStore';

  let { 
    steps = [
      { label: 'stepper.step1', description: 'stepper.step1.desc' },
      { label: 'stepper.step2', description: 'stepper.step2.desc' },
      { label: 'stepper.step3', description: 'stepper.step3.desc' }
    ], 
    activeStepIndex = 0, 
    className = '',
    onFinish
  } = $props();

  let finished = $state(false);

  const handleFinish = () => {
    finished = true;
    onFinish?.();
  };
</script>

<div class="p-8 bg-payroll-paper min-h-[300px]">
  {#if finished}
    <div class="flex flex-col items-center justify-center h-full gap-4 text-center">
      <h2 class="text-2xl font-bold text-payroll-teal">{$t('stepper.finished.title')}</h2>
      <p class="text-gray-600">{$t('stepper.finished.message')}</p>
      <button 
        class="bg-payroll-teal text-white px-4 py-2 rounded-payroll"
        onclick={() => finished = false}
      >
        {$t('stepper.reset')}
      </button>
    </div>
  {:else}
    <Stepper 
      {steps} 
      {activeStepIndex} 
      {className} 
      onFinish={handleFinish} 
    />
  {/if}
</div>
