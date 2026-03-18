import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Progress from './Progress.svelte';

describe('Progress', () => {
  it('renders with default props', () => {
    render(Progress);
    const progressBar = screen.getByRole('progressbar');
    const fill = progressBar.querySelector('div');

    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).not.toHaveAttribute('aria-invalid');
    expect(fill).toBeInTheDocument();
    expect(fill).toHaveClass('bg-payroll-teal');
  });

  it('displays the correct progress percentage', () => {
    render(Progress, { value: 50, max: 100 });
    const progressBar = screen.getByRole('progressbar');
    const fill = progressBar.querySelector('div');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(fill).toHaveStyle('width: 50%');
  });

  it('displays 0% when value is 0', () => {
    render(Progress, { value: 0, max: 100 });
    const progressBar = screen.getByRole('progressbar');
    const fill = progressBar.querySelector('div');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(fill).toHaveStyle('width: 0%');
  });

  it('displays 100% when value is max', () => {
    render(Progress, { value: 100, max: 100 });
    const progressBar = screen.getByRole('progressbar');
    const fill = progressBar.querySelector('div');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    expect(fill).toHaveStyle('width: 100%');
  });

  it('shows label when showLabel is true and label is provided', () => {
    render(Progress, { label: 'Loading...', showLabel: true });
    const labelElement = screen.getByText('Loading...');
    expect(labelElement).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-labelledby', labelElement.id);
  });

  it('does not show label when showLabel is false', () => {
    render(Progress, { label: 'Loading...', showLabel: false });
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-labelledby');
  });

  it('applies error status styles', () => {
    render(Progress, { value: 20, status: 'error' });
    const progressBar = screen.getByRole('progressbar');
    const fill = progressBar.querySelector('div');
    expect(progressBar).toHaveAttribute('aria-invalid', 'true');
    expect(fill).toHaveClass('bg-red-500');
  });

  it('applies success status styles', () => {
    render(Progress, { value: 80, status: 'success' });
    const progressBar = screen.getByRole('progressbar');
    const fill = progressBar.querySelector('div');
    expect(fill).toHaveClass('bg-green-500');
  });

  it('applies indeterminate styles', () => {
    render(Progress, { isIndeterminate: true });
    const progressBar = screen.getByRole('progressbar');
    const fill = progressBar.querySelector('div');
    expect(progressBar).not.toHaveAttribute('aria-valuenow');
    expect(fill).toHaveClass('animate-indeterminate');
    expect(fill).toHaveStyle('width: 100%');
  });

  it('renders steps correctly', () => {
    render(Progress, { steps: 3, currentStep: 1 });
    const progressBar = screen.getByRole('progressbar');
    const stepElements = progressBar.querySelectorAll('div.h-2.w-2.rounded-full');

    expect(stepElements.length).toBe(3);
    expect(stepElements[0]).toHaveClass('bg-payroll-teal'); // complete
    expect(stepElements[1]).toHaveClass('bg-payroll-gold'); // current
    expect(stepElements[1]).toHaveAttribute('aria-current', 'step');
    expect(stepElements[2]).toHaveClass('bg-payroll-teal/20'); // upcoming
  });

  it('applies custom className', () => {
    const { container } = render(Progress, { className: 'custom-class' });
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('does not render steps when steps is undefined', () => {
    render(Progress, { currentStep: 1 });
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.querySelectorAll('div.h-2.w-2.rounded-full').length).toBe(0);
    expect(progressBar.querySelector('div')).toBeInTheDocument(); // Should render the single fill div
  });

  it('does not render steps when currentStep is undefined', () => {
    render(Progress, { steps: 3 });
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.querySelectorAll('div.h-2.w-2.rounded-full').length).toBe(0);
    expect(progressBar.querySelector('div')).toBeInTheDocument(); // Should render the single fill div
  });

  it('handles currentStep at the beginning of steps', () => {
    render(Progress, { steps: 3, currentStep: 0 });
    const progressBar = screen.getByRole('progressbar');
    const stepElements = progressBar.querySelectorAll('div.h-2.w-2.rounded-full');
    expect(stepElements[0]).toHaveClass('bg-payroll-gold');
    expect(stepElements[1]).toHaveClass('bg-payroll-teal/20');
    expect(stepElements[2]).toHaveClass('bg-payroll-teal/20');
  });

  it('handles currentStep at the end of steps', () => {
    render(Progress, { steps: 3, currentStep: 2 });
    const progressBar = screen.getByRole('progressbar');
    const stepElements = progressBar.querySelectorAll('div.h-2.w-2.rounded-full');
    expect(stepElements[0]).toHaveClass('bg-payroll-teal');
    expect(stepElements[1]).toHaveClass('bg-payroll-teal');
    expect(stepElements[2]).toHaveClass('bg-payroll-gold');
  });

  it('handles max value of 0', () => {
     render(Progress, { value: 10, max: 0 });
     const progressBar = screen.getByRole('progressbar');
     const fill = progressBar.querySelector('div');
     expect(progressBar).toHaveAttribute('aria-valuenow', '0');
     expect(fill).toHaveStyle('width: 0%');
   });
});
