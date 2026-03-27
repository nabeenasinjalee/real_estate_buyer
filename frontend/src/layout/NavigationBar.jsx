import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1e293b", paddingX: 4, py: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RoofingRoundedIcon />
          <Typography variant="h6" fontWeight="bold">
            Property Hub
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit">Buy</Button>
          <Button color="inherit">Rent</Button>
          <Button color="inherit">Sell</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;