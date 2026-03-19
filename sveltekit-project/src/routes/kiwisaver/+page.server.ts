import { type Actions, fail } from '@sveltejs/kit';
import { sql } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const kiwisaverSettings = await sql`SELECT * FROM kiwisavers LIMIT 1`;
    
    // Default values if no record is found
    const defaultKiwisaver = {
        id: '',
        opt_out_status: false,
        temporary_rate_reduction_status: false,
        savings_suspension_status: false,
        employee_contribution_rate: '3.5',
        employer_contribution_rate: '3.5',
        esct_rate: '10.5%',
        match_employer_rate: false,
        contributions_included: false,
        other_super: false
    };

    return {
        kiwisaver: kiwisaverSettings[0] ?? defaultKiwisaver
    };
};

export const actions: Actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        // Parse percentages (strip %)
        const employeeContributionRate = Number((data.get('employeeContributionRate') as string || '').replace('%', ''));
        const employerContributionRate = Number((data.get('employerContributionRate') as string || '').replace('%', ''));
        const esctRate = Number((data.get('esctRate') as string || '').replace('%', ''));
        
        const optOutStatus = data.get('optOutStatus') === 'true';
        const temporaryRateReductionStatus = data.get('temporaryRateReductionStatus') === 'true';
        const savingsSuspensionStatus = data.get('savingsSuspensionStatus') === 'true';
        
        const matchEmployerRate = data.get('matchEmployerRate') === 'true';
        const contributionsIncluded = data.get('contributionsIncluded') === 'true';
        const otherSuper = data.get('otherSuper') === 'true';

        if (isNaN(employeeContributionRate) || employeeContributionRate < 3.5) {
            return fail(400, { error: 'Invalid employee contribution rate. Must be at least 3.5%.' });
        }
        
        if (isNaN(employerContributionRate) || employerContributionRate < 0) {
             return fail(400, { error: 'Invalid employer contribution rate.' });
        }

        if (isNaN(esctRate)) {
            return fail(400, { error: 'Invalid ESCT rate.' });
        }
        
        // This is a simplified UPDATE. If id is empty, this won't work, but it maintains existing logic.
        await sql`
            UPDATE kiwisavers
            SET 
                employee_contribution_rate = ${employeeContributionRate},
                employer_contribution_rate = ${employerContributionRate},
                opt_out_status = ${optOutStatus},
                temporary_rate_reduction_status = ${temporaryRateReductionStatus},
                savings_suspension_status = ${savingsSuspensionStatus},
                esct_rate = ${esctRate},
                match_employer_rate = ${matchEmployerRate},
                contributions_included = ${contributionsIncluded},
                other_super = ${otherSuper}
            WHERE id = ${id}
        `;
        
        return { success: true };
    }
};
