import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function PropertyCard({
  property,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite,
}) {
  const handleToggleFavourite = async (e) => {
    // Prevent event bubbling
    e.stopPropagation();

    try {
      if (isFavourite) {
        // Pass property ID for removal
        await onRemoveFavourite(property.id);
      } else {
        // Pass full property object for addition
        await onAddFavourite(property);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Error is handled in parent component
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 420,
        paddingBottom: 3,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        position: "relative",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="250"
          image={
            property.image ||
            "https://via.placeholder.com/400x250?text=No+Image"
          }
          alt={property.title}
          sx={{ objectFit: "cover", width: "500px" }}
        />

        {/* Favourite Icon */}
        <IconButton
          onClick={handleToggleFavourite}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 2,
            width: 32,
            height: 32,
            padding: 0,

            bgcolor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(4px)",

            "& svg": {
              fontSize: 18,
            },

            "&:hover": {
              transform: "scale(1.1)",
              bgcolor: "rgba(255,255,255,1)",
            },
          }}
        >
          {isFavourite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {property.title}
        </Typography>

        {/* Price + Location */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" color="primary">
            {property.price}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">
              {property.location}
            </Typography>
          </Box>
        </Box>

        {/* Tags */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {property.type && <Chip label={property.type} size="small" />}
          {property.bedrooms && (
            <Chip label={`${property.bedrooms} BHK`} size="small" />
          )}
        </Box>

        {/* Button */}
        <Button
          fullWidth
          variant={"outlined"}
          onClick={handleToggleFavourite}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            transition: "0.2s",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          {isFavourite
            ? "Remove from Favourites"
            : "Add to Favourites"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;