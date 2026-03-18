<script lang="ts">
  import Modal from './Modal.svelte';
  import { t } from '$lib/stores/localeStore';
  
  let { isOpen, titleKey } = $props();
</script>

<Modal {isOpen} {titleKey}>
<form onsubmit={(e) => e.preventDefault()}>
      <div class="mb-md">
      <label for="name" class="block text-payroll-teal/80 text-sm font-semibold mb-sm">{$t('form.name_label')}</label>
      <input type="text" id="name" name="name" class="shadow-sm appearance-none border border-payroll-teal/20 rounded-md w-full py-xs px-sm text-payroll-teal leading-tight focus:outline-none focus:ring-2 focus:ring-payroll-teal bg-white">
    </div>
    <div class="mb-lg">
      <label for="email" class="block text-payroll-teal/80 text-sm font-semibold mb-sm">{$t('form.email_label')}</label>
      <input type="email" id="email" name="email" class="shadow-sm appearance-none border border-payroll-teal/20 rounded-md w-full py-xs px-sm text-payroll-teal leading-tight focus:outline-none focus:ring-2 focus:ring-payroll-teal bg-white">
    </div>
    <div class="flex items-center justify-end">
      <button class="bg-payroll-gold hover:bg-payroll-gold/80 text-payroll-teal px-lg py-sm rounded-md font-bold transition-all shadow-sm" type="submit">
        {$t('form.submit_button')}
      </button>
    </div>
  </form>
</Modal>
