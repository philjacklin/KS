<script lang="ts">
    import Card from '/components/ui/Card/Card.svelte';
    import HiddenInput from '/components/ui/HiddenInput/HiddenInput.svelte';
    import Checkbox from '/components/ui/Checkbox/Checkbox.svelte';
    import Select from '/components/ui/Select/Select.svelte';
    import NumberInput from '/components/ui/NumberInput/NumberInput.svelte';
    import Slider from '/components/ui/Slider/Slider.svelte';
    import Button from '/components/ui/Button/Button.svelte';
    import Label from '/components/ui/Label/Label.svelte';
    import Typography from '/components/ui/Typography/Typography.svelte';
    import Stack from '/components/ui/Stack/Stack.svelte';
    import Container from '/components/ui/Container/Container.svelte';

    import { t } from '/stores/localeStore';
    import { kiwiSaverVariants } from '/components/kiwisaver/variants';

    const { container, cardTitle, wrapper, inputWrapper, stack, button } = kiwiSaverVariants();

    let {
        id = '',
        optOut = $bindable(false),
        notRequiredToContribute = $bindable(false),
        tempReduction = $bindable(false),
        savingsSuspension = $bindable(false),
        employeeRate = $bindable('3.5%'),
        employerRate = $bindable('3.5%'),
        matchEmployerRate = $bindable(false),
        contributionsIncluded = $bindable(false),
        otherSuper = $bindable(false),
        esctRate = $bindable('')
    } = $props();

    let prevNotRequiredToContribute = $state(notRequiredToContribute);

    $effect(() => {
        if (prevNotRequiredToContribute && !notRequiredToContribute) {
            employeeRate = "3.5%";
            employerRate = "3.5%";
        }
        prevNotRequiredToContribute = notRequiredToContribute;
    });

    const employerRateNum = $derived(parseFloat(employerRate.replace('%', '')) || 0);
    const employeeRateNum = $derived(parseFloat(employeeRate.replace('%', '')) || 0);

    const employeeRateOptions = $derived([
        ...(notRequiredToContribute ? [{ label: "0%", value: "0%" }] : []),
        { label: "3.5%", value: "3.5%" },
        { label: "4%", value: "4%" },
        { label: "6%", value: "6%" },
        { label: "8%", value: "8%" },
        { label: "10%", value: "10%" }
    ]);

    const esctRateOptions = $derived([
        { label: $t('kiwisaver.esct_10_5'), value: '10.5%' },
        { label: $t('kiwisaver.esct_17_5'), value: '17.5%' },
        { label: $t('kiwisaver.esct_30'), value: '30%' },
        { label: $t('kiwisaver.esct_33'), value: '33%' },
        { label: $t('kiwisaver.esct_39'), value: '39%' }
    ]);

    const minEmployerRate = $derived(isNaN(employeeRateNum) ? 3.5 : Math.min(3.5, employeeRateNum));
    const maxEmployerRate = 30;

    const employerRateError = $derived(
        (employerRateNum < minEmployerRate || employerRateNum > maxEmployerRate)
        ? $t('kiwisaver.error_rate_range', { min: minEmployerRate, max: maxEmployerRate })
        : ''
    );
</script>

<Container className={container()}>
    <HiddenInput name="id" value={id} />
    <Card className="p-8">
        <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.title')}</Typography>
        <Stack direction="column">
            <Checkbox bind:checked={optOut} name="optOutStatus" value="true" label={$t('kiwisaver.opt_out')} />
            {#if !optOut}
                <Checkbox bind:checked={notRequiredToContribute} name="notRequiredToContributeStatus" value="true" label={$t('kiwisaver.not_required')} />
            {/if}
        </Stack>
            {#if !optOut}
                <Stack className={wrapper()} direction="row">
                    <Checkbox bind:checked={tempReduction} name="temporaryRateReductionStatus" value="true" label={$t('kiwisaver.temp_reduction')} />
                </Stack>
                <Checkbox bind:checked={savingsSuspension} name="savingsSuspensionStatus" value="true" label={$t('kiwisaver.savings_suspension')} />
                
                    <Stack direction="column" className="flex-1 mt-4">
                        <Label for="employee-rate" required class="pt-3">{$t('kiwisaver.employee_rate')}</Label>
                        <Stack data-testid="employee-contribution-rate">
                            <Select 
                                id="employee-rate" 
                                name="employeeContributionRate" 
                                options={employeeRateOptions} 
                                value={employeeRate} 
                                onchange={(val) => employeeRate = val}
                                className={inputWrapper()} 
                            />
                        </Stack>
                        <Label for="employer-rate" required class="pt-3">{$t('kiwisaver.employer_rate')}</Label>
                        <NumberInput
                            id="employer-rate"
                            type="tax-rate"
                            name="employerContributionRate" data-testid="employer-contribution-rate"
                            value={employerRateNum}
                            onChange={(val) => { if (val !== null) employerRate = `${val}%`; }}
                            min={minEmployerRate}
                            max={maxEmployerRate}
                            error={!!employerRateError}
                            errorMessage={employerRateError}
                            className={inputWrapper()}
                        />
                    </Stack>

                <Stack direction="row" justify="between" align="center" className={stack()}>
                    <Label for="match-rate">{$t('kiwisaver.match_employer_rate')}</Label>
                    <Slider id="match-rate" name="matchEmployerRate" bind:checked={matchEmployerRate} />
                </Stack>
                
                <Stack direction="row" justify="between" align="left" className={stack()}>
                    <Label for="contributions-included">{$t('kiwisaver.contributions_included')}</Label>
                    <Slider id="contributions-included" name="contributionsIncluded" bind:checked={contributionsIncluded} />
                </Stack>
            {/if}
    </Card>

    {#if !optOut}
        <Card className="p-8">
            <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.other_super')}</Typography>
            <Stack className={wrapper()} direction="row">
                <Checkbox bind:checked={otherSuper} name="otherSuper" value="true" label={$t('kiwisaver.contribute_super')} />
            </Stack>
        </Card>

        <Card className="p-8">
            <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.esct_title')}</Typography>
            <Stack direction="column">
                <Label for="esct-rate" required class="pt-3">{$t('kiwisaver.esct_rate')}</Label>
                <Stack className={inputWrapper()}>
                    <Select id="esct-rate" name="esctRate" options={esctRateOptions} value={esctRate} />
                </Stack>
            </Stack>
        </Card>

        <Stack direction="row">
            <Button variant="outline" type="submit" name="action" value="save" data-testid="save-button" className={button()}>{$t('kiwisaver.save')}</Button>
            <Button type="submit" name="action" value="saveAndNext" data-testid="save-and-next-button" className={button()}>{$t('kiwisaver.save_and_next')}</Button>
        </Stack>
    {/if}
</Container>
