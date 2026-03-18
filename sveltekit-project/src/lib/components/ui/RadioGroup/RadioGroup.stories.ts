import type { Meta, StoryObj } from "@storybook/svelte";
import RadioGroup from "./RadioGroup.svelte";
import Wrapper from "./Wrapper.svelte"; // Import your new wrapper

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: {
        type: "select",
        options: ["vertical", "horizontal"],
      },
    },
  },
} satisfies Meta<RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: "1", labelKey: "option1" },
  { value: "2", labelKey: "option2" },
  { value: "3", labelKey: "option3" },
];

export const Default: Story = {
  args: {
    items,
    name: "default-group",
    value: "1",
    onChange: (value: string) => console.log(value),
  },
};

export const Horizontal: Story = {
  args: {
    items,
    name: "horizontal-group",
    orientation: "horizontal",
    value: "1",
    onChange: (value: string) => console.log(value),
  },
};

export const Disabled: Story = {
  args: {
    items: [...items, { value: "4", labelKey: "option4", disabled: true }],
    name: "disabled-group",
    value: "1",
    onChange: (value: string) => console.log(value),
  },
};

export const PreselectedValue: Story = {
  args: {
    items,
    name: "preselected-group",
    value: "2",
    onChange: (value: string) => console.log(value),
  },
};

export const NoItems: Story = {
  args: {
    items: [],
    name: "no-items-group",
    onChange: (value: string) => console.log(value),
  },
};

export const AllItemsDisabled: Story = {
  args: {
    items: items.map((item) => ({ ...item, disabled: true })),
    name: "all-disabled-group",
    value: "1",
    onChange: (value: string) => console.log(value),
  },
};

export const CustomStyling: Story = {
  render: (args) => ({
    Component: Wrapper,
    props: {
      ...args,
      Component: RadioGroup,
    },
  }),
  args: {
    items,
    name: "custom-styling-group",
    value: "1",
    onChange: (value: string) => console.log(value),
    class: "bg-red-200 p-4 rounded-lg",
    className: "",
  },
};
