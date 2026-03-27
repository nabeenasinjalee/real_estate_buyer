import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

function DashboardHeader({ user, onLogout }) {
  return (
    <Card sx={{ mb: 4, px: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          py: 3
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Buyer Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: "500px",
          }}
        >
          <Typography variant="body1">
            Welcome, <strong>{user?.name}</strong>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Role: {user?.role}
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={onLogout}
            sx={{
              textTransform: "none",
              px: 2.5,
              py: 0.8,
              borderRadius: 2,
              width: "100px",
            }}
          >
            Logout
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DashboardHeader;