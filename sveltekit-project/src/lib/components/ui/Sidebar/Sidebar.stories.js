import SidebarStoryWrapper from './SidebarStoryWrapper.svelte';

/**
 * The Sidebar component provides the main navigation structure for the application.
 * It is responsive, hiding on mobile viewports unless explicitly opened via the `isOpen` prop.
 * * @type {import('@storybook/svelte').Meta}
 */
const meta = {
  title: 'UI/Sidebar',
  component: SidebarStoryWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive sidebar component that demonstrates navigation and active route states.',
      },
    },
  },
  argTypes: {
    isOpen: { 
      control: 'boolean',
      description: 'Controls whether the sidebar is visible on mobile viewports.',
    },
    activeRoute: {
      control: 'select',
      options: ['/', '/payroll', '/employees', '/reports', '/settings'],
      description: 'The currently active route, used to highlight the corresponding navigation item.',
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes to apply to the sidebar.',
    },
  },
};

export default meta;

/**
 * Default desktop view. The sidebar is visible by default on large screens.
 */
export const Desktop = {
  args: {
    isOpen: false,
    activeRoute: '/',
  },
};

/**
 * Mobile view where the sidebar is hidden (collapsed).
 */
export const MobileClosed = {
  args: {
    isOpen: false,
    activeRoute: '/',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Mobile view where the sidebar has been toggled open.
 */
export const MobileOpen = {
  args: {
    isOpen: true,
    activeRoute: '/',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Demonstrates the sidebar with the Payroll route active.
 */
export const ActivePayroll = {
  args: {
    isOpen: false,
    activeRoute: '/payroll',
  },
};

/**
 * Demonstrates the sidebar with the Employees route active.
 */
export const ActiveEmployees = {
  args: {
    isOpen: false,
    activeRoute: '/employees',
  },
};

/**
 * Demonstrates the sidebar with a custom class applied.
 */
export const CustomClass = {
  args: {
    isOpen: false,
    activeRoute: '/',
    className: 'border-r-4 border-payroll-gold',
  },
};