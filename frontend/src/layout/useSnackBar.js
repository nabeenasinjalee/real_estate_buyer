import { useState } from "react";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const showSnackbar = (message, severity = "error") => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  };
};

// Add default export
export default useSnackbar;