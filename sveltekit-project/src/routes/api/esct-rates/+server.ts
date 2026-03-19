import { json } from '@sveltejs/kit';
import { esctRates } from '$lib/esct-rates';

export async function GET() {
    return json(esctRates);
}
