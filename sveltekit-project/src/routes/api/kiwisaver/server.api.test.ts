import { describe, it, expect, vi } from 'vitest';
import { POST } from './+server';
import { sql } from '$lib/server/db';

vi.mock('$lib/server/db', () => ({
    sql: vi.fn()
}));

describe('KiwiSaver API', () => {
    it('should return 400 if required fields are missing', async () => {
        const request = new Request('http://localhost/api/kiwisaver', {
            method: 'POST',
            body: JSON.stringify({ id: '1' }) // Missing employee_id
        });

        const response = await POST({ request } as any);
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toBe('Missing required fields');
    });

    it('should update KiwiSaver data and return 200 on success', async () => {
        const data = {
            id: '1',
            employee_id: 'emp1',
            employee_contribution_rate: '3.5%',
            employer_contribution_rate: '3%',
            opt_out_status: false,
            temporary_rate_reduction_status: false,
            savings_suspension_status: false,
            esct_rate: '17.5%'
        };
        const request = new Request('http://localhost/api/kiwisaver', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        (sql as any).mockResolvedValueOnce([]);

        const response = await POST({ request } as any);
        expect(response.status).toBe(200);
        const result = await response.json();
        expect(result.success).toBe(true);
        expect(sql).toHaveBeenCalled();
    });

    it('should return 500 if database update fails', async () => {
        const data = {
            id: '1',
            employee_id: 'emp1',
            employee_contribution_rate: '3.5%',
            employer_contribution_rate: '3%',
            opt_out_status: false,
            temporary_rate_reduction_status: false,
            savings_suspension_status: false,
            esct_rate: '17.5%'
        };
        const request = new Request('http://localhost/api/kiwisaver', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        (sql as any).mockRejectedValueOnce(new Error('Database error'));

        const response = await POST({ request } as any);
        expect(response.status).toBe(500);
        const result = await response.json();
        expect(result.error).toBe('Failed to update KiwiSaver data');
    });
});
