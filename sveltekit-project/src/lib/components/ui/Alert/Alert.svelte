<script lang="ts">
    import { alertVariants } from './variants'; // Use the shared variants file
    import { t } from '$lib/stores/localeStore';

    let {
        type = 'info' as 'info' | 'success' | 'warning' | 'error',
        title = '',
        message = '',
        dismissible = false,
        inline = false
    } = $props();

    let visible = $state(true);

    function dismiss() {
        visible = false;
    }
</script>

{#if visible}
    <div class="{alertVariants({ type, inline })}" role="alert">
        <div class="flex justify-between items-start w-full">
            <div>
                {#if title}
                    <h5 class="font-semibold">{$t(title)}</h5>
                {/if}
                {#if message}
                    <p class="text-sm">{$t(message)}</p>
                {/if}
            </div>
            {#if dismissible}
                <button 
                    onclick={dismiss} 
                    aria-label={$t('alert.dismiss')} 
                    class="ml-4 text-lg leading-none cursor-pointer hover:opacity-70"
                >
                    &times;
                </button>
            {/if}
        </div>
    </div>
{/if}

<!-- bg-payroll-teal-500 border-payroll-teal text-payroll-teal bg-payroll-gold-500 border-status-approved text-status-approved bg-status-destructive/800 border-status-destructive text-status-destructive bg-payroll-gold-100 border-payroll-gold text-payroll-gold bg-status-failed-100 border-status-failed text-status-failed -->
