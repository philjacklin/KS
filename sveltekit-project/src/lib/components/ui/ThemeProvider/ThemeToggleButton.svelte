<script>
    import { getContext } from 'svelte';

    const themeContext = getContext('theme');
</script>

<button
    data-testid="theme-toggle-button"
    onclick={() => themeContext.toggleTheme()}
    class="bg-payroll-cyan/10 text-payroll-cyan px-md py-sm rounded-payroll font-semibold transition-all hover:bg-payroll-cyan/20 active:scale-95"
>
    Switch to {themeContext.theme === 'light' ? 'Dark' : 'Light'}
</button>
