<script lang="ts">
  import Modal from './Modal.svelte';
  import { t } from '$lib/stores/localeStore';

  let { isOpen, titleKey, content } = $props();
</script>

<Modal {isOpen} {titleKey}>
  <p>{content}</p>
</Modal>
