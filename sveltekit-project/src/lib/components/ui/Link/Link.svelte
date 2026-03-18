<script>
  import { twMerge } from 'tailwind-merge';
  import { t } from '$lib/stores/localeStore.js';

  // Destructure props - do not assign these to other local variables 
  // outside of $derived or the template!
  let { 
    href = '#', 
    external = false, 
    variant = 'primary', 
    className = '', 
    onclick,
    children 
  } = $props();

  const variantClasses = {
    primary: 'text-payroll-teal',
    secondary: 'text-payroll-gold',
  };

  // This is safe because $derived is a closure that Svelte tracks
  let baseClass = $derived(
    twMerge(
      'hover:underline cursor-pointer transition-colors',
      variantClasses[variant] || variantClasses.primary, 
      className
    )
  );
</script>

<a
  {href} 
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  class={baseClass}
  onclick={onclick}
>
  {@render children?.()}
</a>
