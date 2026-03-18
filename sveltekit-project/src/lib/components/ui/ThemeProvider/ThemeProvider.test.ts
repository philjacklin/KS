import { render, fireEvent, screen } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { tick } from 'svelte';
import ThemeProvider from './ThemeProvider.svelte';
import ThemeToggleButton from './ThemeToggleButton.svelte';
import ContextHelper from './ContextHelper.svelte';

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
		}
	};
})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
});

// Mock matchMedia
const matchMediaMock = (matches) => ({
	matches,
	media: '(prefers-color-scheme: dark)',
	onchange: null,
	addListener: vi.fn(), // deprecated
	removeListener: vi.fn(), // deprecated
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn()
});

describe('ThemeProvider', () => {
	beforeEach(() => {
		localStorage.clear();
		window.matchMedia = vi.fn();
		document.documentElement.className = ''; // Clear classes
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('initializes with "light" theme by default', async () => {
		window.matchMedia.mockReturnValue(matchMediaMock(false));
		render(ThemeProvider, { props: { children: ThemeToggleButton } });
		await tick();
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(localStorage.getItem('theme')).toBe('light');
	});

	it('initializes with "dark" theme based on system preference', async () => {
		window.matchMedia.mockReturnValue(matchMediaMock(true));
		render(ThemeProvider, { props: { children: ThemeToggleButton } });
		await tick();
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(localStorage.getItem('theme')).toBe('dark');
	});

	it('initializes with theme from localStorage, overriding system preference', async () => {
		localStorage.setItem('theme', 'dark');
		window.matchMedia.mockReturnValue(matchMediaMock(false)); // System preference is light
		render(ThemeProvider, { props: { children: ThemeToggleButton } });
		await tick();
		expect(document.documentElement.classList.contains('dark')).toBe(true);
	});

	it('toggles theme from light to dark via button click', async () => {
		window.matchMedia.mockReturnValue(matchMediaMock(false));
		render(ThemeProvider, { props: { children: ThemeToggleButton } });
		await tick();

		// Initial state: light
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(screen.getByText('Switch to Dark')).toBeInTheDocument();

		const button = screen.getByRole('button');
		await fireEvent.click(button);

		// After click: dark
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(localStorage.getItem('theme')).toBe('dark');
		expect(screen.getByText('Switch to Light')).toBeInTheDocument();
	});

	it('toggles theme from dark to light via button click', async () => {
		localStorage.setItem('theme', 'dark');
		window.matchMedia.mockReturnValue(matchMediaMock(false));
		render(ThemeProvider, { props: { children: ThemeToggleButton } });
		await tick();

		// Initial state: dark
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(screen.getByText('Switch to Light')).toBeInTheDocument();

		const button = screen.getByRole('button');
		await fireEvent.click(button);

		// After click: light
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(localStorage.getItem('theme')).toBe('light');
		expect(screen.getByText('Switch to Dark')).toBeInTheDocument();
	});

	it('sets the theme programmatically via setTheme', async () => {
		window.matchMedia.mockReturnValue(matchMediaMock(false));
		
		let capturedContext;
		
		render(ThemeProvider, { 
			props: { 
				children: ContextHelper,
				// This is passed to ThemeProvider, which now puts it in context
				onReady: (ctx) => { capturedContext = ctx; }
			} 
		});

		await tick();

		// Verify we actually caught the context
		expect(capturedContext).toBeDefined();

		// Use the captured methods
		capturedContext.setTheme('dark');
		await tick(); 

		expect(document.documentElement.classList.contains('dark')).toBe(true);
		expect(localStorage.getItem('theme')).toBe('dark');
	});

	it('does not change theme if setTheme is called with an invalid value', async () => {
		window.matchMedia.mockReturnValue(matchMediaMock(false));
		
		let capturedContext; // Add this
		render(ThemeProvider, { 
			props: { 
				children: ContextHelper,
				onReady: (ctx) => { capturedContext = ctx; } // Add this
			} 
		});
		await tick();

		// Initial state is light
		expect(localStorage.getItem('theme')).toBe('light');

		// Use the capturedContext instead of component.context
		capturedContext.setTheme('purple');
		await tick();

		// Theme should not have changed
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		expect(localStorage.getItem('theme')).toBe('light');
	});
});
