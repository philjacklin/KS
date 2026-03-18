import Avatar from './Avatar.svelte';

/**
 * The Avatar component is used to represent a user or entity.
 * It can display an image, or fall back to initials if the image is missing or fails to load.
 */
export default {
	title: 'UI/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'text',
			description: 'The size of the avatar (e.g., "40px", "80px").'
		},
		name: {
			control: 'text',
			description: 'The name of the user, used for initials and aria-label.'
		},
		imageUrl: {
			control: 'text',
			description: 'The URL of the user\'s avatar image.'
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes for the component.'
		}
	},
	args: {
		name: 'John Doe'
	}
};

/**
 * Default Avatar with an image at the default size (40px).
 */
export const Default = {
	args: {
		imageUrl: 'https://i.pravatar.cc/150?u=johndoe'
	}
};

/**
 * Avatar displaying initials when no image URL is provided.
 */
export const WithInitials = {
	args: {
		name: 'Jane Smith',
		imageUrl: undefined
	}
};

/**
 * Avatar displaying initials as a fallback when the image fails to load.
 */
export const ImageFallback = {
	args: {
		name: 'Broken Image',
		imageUrl: 'https://invalid-url.com/non-existent.jpg'
	}
};

/**
 * Small sized avatar (24px).
 */
export const Small = {
	args: {
		size: '24px',
		imageUrl: 'https://i.pravatar.cc/150?u=small'
	}
};

/**
 * Large sized avatar (96px).
 */
export const Large = {
	args: {
		size: '96px',
		imageUrl: 'https://i.pravatar.cc/150?u=large'
	}
};

/**
 * Avatar with a custom arbitrary size (64px) and additional Tailwind classes.
 */
export const CustomStyle = {
	args: {
		size: '64px',
		imageUrl: 'https://i.pravatar.cc/150?u=custom',
		className: 'border-2 border-payroll-gold shadow-payroll'
	}
};
