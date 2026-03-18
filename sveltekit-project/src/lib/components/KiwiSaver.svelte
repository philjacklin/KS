<script lang="ts">
    import { Card } from '$lib/components/ui/Card';
    import { Checkbox } from '$lib/components/ui/Checkbox';
    import { Select } from '$lib/components/ui/Select';
    import { RangeSlider } from '$lib/components/ui/RangeSlider';
    import { Slider } from '$lib/components/ui/Slider';
    import { Button } from '$lib/components/ui/Button';
    import { Label } from '$lib/components/ui/Label';
    import { Typography } from '$lib/components/ui/Typography';
    import { t } from '$lib/stores/localeStore';
    import { Stack } from '$lib/components/ui/Stack';
    import { Container } from '$lib/components/ui/Container';
    import { Layout } from '$lib/components/ui';

    const DEFAULT_EMPLOYEE_RATE = '3.5%';
    const DEFAULT_EMPLOYER_RATE = 3.5;

    let {
        optOut = false,
        tempReduction = false,
        savingsSuspension = false,
        employeeRate = DEFAULT_EMPLOYEE_RATE,
        employerRate = DEFAULT_EMPLOYER_RATE,
        matchEmployerRate = false,
        contributionsIncluded = false,
        otherSuper = false,
        esctRate = '10.5%',
    } = $props();

    const employeeRateNumber = $derived(Math.max(parseFloat(employeeRate), 3.5));

    const employeeRateOptions = $derived([
        { label: '3.5%', value: '3.5%' },
        { label: '4%', value: '4%' },
        { label: '6%', value: '6%' },
        { label: '8%', value: '8%' },
        { label: '10%', value: '10%' }
    ]);

    const esctRateOptions = $derived([
        { label: $t('kiwisaver.esct_10_5'), value: '10.5%' },
        { label: $t('kiwisaver.esct_17_5'), value: '17.5%' },
        { label: $t('kiwisaver.esct_30'), value: '30%' },
        { label: $t('kiwisaver.esct_33'), value: '33%' },
        { label: $t('kiwisaver.esct_39'), value: '39%' }
    ]);
</script>

<Container className="space-y-8 p-8">
    <Card>
        <Typography variant="h2" as="h2" className="mb-4">{$t('kiwisaver.title')}</Typography>
        <Stack direction="column" spacing="4">
            <Checkbox bind:checked={optOut} label={$t('kiwisaver.opt_out')} />
            <Checkbox bind:checked={tempReduction} label={$t('kiwisaver.temp_reduction')} />
            <Checkbox bind:checked={savingsSuspension} label={$t('kiwisaver.savings_suspension')} />
            
            <Layout cols={2} gap="1rem">
                <Stack direction="column" spacing="1">
                    <Label for="employee-rate" required>{$t('kiwisaver.employee_rate')}</Label>
                    <Select id="employee-rate" options={employeeRateOptions} bind:value={employeeRate} />
                </Stack>
                <Stack direction="column" spacing="1">
                    <Label for="employer-rate" required>{$t('kiwisaver.employer_rate')}</Label>
                    <RangeSlider id="employer-rate" employeeRate={employeeRateNumber} bind:value={employerRate} />
                </Stack>
            </Layout>

            <Stack direction="row" justify="between" align="center">
                <Label for="match-rate">{$t('kiwisaver.match_employer_rate')}</Label>
                <Slider id="match-rate" bind:checked={matchEmployerRate} />
            </Stack>
            
            <Stack direction="row" justify="between" align="center">
                <Label for="contributions-included">{$t('kiwisaver.contributions_included')}</Label>
                <Slider id="contributions-included" bind:checked={contributionsIncluded} />
            </Stack>
        </Stack>
    </Card>

    <Card>
        <Typography variant="h2" as="h2" className="mb-4">{$t('kiwisaver.other_super')}</Typography>
        <Checkbox bind:checked={otherSuper} label={$t('kiwisaver.contribute_super')} />
    </Card>

    <Card>
        <Typography variant="h2" as="h2" className="mb-4">{$t('kiwisaver.esct_title')}</Typography>
        <Stack direction="column" spacing="1">
            <Label for="esct-rate" required>{$t('kiwisaver.esct_rate')}</Label>
            <Select id="esct-rate" options={esctRateOptions} bind:value={esctRate} />
        </Stack>
    </Card>

    <Stack direction="row" spacing="4">
        <Button variant="outline">{$t('kiwisaver.save')}</Button>
        <Button>{$t('kiwisaver.save_and_next')}</Button>
    </Stack>
</Container>
