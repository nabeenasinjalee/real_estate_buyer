Overview This Real Estate Property Hub is a web application that helps people (buyers) find, view, and save their favorite properties. Think of it like a digital notebook where you can browse available houses and apartments, then save your favorites to review later.

What Users Can Do:

Create an Account: Sign up with email and password 
Login: Access their account with credentials 
Browse Properties: View available properties with details like price, location, and images 
Save Favorites: Add properties to a personal favorites list 
Remove from Favorites: Delete properties they no longer like 
View All Favorites: See all saved properties in one place

Data Flow - Complete Request/Response Cycle 
Adding to Favorites - Complete Data Flow: 
═══════════════════════════════════════════════════════════════════════
FRONTEND (Browser) → BACKEND (Server) → DATABASE → BACKEND → FRONTEND
═══════════════════════════════════════════════════════════════════════
1. USER INTERACTION
   User clicks heart icon
           ↓
2. STATE UPDATE
   Frontend detects click
   Prepares property data:
   {
     property_id: 1,
     property_title: "Modern Downtown Apartment",
     property_price: "$450,000",
     property_location: "Downtown, City Center",
     property_image: [base64 image data]
   }
           ↓
3. ADD HEADER WITH TOKEN
   Frontend retrieves token from local storage
   Creates request with:
   {
     Authorization: "Bearer eyJhbGciOiJIUzI1NiIs..."
     Content-Type: "application/json"
   }
           ↓
4. SEND REQUEST
   Frontend sends POST request to:
   http://localhost:5000/api/favourites
   
   With body (the data)
           ↓
5. NETWORK TRANSMISSION
   Request travels over internet to backend server
   (Usually takes milliseconds)
           ↓
6. BACKEND RECEIVES
   Backend extracts request components:
   - Headers (includes token)
   - Body (property data)
   - User info (from token)
           ↓
7. BACKEND VALIDATION
   Backend performs 4 checks:
   
   ✓ Check 1: Is token valid?
     Uses JWT library to verify
     
   ✓ Check 2: Has token expired?
     Checks expiration time
     
   ✓ Check 3: Extract user ID from token
     Gets who made this request
     
   ✓ Check 4: Is property already favorited?
     Queries database:
     SELECT * FROM favourites 
     WHERE user_id = 1 AND property_id = 1
     
     If found: Return error "Already in favorites"
     If not found: Continue
           ↓
8. DATABASE INSERTION
   Backend executes SQL:
   INSERT INTO favourites (
     user_id, 
     property_id, 
     property_title, 
     property_price, 
     property_location, 
     property_image
   ) VALUES (
     1,
     1,
     "Modern Downtown Apartment",
     "$450,000",
     "Downtown, City Center",
     [image data]
   )
           ↓
9. DATABASE RESPONSE
   Database returns:
   - Success with last inserted ID: 42
   - Or error if constraints violated
           ↓
10. BACKEND RESPONSE
    Backend sends response back:
    HTTP Status: 201 (Created)
    Body:
    {
      message: "Added to favourites",
      favourite: {
        id: 42,
        user_id: 1,
        property_id: 1,
        property_title: "Modern Downtown Apartment",
        ...
      }
    }
           ↓
11. NETWORK TRANSMISSION BACK
    Response travels back to frontend
           ↓
12. FRONTEND RECEIVES RESPONSE
    Checks HTTP status:
    - 201 or 200 → Success
    - 400-500 → Error
           ↓
13. STATE UPDATE (on success)
    Frontend:
    • Adds property to favoritesList in memory
    • Updates React state
    • Component re-renders
           ↓
14. UI UPDATES
    What user sees change:
    • Heart icon changes to filled red
    • Property appears in Favorites section
    • Success message appears
    • Maybe scroll to Favorites section
           ↓
15. USER FEEDBACK
    Success message displayed:
    "Modern Downtown Apartment added to favourites!"
    (Message disappears in 5 seconds)
           ↓
    APPLICATION RETURNS TO NORMAL STATE


Technology Stack

Frontend
- React 18 
- UI Library Material-UI (MUI)
- Component Library Axios
- HTTP Client React Router DOM
- Navigation Custom Hooks
- State Management

Backend

Node.js - Runtime Environment Express.js - Web Framework SQLite3 - Database bcryptjs - Password Hashing jsonwebtoken - Authentication cors - Cross-Origin Resource Sharing
