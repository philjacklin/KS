import { json } from '@sveltejs/kit';
import { esctRates } from '/esct-rates';

export function GET() {
    return json(esctRates);
}
