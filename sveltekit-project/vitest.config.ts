import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
		resolve: {
			conditions: ['browser']
		},
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./vitest.setup.ts'],
        deps: {
            inline: ['svelte']
        }
	}
});
