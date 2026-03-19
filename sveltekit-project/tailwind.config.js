// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/lib/components/**/*.{svelte,js,ts}',
    './src/lib/components/ui/button/variants.ts'
  ],
  safelist: [
    'text-payroll-teal',
    'text-payroll-gold',
    'text-payroll-cyan',
    'text-payroll-paper',
    'text-payroll-destructive',
    'text-primary-500',
    'text-secondary-500',
    'italic',
    'underline',
    'line-through',
    'bg-payroll-teal-500',
  ],
  theme: {
    extend: {
      letterSpacing: {
        'crisp': '-0.01em',
      },
      spacing: {
        'sidebar': '240px',
        'drawer': '320px',
        'datepicker': '288px',
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'full': '9999px',
        'payroll': '16px', // Re-add this token
      },
      boxShadow: {
        'sm': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'md': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'lg': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'payroll': '0px 4px 20px rgba(0, 0, 0, 0.04)',
      },
      colors: {
        primary: {
          50: '#E0F2F4',
          100: '#B3DFE6',
          200: '#80CBD8',
          300: '#4DA8CA',
          400: '#2686A9',
          500: '#005B6B', // This is the primary color from the design standard
          600: '#004C59',
          700: '#003E4A',
          800: '#002F38',
          900: '#002129',
          950: '#001A21'
        },
        secondary: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#FFCD00', // This is the secondary color from the design standard
          600: '#E6B800',
          700: '#CCa300',
          800: '#B38e00',
          900: '#997a00',
          950: '#806500'
        },
        payroll: {
          teal: '#005B6B',     // Primary
          gold: '#FFCD00',     // Secondary (as defined in Design Standards)
          cyan: '#00D1FF',     // Highlight
          paper: '#FDF9F3',    // Background
          destructive: '#D93F3F'
        },
        status: {
          draft: '#A0AEC0',
          pending: '#FFCD00',
          approved: '#48BB78',
          processed: '#00D1FF',
          failed: '#F56565',
          destructive: '#D94A4A'
        },
        disabled: {
          DEFAULT: '#E0E0E0',      // for background
          foreground: '#A0A0A0' // for text
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia']
      },
      maxWidth: {
        'container-sm': '384px',
        'container-md': '448px',
        'container-lg': '576px',
        'container-xl': '672px',
        'container-2xl': '896px',
      },
      fontSize: {
        'xs': ['0.75rem', { 'leading': '1rem' }],
        'sm': ['0.875rem', { 'leading': '1.25rem' }],
        'base': ['1rem', { 'leading': '1.5' }],
        'lg': ['1.125rem', { 'leading': '1.75rem' }],
        'xl': ['1.25rem', { 'leading': '1.75rem' }],
        '2xl': ['1.5rem', { 'leading': '2rem' }],
        '3xl': ['1.875rem', { 'leading': '2.25rem' }],
        '4xl': ['2.25rem', { 'leading': '2.5rem' }],
        '5xl': ['3rem', { 'leading': '1' }],
      }
    }
  },
  plugins: []
};
