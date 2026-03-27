export const validationRules = {
  email: (email) => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Please enter a valid email address (e.g., name@example.com)";
    return "";
  },

  password: (password, isLogin = false) => {
    if (!password) return "Password is required";
    if (isLogin) return ""; // Skip strict validation for login
    
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    if (!/[@$!%*?&]/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
    return "";
  },

  name: (name, isRequired = false) => {
    if (isRequired && !name) return "Name is required";
    if (name && name.length < 2) return "Name must be at least 2 characters long";
    if (name && name.length > 50) return "Name must be less than 50 characters";
    return "";
  },

  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  }
};

export const calculatePasswordStrength = (password) => {
  if (!password) return null;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;

  return {
    strength,
    level: strength === 5 ? "Strong" : strength >= 3 ? "Medium" : "Weak",
    color: strength === 5 ? "success" : strength >= 3 ? "warning" : "error",
    checks,
    percentage: (strength / 5) * 100
  };
};