import Breadcrumb from './Breadcrumb.svelte';

export default {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: { 
      control: 'object',
      description: 'An array of breadcrumb navigation items'
    },
    className: { 
      control: 'text',
      description: 'Optional additional CSS classes'
    }
  }
};

export const Default = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Payroll', path: '/payroll' },
      { label: 'Pay Runs', path: '/payroll/pay-runs' }
    ]
  }
};

export const SingleItem = {
  args: {
    items: [
      { label: 'Dashboard', path: '/dashboard' }
    ]
  }
};

export const MultipleItems = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Organization', path: '/org' },
      { label: 'Departments', path: '/org/depts' },
      { label: 'Engineering', path: '/org/depts/eng' },
      { label: 'Infrastructure Team', path: '/org/depts/eng/infra' },
      { label: 'Logs', path: '/org/depts/eng/infra/logs' }
    ]
  }
};

export const LongLabels = {
  args: {
    items: [
      { label: 'Primary Administration Overview', path: '/' },
      { label: 'Human Resources Development and Management Policy', path: '/hr-admin' },
      { label: 'Employee Professional Performance and Career Development Evaluation System', path: '/hr-admin/performance-review' }
    ]
  }
};

export const CustomClass = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Settings', path: '/settings' }
    ],
    className: 'bg-payroll-paper p-4 rounded-payroll shadow-payroll border border-payroll-teal/10'
  }
};
