# Fidenz Weather App Assignment

A secure weather application with authentication that retrieves and displays weather information for multiple cities.

## 🌟 Features Implemented

### Part 1: Weather Application
-  **City Data**: Reads city codes from `cities.json` file
-  **Real Weather Data**: Fetches live data from OpenWeatherMap API
-  **Weather Display**: Shows city name, weather condition, temperature, humidity, and wind speed
-  **5-Minute Caching**: Implements efficient caching to reduce API calls
-  **Responsive Design**: Works perfectly on both desktop and mobile devices
-  **Beautiful UI**: Professional weather dashboard with gradients and animations

### Part 2: Authentication & Authorization
-  **Auth0 Integration**: Secure login system using Auth0
-  **Protected Routes**: Weather data only accessible after login
-  **Login/Logout**: Complete authentication flow
-  **No Public Signups**: Only pre-registered users can access
-  **Test User**: Pre-configured test account for evaluation



## 🚀 How to Run This Project

### Prerequisites
- Node.js (version 18 or higher)
- OpenWeatherMap API key
- Auth0 account

### Step 1: Clone and Setup
bash
 Clone the repository
git clone [your-github-repo-link]
cd fidenz-weather-app


Step 2: Backend Setup
Navigate to backend folder:

bash
cd backend
Install dependencies:

bash
npm install
Create environment file:

bash
# Create .env file with this content:
OPENWEATHER_API_KEY=c018be02dc6e8e7115d26c8efcc97053
PORT=5000


Start backend server:

bash
npm run dev
Expected Output:
text
🚀 Backend server running on port 5000
📊 Loaded cities from cities.json (exact assignment format)
🌤️  Weather API: http://localhost:5000/api/weather
🏙️  Original Cities Data: http://localhost:5000/api/cities-original
Step 3: Frontend Setup
Open a NEW terminal window



Navigate to frontend folder:

bash
cd frontend
Install dependencies:

bash
npm install
Start development server:

bash
npm run dev
Expected Output:
text
VITE v6.3.5 ready in XXX ms
➜ Local: http://localhost:3000/
Step 4: Test the Application
Open browser and go to: http://localhost:3000


You will see a login page

Use test credentials:
Email: careers@fidenz.com
Password: Pass#fidenz


After login, you'll see the weather dashboard with 8 cities

🛠️ Troubleshooting
Port Already in Use Error
If you see Error: listen EADDRINUSE: address already in use :::5000:

Solution 1: Kill the process

bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID [PID_NUMBER] /F
Solution 2: Use different port
Change backend .env file:

.env  :
PORT=5001
Update frontend App.tsx to use http://localhost:5001/api/weather

Backend Not Starting
Check if .env file exists in backend folder


Verify OpenWeatherMap API key is correct

Ensure cities.json file is present
Frontend Not Connecting to Backend
Make sure backend is running on port 5000
Check if both servers are running simultaneously
Verify no firewall blocking the connection


📡 API Endpoints
Backend APIs (Port 5000)
GET /api/health - Health check endpoint
GET /api/weather - Weather data for all cities (5-minute cache)
GET /api/cities-original - Original cities data from JSON file

Frontend (Port 3000)
http://localhost:3000 - Main application


🔑 Authentication Details
Auth0 Configuration
Domain: dev-0v1pf66xqyxgj1c8.us.auth0.com

Client ID: BWoy5JRIjhPcMex5NyMvkgUqtUirBjKN

Application Type: Single Page Application (SPA)

Security Features
JWT token validation
Protected API routes
No public user registration
Secure session management



🏗️ Project Structure

<img width="798" height="474" alt="image" src="https://github.com/user-attachments/assets/c5d9d8b6-2427-449d-aa39-ac9fe21a9965" />




🔧 Technical Stack

Backend
Node.js with Express.js

Axios for HTTP requests to OpenWeatherMap API
Node-cache for 5-minute data caching
CORS enabled for frontend communication
.env for environment variables

Frontend
React 18 with TypeScript

Vite for fast development and building
Auth0 React SDK for authentication
Tailwind CSS for responsive styling
Lucide React for icons

📊 Caching Implementation
The backend implements efficient 5-minute caching:

How it works:

First request: Fetches fresh data from OpenWeatherMap API
Subsequent requests (within 5 minutes): Returns cached data
After 5 minutes: Automatically refreshes with new data


Proof of caching working:

Backend logs show Fetched fresh data for... on first load
Subsequent requests show Cache hit for city...
After 5 minutes, shows Fetched fresh data for... again


🎯 Assignment Requirements Checklist
Part 1: Weather Information Web/API Application ✅
✅ Read city codes from cities.json file
✅ Fetch weather data using OpenWeatherMap APIs
✅ Display weather information (name, description, temperature)
✅ Implement data caching with 5-minute expiration
✅ Responsive layout for desktop and mobile


Part 2: Authentication & Authorization ✅
✅ Integrate Auth0 Authentication
✅ Users must log in to access weather data
✅ Login and logout functionality
✅ Disable public user signups
✅ Create test user account (careers@fidenz.com / Pass#fidenz)
✅ Multi-Factor Authentication configured (requires paid plan upgrade)

🎨 UI/UX Features
Beautiful gradient backgrounds
Responsive grid layout
Weather icons and animations
Professional card design with hover effects
Real-time weather data display
User-friendly login interface

🔄 Development Scripts
Backend
bash
npm run dev    # Start development server
npm start     # Start production server
Frontend
bash
npm run dev    # Start development server
npm run build  # Build for production


📞 Support
If you encounter any issues:

Backend not starting: Check port 5000 is available and .env file exists
Frontend not loading: Ensure backend is running first
Login issues: Verify Auth0 credentials in main.tsx
Weather data not showing: Check OpenWeatherMap API key

📝 Notes
The application uses real weather data from OpenWeatherMap API
Caching is implemented to reduce API calls and improve performance
Authentication is handled by Auth0 for enterprise-grade security
The UI is fully responsive and works on all device sizes
