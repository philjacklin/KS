import { tv } from 'tailwind-variants';

export const sliderVariants = tv({
  slots: {
    track: 'relative h-2 w-full rounded-full bg-payroll-teal/10',
    thumb: 'absolute top-[-4px] block h-4 w-4 rounded-full bg-payroll-gold shadow-payroll transition-all'
  },
  variants: {
    checked: {
      true: {
        track: 'bg-payroll-gold',
        thumb: 'left-[calc(100%-16px)]'
      },
      false: {
        track: 'bg-payroll-teal/10',
        thumb: 'left-0'
      }
    },
    disabled: {
      true: {
        track: 'opacity-50 cursor-not-allowed',
        thumb: 'bg-gray-300'
      }
    }
  },
  defaultVariants: {
    checked: false,
    disabled: false
  }
});
