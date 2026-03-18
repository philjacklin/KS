import TooltipStoryTrigger from './TooltipStoryTrigger.svelte';

export default {
	title: 'UI/Tooltip',
	component: TooltipStoryTrigger,
	tags: ['autodocs'],
	argTypes: {
		placement: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right', 'top-start', 'bottom-start'],
		},
		label: { control: 'text' },
		offset: { control: 'number' },
		className: { control: 'text' }
	},
	parameters: { layout: 'centered' },
};

export const Default = {
	args: {
		label: 'Standard Tooltip',
		placement: 'top',
		triggerText: 'Hover me'
	}
};

export const CustomStyling = {
	args: {
		label: 'Styled Tooltip',
		className: 'bg-slate-800 text-white p-2 rounded shadow-xl',
		triggerText: 'Fancy Hover'
	}
};