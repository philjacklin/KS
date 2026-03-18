import DropdownMenuStory from './DropdownMenuStory.svelte';

/**
 * DropdownMenu component provides a list of actionable items when triggered.
 * It uses Floating UI for positioning and supports accessibility out of the box.
 */
export default {
	title: 'UI/DropdownMenu',
	component: DropdownMenuStory,
	tags: ['autodocs'],
	argTypes: {
		placement: {
			control: 'select',
			options: [
				'top',
				'top-start',
				'top-end',
				'bottom',
				'bottom-start',
				'bottom-end',
				'left',
				'left-start',
				'left-end',
				'right',
				'right-start',
				'right-end'
			],
			description: 'Position of the dropdown relative to the trigger'
		},
		offset: { 
			control: 'number',
			description: 'Distance between the trigger and the dropdown'
		},
		triggerText: { 
			control: 'text',
			description: 'Text to display in the trigger button'
		},
		contentClass: { 
			control: 'text',
			description: 'Additional CSS classes for the dropdown menu'
		},
		items: { 
			control: 'object',
			description: 'Array of menu items with label, onClick, variant, disabled, and active properties'
		},
		isOpen: { 
			control: 'boolean',
			description: 'Whether the dropdown is currently open'
		}
	},
	parameters: {
		layout: 'centered'
	}
};

/**
 * The default state of the DropdownMenu (closed).
 */
export const Closed = {
	args: {
		triggerText: 'Options',
		isOpen: false,
		items: [
			{ label: 'Profile', onClick: () => console.log('Profile clicked') },
			{ label: 'Settings', onClick: () => console.log('Settings clicked') },
			{ label: 'Logout', onClick: () => console.log('Logout clicked'), variant: 'danger' }
		]
	}
};

/**
 * The DropdownMenu shown in its open state.
 */
export const Open = {
	args: {
		triggerText: 'Options',
		isOpen: true,
		items: [
			{ label: 'Profile', onClick: () => console.log('Profile clicked') },
			{ label: 'Settings', onClick: () => console.log('Settings clicked') },
			{ label: 'Logout', onClick: () => console.log('Logout clicked'), variant: 'danger' }
		]
	}
};

/**
 * Demonstrates the DropdownMenu with multiple action items, including active and disabled states.
 */
export const MultipleActions = {
	args: {
		triggerText: 'Many Actions',
		isOpen: true,
		items: [
			{ label: 'View Profile', onClick: () => console.log('Profile clicked') },
			{ label: 'Edit Profile', onClick: () => console.log('Edit clicked') },
			{ label: 'Settings', onClick: () => console.log('Settings clicked'), active: true },
			{ label: 'Invite Member', onClick: () => console.log('Invite clicked'), disabled: true },
			{ label: 'Security', onClick: () => console.log('Security clicked') },
			{ label: 'Log Out', onClick: () => console.log('Logout clicked'), variant: 'danger' }
		],
		placement: 'bottom-start'
	}
};

/**
 * Example with custom styling applied via contentClass.
 */
export const CustomStyling = {
	args: {
		triggerText: 'Branded Menu',
		items: [
			{ label: 'Action 1', onClick: () => console.log('Action 1') },
			{ label: 'Action 2', onClick: () => console.log('Action 2') }
		],
		contentClass: '!bg-payroll-teal !text-white !border-none shadow-2xl p-2',
		placement: 'bottom'
	}
};
