<script lang="ts">
    import Card from '$lib/components/ui/Card/Card.svelte';
    import HiddenInput from '$lib/components/ui/HiddenInput/HiddenInput.svelte';
    import Checkbox from '$lib/components/ui/Checkbox/Checkbox.svelte';
    import Select from '$lib/components/ui/Select/Select.svelte';
    import NumberInput from '$lib/components/ui/NumberInput/NumberInput.svelte';
    import Slider from '$lib/components/ui/Slider/Slider.svelte';
    import Button from '$lib/components/ui/Button/Button.svelte';
    import Label from '$lib/components/ui/Label/Label.svelte';
    import Typography from '$lib/components/ui/Typography/Typography.svelte';
    import Stack from '$lib/components/ui/Stack/Stack.svelte';
    import Container from '$lib/components/ui/Container/Container.svelte';

    import { t } from '$lib/stores/localeStore';
    import { kiwiSaverVariants } from '$lib/components/kiwisaver/variants';

    const { container, cardTitle, wrapper, inputWrapper, stack, button } = kiwiSaverVariants();

    let {
        id = '',
        optOut = $bindable(false),
        notRequiredToContribute = $bindable(false),
        tempReduction = $bindable(false),
        savingsSuspension = $bindable(false),
        employeeRate = $bindable(''),
        employerRate = $bindable(''),
        matchEmployerRate = $bindable(false),
        contributionsIncluded = $bindable(false),
        otherSuper = $bindable(false),
        esctRate = $bindable('')
    } = $props();

    const employerRateNum = $derived(parseFloat(employerRate.replace('%', '')) || 0);

    $effect(() => {
        if (!notRequiredToContribute) {
            employeeRate = "3.5%";
            employerRate = "3.5%";
        }
    });

    const employeeRateOptions = $derived([
        ...(notRequiredToContribute ? [{ label: "0%", value: "0%" }] : []),
        { label: "3%", value: "3%" },
        { label: "3.5%", value: "3.5%" },
        { label: "4%", value: "4%" },
        { label: "6%", value: "6%" },
        { label: "8%", value: "8%" },
        { label: "10%", value: "10%" }
    ]);

    const esctRateOptions = ([
        { label: $t('kiwisaver.esct_10_5'), value: '10.5%' },
        { label: $t('kiwisaver.esct_17_5'), value: '17.5%' },
        { label: $t('kiwisaver.esct_30'), value: '30%' },
        { label: $t('kiwisaver.esct_33'), value: '33%' },
        { label: $t('kiwisaver.esct_39'), value: '39%' }
    ]);


    // Validation logic
    const employeeRateNum = $derived(parseFloat(employeeRate.replace('%', '')));
    
    // min is 3.5 OR employee rate if that is lower.
    const minEmployerRate = $derived(isNaN(employeeRateNum) ? 3.5 : Math.min(3.5, employeeRateNum));
    const maxEmployerRate = 30;

    const employerRateError = $derived(
        (employerRateNum < minEmployerRate || employerRateNum > maxEmployerRate)
        ? `Rate must be between ${minEmployerRate}% and ${maxEmployerRate}%`
        : ''
    );
</script>

<Container className={container()}>
    <HiddenInput name="id" value={id} />
    <Card className="p-8">
        <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.title')}</Typography>
        <Stack direction="column" spacing="4">
            <Stack className={wrapper()} direction="column" spacing="2">
                <Checkbox bind:checked={optOut} name="optOutStatus" value="true" label={$t('kiwisaver.opt_out')} />
                <Checkbox bind:checked={notRequiredToContribute} name="notRequiredToContributeStatus" value="true" label={$t('kiwisaver.not_required')} />
            </Stack>
            <Stack className={wrapper()}>
                <Checkbox bind:checked={tempReduction} name="temporaryRateReductionStatus" value="true" label={$t('kiwisaver.temp_reduction')} />
            </Stack>
            <Stack className={wrapper()}>
                <Checkbox bind:checked={savingsSuspension} name="savingsSuspensionStatus" value="true" label={$t('kiwisaver.savings_suspension')} />
            </Stack>
            
            <Stack direction="row" spacing="4">
                <Stack direction="column" spacing="1" className="flex-1">
                    <Label for="employee-rate" required>{$t('kiwisaver.employee_rate')}</Label>
                    <div data-testid="employee-contribution-rate">
                        <Select 
                            id="employee-rate" 
                            name="employeeContributionRate" 
                            options={employeeRateOptions} 
                            value={employeeRate} 
                            onchange={(val) => employeeRate = val}
                            className={inputWrapper()} 
                        />
                    </div>
                </Stack>
                <Stack direction="column" spacing="1" className="flex-1">
                    <Label for="employer-rate" required>{$t('kiwisaver.employer_rate')}</Label>
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
            </Stack>

            <Stack direction="row" justify="between" align="center" className={stack()}>
                <Label for="match-rate">{$t('kiwisaver.match_employer_rate')}</Label>
                <Slider id="match-rate" name="matchEmployerRate" bind:checked={matchEmployerRate} />
            </Stack>
            
            <Stack direction="row" justify="between" align="center" className={stack()}>
                <Label for="contributions-included">{$t('kiwisaver.contributions_included')}</Label>
                <Slider id="contributions-included" name="contributionsIncluded" bind:checked={contributionsIncluded} />
            </Stack>
        </Stack>
    </Card>

    <Card className="p-8">
        <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.other_super')}</Typography>
        <Stack className={wrapper()}>
            <Checkbox bind:checked={otherSuper} name="otherSuper" value="true" label={$t('kiwisaver.contribute_super')} />
        </Stack>
    </Card>

    <Card className="p-8">
        <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.esct_title')}</Typography>
        <Stack direction="column" spacing="1">
            <Label for="esct-rate" required>{$t('kiwisaver.esct_rate')}</Label>
            <Stack className={inputWrapper()}>
                <Select id="esct-rate" name="esctRate" options={esctRateOptions} value={esctRate} />
            </Stack>
        </Stack>
    </Card>

    <Stack direction="row" spacing="4">
        <Button variant="outline" type="submit" name="action" value="save" data-testid="save-button" className={button()}>{$t('kiwisaver.save')}</Button>
        <Button type="submit" name="action" value="saveAndNext" data-testid="save-and-next-button" className={button()}>{$t('kiwisaver.save_and_next')}</Button>
    </Stack>
</Container>
