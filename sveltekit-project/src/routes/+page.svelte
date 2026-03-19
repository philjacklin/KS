<script lang="ts">
    import KiwiSaver from '$lib/components/KiwiSaver.svelte';
    import { Container } from '$lib/components/ui/Container';
    import { Typography } from '$lib/components/ui/Typography';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    let { kiwisaver, esctRates } = data;
</script>

<Container className="bg-payroll-paper min-h-screen p-8">
    <Typography variant="h1" className="mb-8">Welcome to your Payroll</Typography>
    <Typography variant="body1" className="mb-4">Here are your KiwiSaver settings:</Typography>
    
    <KiwiSaver 
        id={kiwisaver.id}
        optOut={kiwisaver.opt_out_status}
        tempReduction={kiwisaver.temporary_rate_reduction_status}
        savingsSuspension={kiwisaver.savings_suspension_status}
        employeeRate={kiwisaver.employee_contribution_rate}
        employerRate={kiwisaver.employer_contribution_rate}
        matchEmployerRate={true} 
        contributionsIncluded={true} 
        otherSuper={false} 
        esctRate={kiwisaver.esct_rate}
        esctRateOptions={esctRates}
    />
</Container>
