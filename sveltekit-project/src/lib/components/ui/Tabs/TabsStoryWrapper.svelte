<script lang="ts">
  import Tabs from './Tabs.svelte';

  interface TabData {
    labelKey: string;
    identifier: string;
  }

  let { 
    tabData = [
      { labelKey: 'Profile', identifier: 'profile' },
      { labelKey: 'Account', identifier: 'account' },
      { labelKey: 'Settings', identifier: 'settings' }
    ], 
    className, 
    onSelect 
  }: {
    tabData?: TabData[];
    className?: string;
    onSelect?: (identifier: string) => void;
  } = $props();

  const items = $derived(tabData.map(item => ({
    ...item,
    content: getSnippet(item.identifier)
  })));

  function getSnippet(id: string) {
    switch (id) {
      case 'profile': return profileContent;
      case 'account': return accountContent;
      case 'settings': return settingsContent;
      default: return defaultSnippet;
    }
  }
</script>

{#snippet profileContent()}
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-payroll-teal">Profile</h2>
    <p>Manage your personal information and public profile.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div class="p-4 border border-payroll-teal/10 rounded-payroll bg-white shadow-sm">
        <span class="block text-xs font-bold uppercase tracking-widest text-payroll-teal/60">Full Name</span>
        <span class="text-lg font-medium">Jane Doe</span>
      </div>
      <div class="p-4 border border-payroll-teal/10 rounded-payroll bg-white shadow-sm">
        <span class="block text-xs font-bold uppercase tracking-widest text-payroll-teal/60">Email</span>
        <span class="text-lg font-medium">jane.doe@example.com</span>
      </div>
    </div>
  </div>
{/snippet}

{#snippet accountContent()}
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-payroll-teal">Account</h2>
    <p>Security settings and account management.</p>
    <div class="flex flex-col gap-2 mt-4">
      <button class="bg-payroll-primary text-white px-6 py-2 rounded-payroll font-bold shadow-soft hover:bg-payroll-primary/90 transition-colors w-fit">
        Reset Password
      </button>
      <button class="text-payroll-teal/60 hover:text-payroll-teal px-6 py-2 rounded-payroll font-medium transition-colors w-fit">
        Deactivate Account
      </button>
    </div>
  </div>
{/snippet}

{#snippet settingsContent()}
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-payroll-teal">Settings</h2>
    <p>Notifications and application preferences.</p>
    <div class="space-y-3 mt-4">
      <label class="flex items-center gap-3 p-3 border border-payroll-teal/5 rounded-payroll hover:bg-payroll-paper/50 cursor-pointer transition-colors">
        <input type="checkbox" checked class="accent-payroll-primary h-4 w-4" />
        <span class="font-medium text-payroll-teal">Email Notifications</span>
      </label>
      <label class="flex items-center gap-3 p-3 border border-payroll-teal/5 rounded-payroll hover:bg-payroll-paper/50 cursor-pointer transition-colors">
        <input type="checkbox" class="accent-payroll-primary h-4 w-4" />
        <span class="font-medium text-payroll-teal">SMS Alerts</span>
      </label>
    </div>
  </div>
{/snippet}

{#snippet defaultSnippet()}
  <div class="p-8 text-center border-2 border-dashed border-payroll-teal/10 rounded-payroll">
    <p class="text-payroll-teal/60 italic font-medium">Generic content for this tab.</p>
  </div>
{/snippet}

<Tabs {items} {className} {onSelect} />
