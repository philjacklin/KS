<script lang="ts">
  import { fileUploadVariants } from './variants';
  import { t } from '$lib/stores/localeStore';
  import Icon from '$lib/components/ui/Icon/Icon.svelte';
  import { twMerge } from 'tailwind-merge';

let {
    accept = '.pdf,.csv,.xlsx',
    maxSize = 10 * 1024 * 1024,
    onUpload,
    className,
    disabled = false,
    error = $bindable(null) // Added $bindable so storybook/parent can update it
  } = $props();

let isDragging = $state(false);
  let fileInput: HTMLInputElement;

  const uploadIcon = `<svg class="w-full h-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>`;

  function handleDragEnter(e: DragEvent) {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
  }

  function handleDragOver(e: DragEvent) {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
    error = null;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      validateAndUpload(files[0]);
    }
  }

  function handleFileSelect(e: Event) {
    if (disabled) return;
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      validateAndUpload(files[0]);
    }
    // Reset input value so the same file can be selected again if needed
    target.value = '';
  }

  function validateAndUpload(file: File) {
    // Validate extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = accept.split(',').map(ext => ext.trim().toLowerCase());
    
    if (!allowedExtensions.includes(extension)) {
      error = $t('file_upload.error.invalid_type') || 'Invalid file type';
      return;
    }

    // Validate size
    if (file.size > maxSize) {
      error = $t('file_upload.error.file_too_large') || 'File too large';
      return;
    }

    error = null;
    if (onUpload) {
      onUpload(file);
    }
  }

function handleClick(e: MouseEvent | KeyboardEvent) {
    if (disabled) return;
    
    // Stop propagation so the browser doesn't try to handle the click twice
    e.preventDefault();
    e.stopPropagation();
    
    fileInput?.click();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  }

  let state = $derived(disabled ? 'disabled' : error ? 'error' : isDragging ? 'dragover' : 'default');
  let containerClasses = $derived(twMerge(fileUploadVariants({ state }), className));
</script>

<div class="w-full">
  <div
    class={containerClasses}
    ondragenter={handleDragEnter}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    onclick={handleClick}
    onkeydown={handleKeyDown}
    role="button"
    tabindex={disabled ? -1 : 0}
    aria-disabled={disabled}
    aria-label={$t('file_upload.drop_zone_label') || 'File upload drop zone'}
  >
    <div class="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
      <Icon svg={uploadIcon} size="2rem" className="mb-4 text-payroll-teal/60" />
      <p class="mb-2 text-sm text-payroll-teal/80">
        <span class="font-semibold">{$t('file_upload.click_to_upload')}</span> {$t('file_upload.or_drag_and_drop')}
      </p>
      <p class="text-xs text-payroll-teal/60">
        {$t('file_upload.supported_formats')}
      </p>
      {#if error}
        <p class="mt-2 text-sm text-red-600 font-medium">
          {error}
        </p>
      {/if}
    </div>
  </div>
  <input
    bind:this={fileInput}
    id="dropzone-file"
    type="file"
    class="hidden"
    accept={accept}
    onchange={handleFileSelect}
    disabled={disabled}
    onclick={(e) => e.stopPropagation()} 
  />
</div>
