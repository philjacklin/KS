import { json } from '@sveltejs/kit';

export async function GET() {
    return json([
        { label: '10.5% Total income sh to 8,720 per year', value: '10.5%' },
        { label: '17.5% Total income 8,721 to 4,200 per year', value: '17.5%' },
        { label: '30% Total income 4,201 to 3,720 per year', value: '30%' },
        { label: '33% Total income 3,721 to 16,000 per year', value: '33%' },
        { label: '39% Total income 16,001 and over per year', value: '39%' }
    ]);
}
