import Drawer from '$lib/components/ui/Drawer/Drawer.svelte';
import DrawerStoryWrapper from './DrawerStoryWrapper.svelte';
import { userEvent, within, expect } from '@storybook/test';

export default {
	title: 'UI/Drawer',
	component: Drawer,
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: {
				type: 'select',
				options: ['left', 'right', 'top', 'bottom']
			}
		}
	},
	parameters: {
		layout: 'fullscreen'
	}
};

export const Default = {
	render: (args) => ({
		Component: DrawerStoryWrapper,
		props: args
	}),
	args: {
		position: 'left'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const openButton = await canvas.getByRole('button', { name: /Open Drawer/i });
		await userEvent.click(openButton);
		
		const drawer = await canvas.findByRole('dialog');
		expect(drawer).toBeInTheDocument();

		const closeButton = await within(drawer).getByRole('button', { name: /Close/i });
		await userEvent.click(closeButton);

		expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
	}
};

export const Right = {
	...Default,
	args: {
		...Default.args,
		position: 'right'
	}
};

export const Top = {
	...Default,
	args: {
		...Default.args,
		position: 'top'
	}
};

export const Bottom = {
	...Default,
	args: {
		...Default.args,
		position: 'bottom'
	}
};

