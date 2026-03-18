import { v4 as uuidv4 } from 'uuid';

function createToastProvider() {
  let toasts = $state([]);

  const addToast = (toast) => {
    const id = uuidv4();
    toasts = [{ ...toast, id }, ...toasts];
  };

  const removeToast = (id) => {
    toasts = toasts.filter((t) => t.id !== id);
  };

  return {
    get toasts() {
      return toasts;
    },
    addToast,
    removeToast,
  };
}

export const toastProvider = createToastProvider();
