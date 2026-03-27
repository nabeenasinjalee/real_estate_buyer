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
   Frontend detects a click
   Prepares property data:
           ↓
3. ADD HEADER WITH TOKEN
   Frontend retrieves token from local storage
           ↓
4. SEND REQUEST
   Frontend sends a POST request
   
   With body (the data)
           ↓
5. NETWORK TRANSMISSION
   Request travels over the internet to the backend server
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
   
   ✓ Check 1: Is the token valid?
     Uses the JWT library to verify
     
   ✓ Check 2: Has the token expired?
     Checks expiration time
     
   ✓ Check 3: Extract user ID from token
     Gets who made this request
     
   ✓ Check 4: Is the property already favourited?
     Queries the database
     
     If found: Return error "Already in favorites"
     If not found: Continue
           ↓
8. DATABASE INSERTION (intern user id with property selected)
           ↓
9. DATABASE RESPONSE
   Database returns:
   - Success with last inserted ID: 42
   - Or error if constraints are violated
           ↓
10. BACKEND RESPONSE
    Backend sends response back:
    HTTP Status: 201 (Created)
    ensureing property added
           ↓
12. NETWORK TRANSMISSION BACK
    Response travels back to the frontend
           ↓
13. FRONTEND RECEIVES RESPONSE
    Checks HTTP status:
    - 201 or 200 → Success
    - 400-500 → Error
           ↓
14. STATE UPDATE (on success)
    Frontend:
    • Adds property to favoritesList in memory
    • Updates React state
    • Component re-renders
           ↓
15. UI UPDATES
    What user sees change:
    • Heart icon changes to filled red
    • Property appears in the Favourites section
    • Success message appears
    • Maybe scroll to the Favourites section
           ↓
16. USER FEEDBACK
    Success message displayed
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
