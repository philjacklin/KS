import { json } from '@sveltejs/kit';
import { esctRates } from '$lib/esct-rates';

export function GET() {
    return json(esctRates);
}
