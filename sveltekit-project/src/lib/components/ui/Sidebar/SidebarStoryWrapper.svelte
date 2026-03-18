<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import { t } from '$lib/stores/localeStore';
  
  let { isOpen = false, activeRoute = '/', className = '' } = $props();
  
  const navItems = [
    { href: '/', labelKey: 'sidebar.dashboard' },
    { href: '/payroll', labelKey: 'sidebar.payroll' },
    { href: '/employees', labelKey: 'sidebar.employees' },
    { href: '/reports', labelKey: 'sidebar.reports' },
    { href: '/settings', labelKey: 'sidebar.settings' },
  ];
</script>

<!-- Simple notice for demonstration on mobile -->
<div class="lg:hidden fixed top-sm left-sm z-50">
  <div class="p-sm bg-payroll-paper border border-payroll-teal/10 rounded-payroll shadow-payroll text-payroll-teal">
    <span class="text-xs font-semibold uppercase tracking-widest">Sidebar Control</span>
    <p class="text-[10px] text-gray-500">Use Storybook controls to toggle isOpen</p>
  </div>
</div>

<Sidebar {isOpen} {className}>
  <div class="p-lg h-full flex flex-col">
    <div class="mb-xl px-md">
      <div class="flex items-center gap-sm">
        <div class="w-xl h-xl bg-payroll-teal rounded-lg flex items-center justify-center text-white font-semibold">P</div>
        <h1 class="text-payroll-teal text-xl font-semibold tracking-tight">PayrollPlus</h1>
      </div>
    </div>
    
    <nav class="flex-1 space-y-xs">
      {#each navItems as item}
        <a 
          href={item.href}
          class="block px-md py-sm rounded-payroll transition-all duration-200 {activeRoute === item.href ? 'bg-payroll-teal text-white font-medium shadow-payroll' : 'text-payroll-teal/80 hover:bg-payroll-teal/5 hover:text-payroll-teal'}"
          aria-current={activeRoute === item.href ? 'page' : undefined}
        >
          {$t(item.labelKey)}
        </a>
      {/each}
    </nav>

    <div class="mt-auto p-md bg-payroll-teal/5 rounded-payroll border border-payroll-teal/10">
      <p class="text-xs text-payroll-teal/60 uppercase font-semibold tracking-widest mb-xs">Company</p>
      <p class="text-sm font-semibold text-payroll-teal">Auckland Office</p>
    </div>
  </div>
</Sidebar>
