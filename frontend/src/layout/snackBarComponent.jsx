// src/layout/SnackbarComponent.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarComponent = ({ snackbar, onClose }) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert 
        severity={snackbar.severity} 
        variant="filled"
        sx={{ width: "100%" }}
        onClose={onClose}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;