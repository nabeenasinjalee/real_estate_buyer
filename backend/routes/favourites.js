const express = require('express');
const { db } = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's favourites
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all(
    'SELECT * FROM favourites WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, favourites) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching favourites' });
      }
      res.json(favourites);
    }
  );
});

// Add to favourites
router.post('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { property_id, property_title, property_price, property_location, property_image } = req.body;
  // Log received data for debugging
  console.log("Received favourite data:", { 
    userId, 
    property_id, 
    property_title, 
    property_price, 
    property_location, 
    property_image 
  });

  // Validation with more specific error messages
  const missingFields = [];
  if (!property_id) missingFields.push('property_id');
  if (!property_title) missingFields.push('property_title');
  if (!property_price) missingFields.push('property_price');
  if (!property_location) missingFields.push('property_location');  
  if (!property_image) missingFields.push('property_image');


  // Validation
  if (!property_id || !property_title || !property_price || !property_location || !property_image) {
    return res.status(400).json({ message: 'All property fields are required' });
  }
  
  // Check if already exists
  db.get(
    'SELECT * FROM favourites WHERE user_id = ? AND property_id = ?',
    [userId, property_id],
    (err, existing) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (existing) {
        return res.status(400).json({ message: 'Property already in favourites' });
      }
      
      // Add to favourites
      db.run(
        `INSERT INTO favourites (user_id, property_id, property_title, property_price, property_location, property_image)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, property_id, property_title, property_price, property_location, property_image],
        function(err) {
          if (err) {
            return res.status(500).json({ message: 'Error adding to favourites' });
          }

          res.status(201).json({
            message: 'Added to favourites',
            favourite: {
              id: this.lastID,
              user_id: userId,
              property_id,
              property_title,
              property_price,
              property_location,
              property_image
            }
          });
        }
      );
    }
  );
});

// Remove from favourites
router.delete('/:propertyId', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const propertyId = req.params.propertyId;

  db.run(
    'DELETE FROM favourites WHERE user_id = ? AND property_id = ?',
    [userId, propertyId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error removing from favourites' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Favourite not found' });
      }

      res.json({ message: 'Removed from favourites' });
    }
  );
});

module.exports = router;