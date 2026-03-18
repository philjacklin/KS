import { render, screen, fireEvent, cleanup, act } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Navbar from './Navbar.svelte';
import { tick } from 'svelte';

describe('Navbar Component', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    cleanup();
  });

  const setWidth = async (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
    await tick();
  };

  it('Desktop view (width > 768px) displays desktop links and no hamburger button', async () => {
    await setWidth(1024);
    render(Navbar);

    // Main nav
    expect(screen.getByLabelText('navbar.aria_label')).toBeInTheDocument();
    
    // Desktop links should be present
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBe(2); // Main nav + Desktop links div
    
    expect(screen.queryByLabelText('navbar.open_menu')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('navbar.close_menu')).not.toBeInTheDocument();
    
    expect(screen.getByText('navbar.home')).toBeInTheDocument();
  });

  it('Mobile view (width <= 768px) displays hamburger button and no desktop links', async () => {
    await setWidth(375);
    render(Navbar);

    // Only main nav should have navigation role
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBe(1);
    expect(navs[0]).toHaveAttribute('aria-label', 'navbar.aria_label');

    // Hamburger button should be visible
    expect(screen.getByLabelText('navbar.open_menu')).toBeInTheDocument();
  });

  it('Mobile menu toggles visibility correctly when hamburger button is clicked', async () => {
    await setWidth(375);
    render(Navbar);

    const hamburger = screen.getByLabelText('navbar.open_menu');
    
    // Click to open
    await fireEvent.click(hamburger);
    await tick();
    
    expect(screen.getByLabelText('navbar.close_menu')).toBeInTheDocument();
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBe(2); // Main nav + Mobile menu div
    expect(screen.getByText('navbar.home')).toBeInTheDocument();

    // Click to close
    await fireEvent.click(screen.getByLabelText('navbar.close_menu'));
    await tick();
    
    expect(screen.getByLabelText('navbar.open_menu')).toBeInTheDocument();
    expect(screen.getAllByRole('navigation').length).toBe(1);
  });

  it('Keyboard navigation for all Navbar elements is functional', async () => {
    const user = userEvent.setup();
    await setWidth(1024);
    render(Navbar);

    const logo = screen.getByText('NZ Payroll');
    const homeLink = screen.getByText('navbar.home');

    await user.tab();
    expect(logo.closest('a')).toHaveFocus();

    await user.tab();
    expect(homeLink.closest('a')).toHaveFocus();

    cleanup();
    
    await setWidth(375);
    render(Navbar);

    const mobileLogo = screen.getByText('NZ Payroll');
    await user.tab();
    expect(mobileLogo.closest('a')).toHaveFocus();

    await user.tab();
    const hamburger = screen.getByLabelText('navbar.open_menu');
    expect(hamburger).toHaveFocus();

    await user.keyboard('{Enter}');
    await tick();
    expect(screen.getByLabelText('navbar.close_menu')).toBeInTheDocument();

    await user.tab();
    const mobileHomeLink = screen.getByText('navbar.home');
    expect(mobileHomeLink.closest('a')).toHaveFocus();
    
    // Test keyboard activation of a link closes the menu
    await user.keyboard('{Enter}');
    await tick();
    expect(screen.queryByLabelText('navbar.close_menu')).not.toBeInTheDocument();
    expect(screen.getByLabelText('navbar.open_menu')).toBeInTheDocument();
  });

  it('closes mobile menu when a link is clicked', async () => {
    await setWidth(375);
    render(Navbar);

    const hamburger = screen.getByLabelText('navbar.open_menu');
    await fireEvent.click(hamburger);
    await tick();
    
    const homeLink = screen.getByText('navbar.home');
    await fireEvent.click(homeLink);
    await tick();

    expect(screen.getAllByRole('navigation').length).toBe(1);
    expect(screen.getByLabelText('navbar.open_menu')).toBeInTheDocument();
  });

  it('closes mobile menu when transitioning to desktop view', async () => {
    await setWidth(375);
    render(Navbar);

    const hamburger = screen.getByLabelText('navbar.open_menu');
    await fireEvent.click(hamburger);
    await tick();
    expect(screen.getAllByRole('navigation').length).toBe(2);

    await setWidth(1024);
    await tick();
    await act(() => {});

    expect(screen.queryByLabelText('navbar.close_menu')).not.toBeInTheDocument();
    // In desktop, it should have 2 navs again (main + desktop links)
    expect(screen.getAllByRole('navigation').length).toBe(2);
  });

  it('uses custom logo and navItems', () => {
    const customNavItems = [
      { href: '/custom', labelKey: 'custom.label' }
    ];
    render(Navbar, { props: { logo: 'Custom Logo', navItems: customNavItems } });
    
    expect(screen.getByText('Custom Logo')).toBeInTheDocument();
    expect(screen.getByText('custom.label')).toBeInTheDocument();
  });

  it('handles logo click in mobile view', async () => {
    await setWidth(375);
    render(Navbar);

    const hamburger = screen.getByLabelText('navbar.open_menu');
    await fireEvent.click(hamburger);
    await tick();
    
    const logo = screen.getByText('NZ Payroll');
    await fireEvent.click(logo);
    await tick();

    expect(screen.getAllByRole('navigation').length).toBe(1);
  });
});
