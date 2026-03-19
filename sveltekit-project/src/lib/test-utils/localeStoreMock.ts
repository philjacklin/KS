import { vi } from 'vitest';

export const localeStoreMock = {
    t: { 
        subscribe: (fn: any) => { 
            fn((key: string, params: any = {}) => {
                if (key === 'kiwisaver.error_rate_range') {
                    return `Rate must be between ${params.min} and ${params.max}`;
                }
                // Return a readable version of the key for testing
                return key.replace('kiwisaver.', '').replace('_', ' ');
            }); 
            return () => {}; 
        } 
    },
    locale: { subscribe: () => {} },
    translations: { subscribe: () => {}, loadTranslations: vi.fn() },
    setLocale: vi.fn()
};
