<script lang="ts">
    import KiwiSaver from './KiwiSaver.svelte';
    let {
        id = 'test-id',
        optOut = false,
        tempReduction = false,
        savingsSuspension = false,
        employeeRate = '3.5%',
        employerRate = '3%',
        matchEmployerRate = false,
        contributionsIncluded = false,
        otherSuper = false,
        esctRate = '10.5%'
    } = $props();
</script>

<form>
    <KiwiSaver
        {id}
        {optOut}
        {tempReduction}
        {savingsSuspension}
        {employeeRate}
        {employerRate}
        {matchEmployerRate}
        {contributionsIncluded}
        {otherSuper}
        {esctRate}
    />
</form>
