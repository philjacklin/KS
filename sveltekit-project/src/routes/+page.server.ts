import { sql } from '/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const kiwisaverSettings = await sql`
        SELECT * FROM kiwisavers LIMIT 1
    `;
    
    return {
        kiwisaver: kiwisaverSettings[0]
    };
};
