import { writable, derived } from 'svelte/store';
import { BROWSER } from 'esm-env';

// Determine initial locale
let initialLocale = 'en';
if (BROWSER) {
  // Safe to touch 'document' or 'window' here
  initialLocale = localStorage.getItem('app-locale') || 'en';
  
  // Also check cookies as a fallback/sync mechanism
  const cookieLocale = document.cookie
    .split('; ')
    .find(row => row.startsWith('app-locale='))
    ?.split('=')[1];
  
  if (cookieLocale) {
    initialLocale = cookieLocale;
  }
}

export const locale = writable(initialLocale);

function createTranslationsStore() {
  const { subscribe, set } = writable({});

  /**
   * Loads translations for a given locale from the client-side.
   * @param {string} locale - The locale to load translations for (e.g., 'en', 'nz').
   */
  async function loadTranslations(locale) {
    // Ensure this code only runs in the browser
    if (!BROWSER) {
      return;
    }

    try {
      const response = await fetch(`/locales/${locale}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch translations for locale: ${locale}`);
      }
      const data = await response.json();
      set(data);
    } catch (error) {
      console.error('Error loading translations:', error);
      // On error, reset to an empty object to avoid showing stale translations.
      set({});
    }
  }

  return {
    subscribe, set,
    loadTranslations,
  };
}

export const translations = createTranslationsStore();

/**
 * Sets the new locale, saves it to localStorage, and loads the translations.
 * @param {string} newLocale - The new locale to set.
 */
export function setLocale(newLocale) {
  locale.set(newLocale);
  if (BROWSER) {
    window.localStorage.setItem('app-locale', newLocale);
    // Set cookie for server-side access, persists for 1 year
    document.cookie = `app-locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }
  translations.loadTranslations(newLocale);
}

// Load initial translations
if (BROWSER) {
    translations.loadTranslations(initialLocale);
}

export const t = derived(translations, ($translations) => {
    return (key, params = {}) => {
        if (typeof key !== 'string') return '';
        let translation = $translations[key] || key;
        for (const [paramKey, value] of Object.entries(params)) {
            translation = translation.replace(`{${paramKey}}`, value);
        }
        return translation;
    };
});
