<script lang="ts">
    import KiwiSaver from '$lib/components/KiwiSaver.svelte';
    import { enhance } from '$app/forms';

    let { data } = $props();
    let kiwisaver = data.kiwisaver;
    
    // Convert to string format if needed for the component
    let employeeRateStr = `${kiwisaver.employee_contribution_rate}%`;
</script>

<form method="POST" action="?/update" use:enhance>
    <input type="hidden" name="id" value={kiwisaver.id} />
    
    <KiwiSaver 
        optOut={kiwisaver.opt_out_status}
        tempReduction={kiwisaver.temporary_rate_reduction_status}
        savingsSuspension={kiwisaver.savings_suspension_status}
        employeeRate={employeeRateStr}
        employerRate={kiwisaver.employer_contribution_rate}
        esctRate={kiwisaver.esct_rate}
    />
</form>
