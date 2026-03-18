import { sql } from '/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
    const kiwisaver = await sql`SELECT * FROM kiwisavers LIMIT 1`;
    return {
        kiwisaver: kiwisaver[0]
    };
};

export const actions: Actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const employeeContributionRate = data.get('employeeContributionRate');
        const employerContributionRate = data.get('employerContributionRate');
        const optOut = data.get('optOut') === 'true';
        const tempReduction = data.get('tempReduction') === 'true';
        const savingsSuspension = data.get('savingsSuspension') === 'true';
        const esctRate = data.get('esctRate');
        
        await sql`
            UPDATE kiwisavers
            SET employee_contribution_rate = ${Number(employeeContributionRate)},
                employer_contribution_rate = ${Number(employerContributionRate)},
                opt_out_status = ${optOut},
                temporary_rate_reduction_status = ${tempReduction},
                savings_suspension_status = ${savingsSuspension},
                esct_rate = ${Number(esctRate)}
            WHERE id = ${id}
        `;
        return { success: true };
    }
};
