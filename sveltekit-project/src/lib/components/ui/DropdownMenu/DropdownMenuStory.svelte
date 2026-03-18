<script lang="ts">
	import DropdownMenu from './DropdownMenu.svelte';
	import { t } from '$lib/stores/localeStore';

	let {
		triggerText = 'dropdown.open_menu',
		items = [
			{ label: 'dropdown.profile', onClick: () => alert('Profile clicked') },
			{ label: 'dropdown.settings', onClick: () => alert('Settings clicked') },
			{ label: 'dropdown.logout', onClick: () => alert('Logout clicked'), variant: 'danger' }
		],
		placement = 'bottom-start',
		offset = 4,
		className = '',
		contentClass = '',
		isOpen = $bindable(false)
	} = $props();
</script>

<DropdownMenu
	{items}
	{placement}
	{offset}
	{className}
	{contentClass}
	bind:isOpen
>
	{#snippet trigger()}
		<button class="bg-payroll-teal text-white px-4 py-2 rounded-payroll font-medium hover:bg-payroll-teal/90 transition-colors">
			{$t(triggerText)}
		</button>
	{/snippet}
</DropdownMenu>
