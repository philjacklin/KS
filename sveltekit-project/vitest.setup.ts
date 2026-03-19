import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

process.env.NODE_ENV = 'test';

global.fetch = vi.fn().mockImplementation((url) => {
    if (url.includes('locales')) {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
        });
    }
    return Promise.reject(new Error('Fetch not mocked for: ' + url));
});
