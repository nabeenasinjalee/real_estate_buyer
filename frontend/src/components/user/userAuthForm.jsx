import { useState, useCallback } from "react";
import { validationRules, calculatePasswordStrength } from "./validation";

export const useAuthForm = (isLogin) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case "email":
        return validationRules.email(value);
      case "password":
        return validationRules.password(value, isLogin);
      case "confirmPassword":
        return validationRules.confirmPassword(formData.password, value);
      case "name":
        return validationRules.name(value, !isLogin);
      default:
        return "";
    }
  }, [isLogin, formData.password]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Update password strength for registration
    if (!isLogin && name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear confirm password error when password changes
    if (name === "password" && formData.confirmPassword) {
      const confirmError = validationRules.confirmPassword(value, formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  }, [validateField, isLogin, formData.confirmPassword]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField, formData]);

  const validateForm = useCallback(() => {
    const newErrors = {
      email: validationRules.email(formData.email),
      password: validationRules.password(formData.password, isLogin),
      name: validationRules.name(formData.name, !isLogin),
    };
    
    if (!isLogin) {
      newErrors.confirmPassword = validationRules.confirmPassword(
        formData.password,
        formData.confirmPassword
      );
    }
    
    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
      name: !isLogin,
      confirmPassword: !isLogin,
    });
    
    return !Object.values(newErrors).some(error => error);
  }, [formData, isLogin]);

  const resetForm = useCallback(() => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
    setErrors({});
    setPasswordStrength(null);
    setTouched({});
  }, []);

  return {
    formData,
    errors,
    touched,
    passwordStrength,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormData,
  };
};