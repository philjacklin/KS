import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Stepper from './Stepper.svelte';

vi.mock('$lib/stores/localeStore', () => ({
  t: {
    subscribe: (fn: (v: any) => void) => {
      fn((key: string) => key);
      return () => {};
    }
  }
}));

describe('Stepper component', () => {
  const steps = [
    { label: 'Step 1', description: 'Description 1' },
    { label: 'Step 2', description: 'Description 2' },
    { label: 'Step 3', description: 'Description 3' }
  ];

  it('renders correctly with initial steps', () => {
    render(Stepper, { steps });

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();

    expect(screen.getByLabelText('stepper.progress')).toBeInTheDocument();

    const stepItems = screen.getAllByRole('listitem');
    expect(stepItems[0]).toHaveAttribute('data-state', 'active');
    expect(stepItems[0]).toHaveAttribute('aria-current', 'step');
    expect(stepItems[1]).toHaveAttribute('data-state', 'inactive');
    expect(stepItems[2]).toHaveAttribute('data-state', 'inactive');

    const backButton = screen.getByText('stepper.back');
    expect(backButton.closest('button')).toBeDisabled();
    expect(screen.getByText('stepper.next')).toBeInTheDocument();
  });

  it('navigates through all steps', async () => {
    render(Stepper, { steps });

    const nextButton = screen.getByText('stepper.next');
    
    // Step 0 -> 1
    await fireEvent.click(nextButton);
    expect(screen.getAllByRole('listitem')[1]).toHaveAttribute('data-state', 'active');
    
    // Step 1 -> 2
    await fireEvent.click(screen.getByText('stepper.next'));
    expect(screen.getAllByRole('listitem')[2]).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('stepper.finish')).toBeInTheDocument();
    expect(screen.queryByText('stepper.next')).not.toBeInTheDocument();
  });

  it('navigates backward when Back is clicked', async () => {
    render(Stepper, { steps, activeStepIndex: 1 });

    const backButton = screen.getByText('stepper.back');
    await fireEvent.click(backButton);

    const stepItems = screen.getAllByRole('listitem');
    expect(stepItems[0]).toHaveAttribute('data-state', 'active');
    expect(stepItems[1]).toHaveAttribute('data-state', 'inactive');
  });

  it('renders Finish button on the last step and calls onFinish', async () => {
    const onFinish = vi.fn();
    render(Stepper, { steps, activeStepIndex: 2, onFinish });

    const finishButton = screen.getByText('stepper.finish');
    await fireEvent.click(finishButton);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('does not crash when Finish is clicked and onFinish is not provided', async () => {
    render(Stepper, { steps, activeStepIndex: 2 });
    const finishButton = screen.getByText('stepper.finish');
    await fireEvent.click(finishButton);
  });

  it('updates currentIndex when activeStepIndex prop changes', async () => {
    const { rerender } = render(Stepper, { steps, activeStepIndex: 0 });

    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('data-state', 'active');

    await rerender({ steps, activeStepIndex: 1 });
    expect(screen.getAllByRole('listitem')[1]).toHaveAttribute('data-state', 'active');
  });

  it('applies custom className', () => {
    const { container } = render(Stepper, { steps, className: 'custom-class' });
    expect(container.firstChild).toHaveClass('custom-class');
  });
  
  it('renders without steps gracefully', () => {
    // @ts-ignore
    render(Stepper, { steps: [] });
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('verifies separator lines are rendered and colored correctly', () => {
    render(Stepper, { steps, activeStepIndex: 1 });
    const stepItems = screen.getAllByRole('listitem');
    
    // Step 0 separator should be completed (bg-payroll-teal)
    expect(stepItems[0].querySelector('.bg-payroll-teal')).toBeInTheDocument();
    // Step 1 separator should be inactive (bg-gray-200)
    expect(stepItems[1].querySelector('.bg-gray-200')).toBeInTheDocument();
  });

  it('works correctly with a single step', () => {
    const singleStep = [{ label: 'Only Step' }];
    render(Stepper, { steps: singleStep });
    
    expect(screen.getByText('Only Step')).toBeInTheDocument();
    expect(screen.getByText('stepper.finish')).toBeInTheDocument();
    expect(screen.queryByText('stepper.next')).not.toBeInTheDocument();
    expect(screen.getByText('stepper.back').closest('button')).toBeDisabled();
  });
});
