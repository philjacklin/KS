import FormFieldStoryWrapper from './FormFieldStoryWrapper.svelte';

export default {
  title: 'UI/FormField',
  component: FormFieldStoryWrapper,
  tags: ['autodocs'],
  argTypes: {
    labelKey: { control: 'text' },
    descriptionKey: { control: 'text' },
    errorMessageKey: { control: 'text' },
    required: { control: 'boolean' },
    placeholderKey: { control: 'text' }
  },
};

export const Default = {
  args: {
    labelKey: 'form.name.label',
    placeholderKey: 'form.name.placeholder'
  },
};

export const WithDescription = {
    args: {
      labelKey: 'form.email.label',
      descriptionKey: 'form.email.description',
      placeholderKey: 'form.email.placeholder'
    },
  };

export const Required = {
  args: {
    labelKey: 'form.password.label',
    required: true,
    placeholderKey: 'form.password.placeholder'
  },
};

export const WithError = {
    args: {
      labelKey: 'form.confirmPassword.label',
      errorMessageKey: 'form.confirmPassword.error',
      placeholderKey: 'form.confirmPassword.placeholder'
    },
  };

export const RequiredWithError = {
    args: {
      labelKey: 'form.username.label',
      required: true,
      errorMessageKey: 'form.username.error',
      placeholderKey: 'form.username.placeholder'
    },
  };

export const WithDescriptionAndError = {
    args: {
      labelKey: 'form.promoCode.label',
      descriptionKey: 'form.promoCode.description',
      errorMessageKey: 'form.promoCode.error',
      placeholderKey: 'form.promoCode.placeholder'
    },
  };

export const FullProps = {
    args: {
      labelKey: 'form.phoneNumber.label',
      required: true,
      descriptionKey: 'form.phoneNumber.description',
      errorMessageKey: 'form.phoneNumber.error',
      placeholderKey: 'form.phoneNumber.placeholder'
    },
  };

export const WithoutLabel = {
    args: {
      labelKey: undefined,
      placeholderKey: 'form.search.placeholder',
      'aria-label': 'Search'
    },
  };

