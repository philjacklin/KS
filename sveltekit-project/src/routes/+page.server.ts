import { sql } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { esctRates } from '$lib/esct-rates';

export const load: PageServerLoad = async () => {
    const kiwisaverSettings = await sql`
        SELECT * FROM kiwisavers LIMIT 1
    `;
    
    // Default values if no record is found
    const defaultKiwisaver = {
        id: '',
        opt_out_status: false,
        temporary_rate_reduction_status: false,
        savings_suspension_status: false,
        employee_contribution_rate: '3.5',
        employer_contribution_rate: '3.00',
        esct_rate: '10.5%'
    };
    
    return {
        kiwisaver: kiwisaverSettings[0] ?? defaultKiwisaver,
        esctRates
    };
};
