import { get } from 'svelte/store';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { locale, translations, setLocale, t } from './localeStore.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch
global.fetch = vi.fn();

describe('localeStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.resetAllMocks();
  });

  it('setLocale should update locale and localStorage', () => {
    setLocale('nz');
    expect(get(locale)).toBe('nz');
    expect(window.localStorage.getItem('app-locale')).toBe('nz');
  });

  it('t should return the translation for a valid key', async () => {
    const mockTranslations = { greeting: 'Hello' };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTranslations),
    });

    await translations.loadTranslations('en');

    const translate = get(t);
    expect(translate('greeting')).toBe('Hello');
  });

  it('t should return the key for a missing key', async () => {
    const mockTranslations = { greeting: 'Hello' };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTranslations),
    });

    await translations.loadTranslations('en');

    const translate = get(t);
    expect(translate('farewell')).toBe('farewell');
  });

  it('loadTranslations should handle successful JSON response', async () => {
    const mockTranslations = { welcome: 'Welcome' };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTranslations),
    });

    await translations.loadTranslations('en');
    expect(get(translations)).toEqual(mockTranslations);
  });

  it('loadTranslations should handle a 404 error', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    // Suppress console.error for this test
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await translations.loadTranslations('fr');
    expect(get(translations)).toEqual({});

    consoleErrorSpy.mockRestore();
  });
});
