// Simple toast notifications
export const notifyError = (message) => {
  if (typeof window !== 'undefined') {
    alert(`Error: ${message}`);
    // Or use a toast library like react-toastify, sonner, etc.
  }
};

export const notifySuccess = (message) => {
  if (typeof window !== 'undefined') {
    alert(`Success: ${message}`);
    // Or use a toast library
  }
};