import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Person } from "@mui/icons-material";
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import PasswordStrength from "./passwordStrength";

const AuthForm = ({
  isLogin,
  formData,
  errors,
  touched,
  passwordStrength,
  loading,
  onSubmit,
  onToggleMode,
  onChange,
  onBlur,
  showPassword,
  onTogglePasswordVisibility,
  showConfirmPassword,
  onToggleConfirmPasswordVisibility,
}) => {
  return (
    <Card sx={{ width: 500, p: 2, borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <RoofingRoundedIcon
          sx={{ fontSize: 50, display: "block", mx: "auto", mb: 2, color: "primary.main" }}
        />
        
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary" mb={2}>
          {isLogin
            ? "Enter your credentials to login to your account"
            : "Enter your details to start exploring properties"}
        </Typography>

        <Box component="form" onSubmit={onSubmit} mt={2}>
          {!isLogin && (
            <Box mb={2}>
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={onChange}
                onBlur={onBlur}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          <Box mb={2}>
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {!isLogin && (
            <>
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={onToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <PasswordStrength strength={passwordStrength} />
            </>
          )}

          <Box className="buttons" mt={3} display="flex" flexDirection="column" gap={2}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Login"
                : "Create Account"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              onClick={onToggleMode}
            >
              {isLogin
                ? "Create new account"
                : "Already have an account? Login"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuthForm;