import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import PropertyCard from "./PropertyCard";

function FavouritesSection({ favourites, onRemoveFavourite }) {
  return (
    <Box sx={{ backgroundColor: "#dbe2e6", py: 5, height: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign={"center"} mb={5} color="#040000">
        My Favourites ({favourites.length})
      </Typography>
      
      {favourites.length === 0 ? (
        <Card sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
          <Typography textAlign="center">
            No favourites yet. Start adding properties!
          </Typography>
        </Card>
      ) : (
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
          {favourites.map((fav) => (
            <Grid item xs={12} sm={6} md={4} key={fav.property_id}>
              <PropertyCard
                property={{
                  id: fav.property_id,
                  title: fav.property_title,
                  price: fav.property_price,
                  location: fav.property_location,
                  image: fav.property_image,
                }}
                isFavourite={true}
                onAddFavourite={() => {}} // No add functionality needed in favourites section
                onRemoveFavourite={() => onRemoveFavourite(fav.property_id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default FavouritesSection;