import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import CardTest from './Card.test.svelte';

// Mock the localeStore without using external imports inside the factory
vi.mock('$lib/stores/localeStore', () => {
  return {
    t: {
      subscribe: (fn) => {
        // Immediately call the subscriber with our mock translation function
        fn((key) => key);
        // Return an empty unsubscribe function
        return () => {};
      }
    }
  };
});

describe('Card', () => {
  it('should render nested cards correctly with internationalized text', () => {
    render(CardTest);

    const outerCard = screen.getByTestId('outer-card');
    const innerCard1 = screen.getByTestId('inner-card-1');
    const innerCard2 = screen.getByTestId('inner-card-2');

    expect(outerCard).toBeInTheDocument();
    expect(innerCard1).toBeInTheDocument();
    expect(innerCard2).toBeInTheDocument();

    expect(outerCard).toContainElement(innerCard1);
    expect(outerCard).toContainElement(innerCard2);

    // Assert against the internationalization keys
    expect(screen.getByText('payroll.employee_label: John Doe')).toBeInTheDocument();
    expect(screen.getByText('payroll.salary_label: $5000')).toBeInTheDocument();
    expect(screen.getByText('payroll.employee_label: Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('payroll.salary_label: $6000')).toBeInTheDocument();
  });
});
