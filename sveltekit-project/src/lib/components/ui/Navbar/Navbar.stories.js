import Navbar from './Navbar.svelte';
import { userEvent, within } from '@storybook/test';

export default {
  title: 'UI/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    logo: { control: 'text' },
    className: { control: 'text' },
  }
};

const defaultArgs = {
  logo: 'NZ Payroll',
  navItems: [
    { href: '/', labelKey: 'navbar.home' },
    { href: '/payroll', labelKey: 'navbar.payroll' },
    { href: '/employees', labelKey: 'navbar.employees' },
    { href: '/reports', labelKey: 'navbar.reports' },
    { href: '/settings', labelKey: 'navbar.settings' },
  ],
};

export const Desktop = {
  args: {
    ...defaultArgs
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const MobileClosed = {
  args: {
    ...defaultArgs
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileOpen = {
  args: {
    ...defaultArgs
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The hamburger button is the only button in mobile view
    const hamburger = await canvas.findByRole('button');
    await userEvent.click(hamburger);
  },
};
