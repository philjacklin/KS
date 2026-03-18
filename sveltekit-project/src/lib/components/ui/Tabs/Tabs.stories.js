import TabsStoryWrapper from './TabsStoryWrapper.svelte';
import Tabs from './Tabs.svelte';

export default {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabData: {
      control: 'object',
      description: 'Array of tab objects with labelKey and identifier.'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the container.'
    },
    onSelect: { action: 'selected' }
  }
};

export const Default = {
  render: (args) => ({
    Component: TabsStoryWrapper,
    props: args
  }),
  args: {
    tabData: [
      { labelKey: 'Profile', identifier: 'profile' },
      { labelKey: 'Account', identifier: 'account' },
      { labelKey: 'Settings', identifier: 'settings' }
    ]
  }
};

export const TwoTabs = {
  render: (args) => ({
    Component: TabsStoryWrapper,
    props: args
  }),
  args: {
    tabData: [
      { labelKey: 'Profile', identifier: 'profile' },
      { labelKey: 'Account', identifier: 'account' }
    ]
  }
};

export const CustomWidth = {
  render: (args) => ({
    Component: TabsStoryWrapper,
    props: args
  }),
  args: {
    tabData: [
      { labelKey: 'Profile', identifier: 'profile' },
      { labelKey: 'Account', identifier: 'account' },
      { labelKey: 'Settings', identifier: 'settings' }
    ],
    className: 'max-w-md mx-auto'
  }
};

export const ManyTabs = {
  render: (args) => ({
    Component: TabsStoryWrapper,
    props: args
  }),
  args: {
    tabData: [
      { labelKey: 'Tab 1', identifier: 'tab1' },
      { labelKey: 'Tab 2', identifier: 'tab2' },
      { labelKey: 'Tab 3', identifier: 'tab3' },
      { labelKey: 'Tab 4', identifier: 'tab4' },
      { labelKey: 'Tab 5', identifier: 'tab5' },
      { labelKey: 'Tab 6', identifier: 'tab6' },
      { labelKey: 'Tab 7', identifier: 'tab7' },
      { labelKey: 'Tab 8', identifier: 'tab8' }
    ]
  }
};

export const LongLabels = {
  render: (args) => ({
    Component: TabsStoryWrapper,
    props: args
  }),
  args: {
    tabData: [
      { labelKey: 'Personal Information and Privacy', identifier: 'profile' },
      { labelKey: 'Billing and Subscription Management', identifier: 'account' }
    ]
  }
};
