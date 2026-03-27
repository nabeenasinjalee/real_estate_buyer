import { useState, useCallback } from "react";
import { favourites } from "../../services/api";

export const useFavourites = () => {
    const [favouritesList, setFavouritesList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavourites = useCallback(async () => {
        try {
            setLoading(true);
            const response = await favourites.getAll();
            setFavouritesList(response.data || []);
            return { success: true, data: response.data || [] };
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to fetch favourites";
            // Don't treat empty favourites as error
            if (err.response?.status === 404) {
                setFavouritesList([]);
                return { success: true, data: [] };
            }
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    const addFavourite = useCallback(async (property) => {
        if (!property?.id || !property?.title) {
            return {
                success: false,
                error: "Invalid property information"
            };
        }

        try {
            const favouriteData = {
                property_id: property.id,
                property_title: property.title,
                property_price: property.price,
                property_location: property.location,
                property_image: property.image || "",
            };

            await favourites.add(favouriteData);

            setFavouritesList(prev => [...prev, {
                property_id: property.id,
                property_title: property.title,
                property_price: property.price,
                property_location: property.location,
                property_image: property.image,
            }]);

            return { success: true, message: "Property added to favourites!" };
        } catch (err) {
            console.error("Add favourite error:", err);
            const errorMessage = err.response?.data?.message || "Failed to add to favourites";
            return { success: false, error: errorMessage };
        }
    }, []);

    const removeFavourite = useCallback(async (propertyId) => {
        try {
            await favourites.remove(propertyId);

            setFavouritesList(prev => prev.filter(fav => fav.property_id !== propertyId));

            return { success: true, message: "Property removed from favourites!" };
        } catch (err) {
            console.error("Remove favourite error:", err);
            const errorMessage = err.response?.data?.message || "Failed to remove from favourites";
            return { success: false, error: errorMessage };
        }
    }, []);

    const isFavourite = useCallback((propertyId) => {
        return favouritesList.some((fav) => fav.property_id === propertyId);
    }, [favouritesList]);

    return {
        favouritesList,
        loading,
        fetchFavourites,
        addFavourite,
        removeFavourite,
        isFavourite,
    };
};