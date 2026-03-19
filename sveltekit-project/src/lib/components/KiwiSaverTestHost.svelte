<script lang="ts">
    import KiwiSaver from './KiwiSaver.svelte';
    let {
        id = '',
        optOut = false,
        notRequiredToContribute = false,
        tempReduction = false,
        savingsSuspension = false,
        employeeRate = '3.5%',
        employerRate = '3.5%',
        matchEmployerRate = false,
        contributionsIncluded = false,
        otherSuper = false,
        esctRate = ''
    } = ();
</script>

<form>
    <KiwiSaver
        {id}
        {optOut}
        {notRequiredToContribute}
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
