// src/lib/components/ui/Alert/Alert.stories.js
import AlertStoryWrapper from "./AlertStoryWrapper.svelte";

export default {
  title: "UI/Alert",
  component: AlertStoryWrapper, // Point to the new wrapper
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["info", "success", "warning", "error"],
      },
    },
    title: { control: "text" },
    message: { control: "text" },
    dismissible: { control: "boolean" },
    inline: { control: "boolean" },
  },
};

export const Info = {
  args: {
    type: "info",
    title: "alert.info.title",
    message: "alert.info.message",
    dismissible: false,
    inline: false,
  },
};

export const Success = {
  args: {
    type: "success",
    title: "alert.success.title",
    message: "alert.success.message",
    dismissible: false,
    inline: false,
  },
};

export const Warning = {
  args: {
    type: "warning",
    title: "alert.warning.title",
    message: "alert.warning.message",
    dismissible: false,
    inline: false,
  },
};

export const Error = {
  args: {
    type: "error",
    title: "alert.error.title",
    message: "alert.error.message",
    dismissible: false,
    inline: false,
  },
};

export const Dismissible = {
  args: {
    type: "info",
    title: "alert.info.title",
    message: "alert.info.message",
    dismissible: true,
    inline: false,
  },
};

export const Inline = {
  args: {
    type: "success",
    title: "alert.success.title",
    message: "alert.success.message",
    dismissible: false,
    inline: true,
  },
};

export const TitleOnly = {
  args: {
    type: "warning",
    title: "alert.warning.title",
    message: "",
    dismissible: false,
    inline: false,
  },
};

export const MessageOnly = {
  args: {
    type: "info",
    title: "",
    message: "alert.info.message",
    dismissible: false,
    inline: false,
  },
};
