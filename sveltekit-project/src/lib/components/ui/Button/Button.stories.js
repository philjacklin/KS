import Button from './Button.svelte';
import { createRawSnippet } from 'svelte';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  render: (args) => ({
    Component: Button,
    props: {
      ...args,
      children: createRawSnippet(() => ({
        render: () => `<span>${args.label || ''}</span>`
      }))
    }
  }),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive', 'link', 'outline']
    },
    label: { control: 'text' },
    onclick: { action: 'clicked' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
};

// --- Helper to generate state variations ---
const createStateStory = (variant, label, state = null) => {
  const story = {
    args: { variant, label: `${label}${state ? ' ' + state : ''}`, disabled: state === 'Disabled', loading: state === 'Loading' }
  };
  if (state && !['Disabled', 'Loading'].includes(state)) {
    story.parameters = { pseudo: { [state.toLowerCase()]: true } };
  }
  return story;
};

/* --- BASE VARIANTS --- */
export const Primary = createStateStory('primary', 'Primary');
export const Secondary = createStateStory('secondary', 'Secondary');
export const Ghost = createStateStory('ghost', 'Ghost');
export const Danger = createStateStory('destructive', 'Danger');
export const Link = createStateStory('link', 'Link');
export const Outline = createStateStory('outline', 'Outline');

/* --- PRIMARY STATES --- */
export const PrimaryHover = createStateStory('primary', 'Primary', 'Hover');
export const PrimaryFocus = createStateStory('primary', 'Primary', 'Focus');
export const PrimaryActive = createStateStory('primary', 'Primary', 'Active');
export const PrimaryDisabled = createStateStory('primary', 'Primary', 'Disabled');
export const PrimaryLoading = createStateStory('primary', 'Primary', 'Loading');

/* --- SECONDARY STATES --- */
export const SecondaryHover = createStateStory('secondary', 'Secondary', 'Hover');
export const SecondaryFocus = createStateStory('secondary', 'Secondary', 'Focus');
export const SecondaryActive = createStateStory('secondary', 'Secondary', 'Active');
export const SecondaryDisabled = createStateStory('secondary', 'Secondary', 'Disabled');
export const SecondaryLoading = createStateStory('secondary', 'Secondary', 'Loading');


/* --- GHOST STATES --- */
export const GhostHover = createStateStory('ghost', 'Ghost', 'Hover');
export const GhostFocus = createStateStory('ghost', 'Ghost', 'Focus');
export const GhostActive = createStateStory('ghost', 'Ghost', 'Active');
export const GhostDisabled = createStateStory('ghost', 'Ghost', 'Disabled');

/* --- DANGER/DESTRUCTIVE STATES --- */
export const DangerHover = createStateStory('destructive', 'Danger', 'Hover');
export const DangerFocus = createStateStory('destructive', 'Danger', 'Focus');
export const DangerActive = createStateStory('destructive', 'Danger', 'Active');
export const DangerDisabled = createStateStory('destructive', 'Danger', 'Disabled');

/* --- LINK STATES --- */
export const LinkHover = createStateStory('link', 'Link', 'Hover');
export const LinkFocus = createStateStory('link', 'Link', 'Focus');
export const LinkActive = createStateStory('link', 'Link', 'Active');
export const LinkDisabled = createStateStory('link', 'Link', 'Disabled');

/* --- OUTLINE STATES --- */
export const OutlineHover = createStateStory('outline', 'Outline', 'Hover');
export const OutlineFocus = createStateStory('outline', 'Outline', 'Focus');
export const OutlineActive = createStateStory('outline', 'Outline', 'Active');
export const OutlineDisabled = createStateStory('outline', 'Outline', 'Disabled');