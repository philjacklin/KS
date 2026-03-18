import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import TooltipTestHost from './TooltipTestHost.svelte';

describe('Tooltip', () => {
	const setup = (props = { label: 'Test Tooltip' }) => {
		return {
			user: userEvent.setup(),
			...render(TooltipTestHost, props)
		};
	};

	it('should not be visible initially', () => {
		setup();
		expect(screen.queryByText('Test Tooltip')).toBeNull();
	});

	it('should appear on hover', async () => {
		const { user } = setup();
		const trigger = screen.getByText('Trigger');
		
		await user.hover(trigger);
		
		const tooltip = await screen.findByText('Test Tooltip');
		expect(tooltip).toBeInTheDocument();
	});

	it('should respect the disabled prop', async () => {
		const { user } = setup({ label: 'Test Tooltip', disabled: true });
		const trigger = screen.getByText('Trigger');
		
		await user.hover(trigger);
		expect(screen.queryByText('Test Tooltip')).toBeNull();
	});
});