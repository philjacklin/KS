import VisualAudit from './VisualAudit.svelte';

/**
 * Visual Audit Page
 * Renders all design system components together to verify visual consistency.
 */
export default {
  title: 'Visual/VisualAudit',
  component: VisualAudit,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A dedicated page that renders all design system components together for visual verification of cohesive visual identity, consistent spacing, and alignment.',
      },
    },
  },
};

export const Default = {};
