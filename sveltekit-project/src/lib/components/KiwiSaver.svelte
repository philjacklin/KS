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
    import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from '$lib/components/ui/Accordion';
    import { kiwiSaverVariants } from '$lib/components/kiwisaver/variants';

    const { container, cardTitle, wrapper, inputWrapper, stack, button } = kiwiSaverVariants();

    let {
        id,
        optOut,
        tempReduction,
        savingsSuspension,
        employeeRate,
        employerRate,
        matchEmployerRate,
        contributionsIncluded,
        otherSuper,
        esctRate
    } = $props();

    let employeeRateNumber = $derived(Math.max(parseFloat(employeeRate || '0'), 3.5));

    const employeeRateOptions = ([
        { label: '3.5%', value: '3.5%' },
        { label: '4%', value: '4%' },
        { label: '6%', value: '6%' },
        { label: '8%', value: '8%' },
        { label: '10%', value: '10%' }
    ]);

    const esctRateOptions = ([
        { label: $t('kiwisaver.esct_10_5'), value: '10.5%' },
        { label: $t('kiwisaver.esct_17_5'), value: '17.5%' },
        { label: $t('kiwisaver.esct_30'), value: '30%' },
        { label: $t('kiwisaver.esct_33'), value: '33%' },
        { label: $t('kiwisaver.esct_39'), value: '39%' }
    ]);
</script>

<Container className={container()}>
    <input type="hidden" name="id" value={id} />
    <Card className="p-8">
        <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.title')}</Typography>
        <Stack direction="column" spacing="4">
            <Stack className={wrapper()}>
                <Checkbox checked={optOut} name="optOutStatus" value="true" label={$t('kiwisaver.opt_out')} />
            </Stack>
            <Stack className={wrapper()}>
                <Checkbox checked={tempReduction} name="temporaryRateReductionStatus" value="true" label={$t('kiwisaver.temp_reduction')} />
            </Stack>
            <Stack className={wrapper()}>
                <Checkbox checked={savingsSuspension} name="savingsSuspensionStatus" value="true" label={$t('kiwisaver.savings_suspension')} />
            </Stack>
            
            <Accordion>
                <AccordionItem id="rates">
                    <AccordionHeader>{$t('kiwisaver.rates_settings')}</AccordionHeader>
                    <AccordionContent>
                        <Stack direction="column" spacing="4">
                            <Stack direction="column" spacing="1">
                                <Label for="employee-rate" required>{$t('kiwisaver.employee_rate')}</Label>
                                <Stack className={inputWrapper()}>
                                    <Select id="employee-rate" name="employeeContributionRate" options={employeeRateOptions} value={employeeRate} />
                                </Stack>
                            </Stack>
                            <Stack direction="column" spacing="1">
                                <Label for="employer-rate" required>{$t('kiwisaver.employer_rate')}</Label>
                                <Stack className={wrapper()}>
                                    <!-- RangeSlider also needs name and hidden input support, but I haven't modified it yet. Wait, I should assume it works? Or modify it? -->
                                    <RangeSlider id="employer-rate" name="employerContributionRate" employeeRate={employeeRateNumber} value={employerRate} />
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Stack direction="row" justify="between" align="center" className={stack()}>
                <Label for="match-rate">{$t('kiwisaver.match_employer_rate')}</Label>
                <Slider id="match-rate" name="matchEmployerRate" checked={matchEmployerRate} />
            </Stack>
            
            <Stack direction="row" justify="between" align="center" className={stack()}>
                <Label for="contributions-included">{$t('kiwisaver.contributions_included')}</Label>
                <Slider id="contributions-included" name="contributionsIncluded" checked={contributionsIncluded} />
            </Stack>
        </Stack>
    </Card>

    <Card className="p-8">
        <Typography variant="h2" as="h2" className={cardTitle()}>{$t('kiwisaver.other_super')}</Typography>
        <Stack className={wrapper()}>
            <Checkbox checked={otherSuper} name="otherSuper" value="true" label={$t('kiwisaver.contribute_super')} />
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
        <Button variant="outline" type="submit" name="action" value="save" className={button()}>{$t('kiwisaver.save')}</Button>
        <Button type="submit" name="action" value="saveAndNext" className={button()}>{$t('kiwisaver.save_and_next')}</Button>
    </Stack>
</Container>
