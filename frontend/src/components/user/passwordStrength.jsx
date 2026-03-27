import React from "react";
import { Box, LinearProgress, Typography, List, ListItem, Chip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PasswordStrength = ({ strength }) => {
  if (!strength) return null;

  const getStrengthColor = () => {
    switch (strength.level) {
      case "Strong": return "success";
      case "Medium": return "warning";
      default: return "error";
    }
  };

  const getStrengthMessage = () => {
    switch (strength.level) {
      case "Strong": return "Excellent! Your password is very secure.";
      case "Medium": return "Good, but you can make it stronger.";
      default: return "Weak password. Please add more complexity.";
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          Password Strength:
        </Typography>
        <Chip 
          label={strength.level} 
          color={getStrengthColor()} 
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={strength.percentage}
        color={getStrengthColor()}
        sx={{ height: 8, borderRadius: 4 }}
      />
      
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {getStrengthMessage()}
      </Typography>

      <List dense sx={{ mt: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
        <ListItem sx={{ py: 0.5 }}>
          {strength.checks.length ? 
            <CheckCircleIcon color="success" sx={{ fontSize: 16, mr: 1 }} /> : 
            <CancelIcon color="error" sx={{ fontSize: 16, mr: 1 }} />
          }
          <Typography variant="body2">At least 8 characters</Typography>
        </ListItem>
        <ListItem sx={{ py: 0.5 }}>
          {strength.checks.uppercase ? 
            <CheckCircleIcon color="success" sx={{ fontSize: 16, mr: 1 }} /> : 
            <CancelIcon color="error" sx={{ fontSize: 16, mr: 1 }} />
          }
          <Typography variant="body2">At least one uppercase letter</Typography>
        </ListItem>
        <ListItem sx={{ py: 0.5 }}>
          {strength.checks.lowercase ? 
            <CheckCircleIcon color="success" sx={{ fontSize: 16, mr: 1 }} /> : 
            <CancelIcon color="error" sx={{ fontSize: 16, mr: 1 }} />
          }
          <Typography variant="body2">At least one lowercase letter</Typography>
        </ListItem>
        <ListItem sx={{ py: 0.5 }}>
          {strength.checks.number ? 
            <CheckCircleIcon color="success" sx={{ fontSize: 16, mr: 1 }} /> : 
            <CancelIcon color="error" sx={{ fontSize: 16, mr: 1 }} />
          }
          <Typography variant="body2">At least one number</Typography>
        </ListItem>
        <ListItem sx={{ py: 0.5 }}>
          {strength.checks.special ? 
            <CheckCircleIcon color="success" sx={{ fontSize: 16, mr: 1 }} /> : 
            <CancelIcon color="error" sx={{ fontSize: 16, mr: 1 }} />
          }
          <Typography variant="body2">At least one special character (@$!%*?&)</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default PasswordStrength;