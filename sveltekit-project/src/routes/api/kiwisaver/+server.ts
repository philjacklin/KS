import { json } from '@sveltejs/kit';
import { sql } from '$lib/server/db';

export async function POST({ request }) {
    const data = await request.json();

    try {
        // Validate input data
        if (!data.id || !data.employee_id) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Use parameterized queries to prevent SQL injection
        await sql`
            UPDATE kiwisavers
            SET 
                employee_contribution_rate = ${data.employee_contribution_rate},
                employer_contribution_rate = ${data.employer_contribution_rate},
                opt_out_status = ${data.opt_out_status},
                temporary_rate_reduction_status = ${data.temporary_rate_reduction_status},
                savings_suspension_status = ${data.savings_suspension_status},
                esct_rate = ${data.esct_rate}
            WHERE id = ${data.id}
        `;

        return json({ success: true });
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to update KiwiSaver data' }, { status: 500 });
    }
}
