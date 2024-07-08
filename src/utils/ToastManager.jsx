// toastManager.js
import { toast } from 'react-toastify';

const toastOptions = {
  position: "bottom-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const ToastManager = {

  success(message) {
    toast.success(message, {
      ...toastOptions,
      style: { backgroundColor: 'green', color: 'white' }
    });
  },

  error(message) {
    toast.error(message, {
      ...toastOptions,
      style: { backgroundColor: 'red', color: 'white' }
    });
  }
  
};
