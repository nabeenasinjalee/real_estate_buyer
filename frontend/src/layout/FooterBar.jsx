import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
} from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#0f172a", color: "white", pt: 5, pb: 3 , display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Grid container spacing={10} px={4}>
        
        {/* Company */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            RealEstate
          </Typography>
          <Typography variant="body2">
            Find your dream home with verified listings, trusted agents, and
            seamless buying experience.
          </Typography>
        </Grid>

        {/* Buyer Resources */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Buyers
          </Typography>
          <Typography variant="body2">How to Buy</Typography>
          <Typography variant="body2">Home Loans</Typography>
          <Typography variant="body2">Property Legal Guide</Typography>
          <Typography variant="body2">FAQs</Typography>
        </Grid>

        {/* Property Types */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Properties
          </Typography>
          <Typography variant="body2">Apartments</Typography>
          <Typography variant="body2">Villas</Typography>
          <Typography variant="body2">Commercial</Typography>
          <Typography variant="body2">Land / Plots</Typography>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body2">
            Email: support@realestate.com
          </Typography>
          <Typography variant="body2">
            Phone: +977-9800000000
          </Typography>
          <Typography variant="body2">
            Location: Kathmandu, Nepal
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom */}
      <Box textAlign="center" mt={4}>
        <Typography variant="body2">
          © {new Date().getFullYear()} RealEstate. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;