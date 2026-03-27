import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PropertyCard from "./PropertyCard";

function PropertiesSection({ properties, isFavourite, onAddFavourite, onRemoveFavourite }) {
  return (
    <Box sx={{ mb: 10 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"} mb={5}>
        Available Properties
      </Typography>
      <Grid 
        container 
        spacing={8} 
        sx={{ 
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center", 
          justifyContent: "center" 
        }}
      >
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard
              property={property}
              isFavourite={isFavourite(property.id)}
              onAddFavourite={() => onAddFavourite(property)}  
              onRemoveFavourite={() => onRemoveFavourite(property.id)}  
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PropertiesSection;