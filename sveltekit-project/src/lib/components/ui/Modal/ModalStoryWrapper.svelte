<script lang="ts">
  import Modal from './Modal.svelte';
  import { t } from '$lib/stores/localeStore';

  let { isOpen, titleKey } = $props();
</script>

<Modal {isOpen} {titleKey}>
  <div class="space-y-4">
    <p>{$t('modal.long_content.paragraph_1')}</p>
    <p>{$t('modal.long_content.paragraph_2')}</p>
    <p>{$t('modal.long_content.paragraph_3')}</p>
    <p>{$t('modal.long_content.paragraph_4')}</p>
    <p>{$t('modal.long_content.paragraph_5')}</p>
    <p>{$t('modal.long_content.paragraph_6')}</p>
    <p>{$t('modal.long_content.paragraph_7')}</p>
    <p>{$t('modal.long_content.paragraph_8')}</p>
  </div>
</Modal>
