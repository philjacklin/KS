<script>
    import { setContext, onMount } from 'svelte';
    import { focusState } from '$lib/stores/focusState.svelte';

    let { children, onReady } = $props();

    let theme = $state('light'); 

    onMount(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = storedTheme || (prefersDark ? 'dark' : 'light');
    });

    $effect(() => {
        // This is the correct place for side effects like DOM manipulation
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            localStorage.setItem('theme', theme);
        }
    });

    // --- CONTEXT SETUP ---

    // 1. Primary Theme Context
    // Using getters ensures the context stays reactive
    setContext('theme', {
        get theme() { return theme; },
        toggleTheme: () => { theme = theme === 'light' ? 'dark' : 'light'; },
        setTheme: (newTheme) => {
            if (newTheme === 'light' || newTheme === 'dark') theme = newTheme;
        }
    });

    // 2. Focus Context
    setContext('focus', {
        get method() { return focusState.method; }
    });

    // 3. The Fix for the Warning
    // Instead of a static 'if', we provide a getter or use the effect.
    // However, setContext MUST be called during initialization.
    // We pass a function that returns the current value of onReady.
    setContext('test_onReady', (args) => {
        if (typeof onReady === 'function') {
            onReady(args);
        }
    });
</script>

{@render children?.()}
