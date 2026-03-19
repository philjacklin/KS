const employerRateError = $derived(
        (employerRateNum < minEmployerRate || employerRateNum > maxEmployerRate)
        ? $t('kiwisaver.error_rate_range', { min: minEmployerRate, max: maxEmployerRate })
        : ""
    );
