import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { sampleProperties } from "./sampleProperties";
import { useSnackbar } from "../../layout/useSnackBar";
import SnackbarComponent from "../../layout/snackBarComponent";
import { useFavourites } from "./useFavourites";
import DashboardHeader from "./dashboardHeader";
import PropertiesSection from "./propertiesSection";
import FavouritesSection from "./favouritesSection";
import LoadingState from "./loadingState";

function Dashboard({ user, onLogout }) {
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const {
    favouritesList,
    loading,
    fetchFavourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  } = useFavourites();

  useEffect(() => {
    const loadFavourites = async () => {
      const result = await fetchFavourites();
      if (!result.success) {
        showSnackbar(result.error, "error");
      }
    };

    loadFavourites();
  }, []); 

  const handleAddFavourite = async (property) => {
    const result = await addFavourite(property);

    if (result.success) {
      showSnackbar(`${property.title} added to favourites!`, "success");
    } else {
      showSnackbar(result.error, "error");
    }
  };

  const handleRemoveFavourite = async (propertyId) => {
    const property = favouritesList.find(fav => fav.property_id === propertyId);
    const propertyTitle = property?.property_title || "Property";

    const result = await removeFavourite(propertyId);
    if (result.success) {
      showSnackbar(`${propertyTitle} removed from favourites`, "info");
    } else {
      showSnackbar(result.error, "error");
    }
  };

  if (loading && favouritesList.length === 0) {
    return <LoadingState />;
  }

  return (
    <Box sx={{ p: 0, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <SnackbarComponent
        snackbar={snackbar}
        onClose={closeSnackbar}
      />

      <DashboardHeader user={user} onLogout={onLogout} />

      <PropertiesSection
        properties={sampleProperties}
        isFavourite={isFavourite}
        onAddFavourite={handleAddFavourite}
        onRemoveFavourite={handleRemoveFavourite}
      />

      <FavouritesSection
        favourites={favouritesList}
        onRemoveFavourite={handleRemoveFavourite}
      />
    </Box>
  );
}

export default Dashboard;