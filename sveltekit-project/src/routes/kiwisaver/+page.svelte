<script lang="ts">
    import KiwiSaver from '$lib/components/KiwiSaver.svelte';
    import { enhance } from '$app/forms';
    import { Alert } from '$lib/components/ui/Alert';
    import { Stack } from '$lib/components/ui/Stack';
    import { t } from '$lib/stores/localeStore';

    let { data, form } = $props();
    let kiwisaver = data.kiwisaver;
</script>

{#if form?.error}
    <Stack className="mb-8" data-testid="error-message">
        <Alert type="error" message={form.error} />
    </Stack>
{/if}

{#if form?.success}
    <Stack className="mb-8" data-testid="success-message">
        <Alert type="success" message={$t('kiwisaver.settings_saved')} />
    </Stack>
{/if}

<form method="POST" action="?/update" use:enhance>
    <KiwiSaver 
        id={kiwisaver.id}
        optOut={kiwisaver.opt_out_status}
        tempReduction={kiwisaver.temporary_rate_reduction_status}
        savingsSuspension={kiwisaver.savings_suspension_status}
        employeeRate={kiwisaver.employee_contribution_rate}
        employerRate={kiwisaver.employer_contribution_rate}
        esctRate={kiwisaver.esct_rate}
        matchEmployerRate={kiwisaver.match_employer_rate}
        contributionsIncluded={kiwisaver.contributions_included}
        otherSuper={kiwisaver.other_super}
    />
</form>
