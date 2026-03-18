import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import ContainerTestHost from './ContainerTestHost.svelte';

test('it renders with default props', () => {
    render(ContainerTestHost);

    const testElement = screen.getByText('Test');
    // Find the container div (it's the parent of our test div)
    const container = testElement.parentElement;
    
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('w-full', 'mx-auto', 'block');
});

test('it renders with a custom class', () => {
    render(ContainerTestHost, { props: { customClass: 'my-custom-class' } });
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('my-custom-class');
});

test('it renders with maxWidth="sm"', () => {
    render(ContainerTestHost, { props: { maxWidth: 'sm' } });
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('max-w-[384px]');
});

test('it renders with maxWidth="md"', () => {
    render(ContainerTestHost, { props: { maxWidth: 'md' } });
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('max-w-[448px]');
});

test('it renders with maxWidth="lg"', () => {
    render(ContainerTestHost, { props: { maxWidth: 'lg' } });
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('max-w-[576px]');
});

test('it renders with maxWidth="xl"', () => {
    render(ContainerTestHost, { props: { maxWidth: 'xl' } });
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('max-w-[672px]');
});

test('it renders with maxWidth="2xl"', () => {
    render(ContainerTestHost, { props: { maxWidth: '2xl' } });
    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('max-w-[896px]');
});

test('it renders children', () => {
    render(ContainerTestHost, { props: { childrenText: 'Unique Child' } });
    expect(screen.getByText('Unique Child')).toBeInTheDocument();
});