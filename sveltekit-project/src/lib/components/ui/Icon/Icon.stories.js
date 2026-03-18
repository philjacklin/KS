import Icon from "./Icon.svelte";

export default {
  title: "UI/Icon",
  component: Icon,
  argTypes: {
    size: { control: "text" },
    alt: { control: "text" },
    className: { control: "text" },
  },
};

export const Default = {
  args: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\n  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />\n</svg>',
    size: "48px",
    alt: "Default Icon",
    className: "text-blue-600 animate-bounce",
  },
};

export const LargeRed = {
  args: {
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>',
    size: "100px",
    className: "text-red-500",
    alt: "test",
  },
};
