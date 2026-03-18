<script lang="ts">
  import { t } from '$lib/stores/localeStore';
  import { navbarVariants } from './variants';
  import Link from '$lib/components/ui/Link/Link.svelte';
  import Icon from '$lib/components/ui/Icon/Icon.svelte';
  import { twMerge } from 'tailwind-merge';

  /**
   * @typedef {Object} NavItem
   * @property {string} href
   * @property {string} labelKey
   */

  let { 
    logo = 'NZ Payroll',
    navItems = [
      { href: '/', labelKey: 'navbar.home' },
      { href: '/payroll', labelKey: 'navbar.payroll' },
      { href: '/employees', labelKey: 'navbar.employees' },
      { href: '/reports', labelKey: 'navbar.reports' },
      { href: '/settings', labelKey: 'navbar.settings' },
    ],
    className = ''
  }: {
    logo?: string;
    navItems?: { href: string; labelKey: string }[];
    className?: string;
  } = $props();

  let innerWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1024);
  let isOpen = $state(false);

  const isMobile = $derived(innerWidth < 768);
  const styles = $derived(navbarVariants());

  function toggleMenu() {
    isOpen = !isOpen;
  }

  /**
   * Closes the mobile menu when a link is clicked.
   */
  function handleLinkClick() {
    if (isMobile) {
      isOpen = false;
    }
  }

  // Ensure menu is closed when transitioning to desktop view
  $effect(() => {
    if (!isMobile && isOpen) {
      isOpen = false;
    }
  });

  const menuIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
</script>

<svelte:window bind:innerWidth />

<nav 
  class={twMerge(styles.nav(), className)} 
  aria-label={$t('navbar.aria_label')}
>
  <div class={styles.container()}>
    <!-- Logo Section -->
    <div class="flex items-center">
      <Link 
        href="/" 
        className="text-2xl font-semibold tracking-[-0.01em] text-payroll-teal"
        onclick={handleLinkClick}
      >
        {logo}
      </Link>
    </div>

    <!-- Desktop Navigation Links -->
    {#if !isMobile}
      <div 
        class={styles.desktopLinks()} 
        role="navigation"
      >
        {#each navItems as item}
          <Link 
            href={item.href} 
            className={styles.link()}
          >
            {$t(item.labelKey)}
          </Link>
        {/each}
      </div>
    {/if}

    <!-- Hamburger Menu Button (Mobile View) -->
    {#if isMobile}
      <button
        class={styles.hamburger()}
        onclick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? $t('navbar.close_menu') : $t('navbar.open_menu')}
        type="button"
      >
        <Icon 
          svg={isOpen ? closeIcon : menuIcon} 
          size="24px" 
          className="text-payroll-teal"
        />
      </button>
    {/if}
  </div>

  <!-- Mobile Navigation Links -->
  {#if isMobile && isOpen}
    <div 
      class={styles.mobileMenu()}
      id="mobile-menu"
      role="navigation"
    >
      {#each navItems as item}
        <Link 
          href={item.href} 
          className={twMerge(styles.link(), 'py-2 block w-full')}
          onclick={handleLinkClick}
        >
          {$t(item.labelKey)}
        </Link>
      {/each}
    </div>
  {/if}
</nav>

<style>
  /* Base styles are handled by Tailwind CSS via variants.ts */
</style>
