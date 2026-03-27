import React, { useState } from "react";
import { Box } from "@mui/material";
import { auth } from "../../services/api";
import { useAuthForm } from "./userAuthForm";
import AuthForm from "./authForm";
import { useSnackbar } from "../../layout/useSnackBar"; 
import SnackbarComponent from "../../layout/snackBarComponent";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const {
    formData,
    errors,
    touched,
    passwordStrength,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useAuthForm(isLogin);

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleAuthError = (error, isLoginMode) => {
    if (!error.response) {
      showSnackbar("Network error. Please check your connection.", "error");
      return;
    }

    const statusCode = error.response.status;
    const errorData = error.response.data;
    const errorMessage = errorData?.message || errorData?.error || "Something went wrong";
    const lowerCaseMessage = errorMessage.toLowerCase();
    
    if (isLoginMode) {
      if (statusCode === 401) {
        if (lowerCaseMessage.includes("invalid password") || 
            lowerCaseMessage.includes("password incorrect")) {
          showSnackbar("Incorrect password. Please try again.", "error");
        } else {
          showSnackbar("Invalid email or password.", "error");
        }
        return;
      }
      
      if (statusCode === 404 || 
          lowerCaseMessage.includes("user not found") || 
          lowerCaseMessage.includes("email not found")) {
        showSnackbar("Email not found. Please create an account.", "error");
        return;
      }
      
      if (lowerCaseMessage.includes("wrong password") ||
          lowerCaseMessage.includes("incorrect password") ||
          lowerCaseMessage.includes("invalid password")) {
        showSnackbar("Incorrect password. Please try again.", "error");
        return;
      }
      
      showSnackbar(errorMessage, "error");
    } else {
      if (statusCode === 409 || 
          lowerCaseMessage.includes("email already exists")) {
        showSnackbar("Email already exists. Please login instead.", "error");
      } else if (lowerCaseMessage.includes("password")) {
        showSnackbar("Password does not meet security requirements.", "error");
      } else {
        showSnackbar(errorMessage, "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showSnackbar("Please enter valid information.", "warning");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await auth.login({
          email: formData.email,
          password: formData.password,
        });

        if (res?.data?.token) {
          onLogin(res.data.token, res.data.user);
        } else {
          showSnackbar("Login failed. Please try again.", "error");
        }
      } else {
        const registrationData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        await auth.register(registrationData);
        
        showSnackbar("Registration successful! Please login.", "success");
        
        setTimeout(() => {
          setIsLogin(true);
          resetForm();
        }, 2000);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      handleAuthError(err, isLogin);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#dbe2e6",
        p: 2,
      }}
    >
      <AuthForm
        isLogin={isLogin}
        formData={formData}
        errors={errors}
        touched={touched}
        passwordStrength={passwordStrength}
        loading={loading}
        onSubmit={handleSubmit}
        onToggleMode={handleToggleMode}
        onChange={handleChange}
        onBlur={handleBlur}
        showPassword={showPassword}
        onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
        showConfirmPassword={showConfirmPassword}
        onToggleConfirmPasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      <SnackbarComponent 
        snackbar={snackbar}
        onClose={closeSnackbar}
      />
    </Box>
  );
}

export default Login;