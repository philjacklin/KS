import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Mock data storage
let kiwisaverData = {
    contributionRate: 0.03,
    balance: 10000
};

export const GET: RequestHandler = async () => {
    return json(kiwisaverData);
};

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    // Update mock data
    kiwisaverData = { ...kiwisaverData, ...data };
    return json({ success: true, data: kiwisaverData });
};
