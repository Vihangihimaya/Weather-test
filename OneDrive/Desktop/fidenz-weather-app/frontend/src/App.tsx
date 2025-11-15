import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { WeatherCard } from './components/WeatherCard';
import { WeatherDetail } from './components/WeatherDetail';
import { CloudSun, Plus } from 'lucide-react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

export interface WeatherData {
  id: string;
  city: string;
  country: string;
  date: string;
  temperature: number;
  condition: string;
  icon: 'few-clouds' | 'broken-clouds' | 'clear-sky' | 'light-rain' | 'mist';
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  visibility: number;
  windSpeed: number;
  windDegree: number;
  sunrise: string;
  sunset: string;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

// Function to convert OpenWeatherMap data to your format
const convertWeatherData = (apiData: any[]): WeatherData[] => {
  const colors: ('blue' | 'purple' | 'green' | 'orange' | 'red')[] = ['blue', 'purple', 'green', 'orange', 'red'];
  
  return apiData.map((city, index) => {
    // Convert condition to your icon format
    const getIconType = (description: string): 'few-clouds' | 'broken-clouds' | 'clear-sky' | 'light-rain' | 'mist' => {
      if (description.includes('clear')) return 'clear-sky';
      if (description.includes('rain')) return 'light-rain';
      if (description.includes('cloud')) return 'broken-clouds';
      if (description.includes('mist') || description.includes('fog')) return 'mist';
      return 'few-clouds';
    };

    return {
      id: city.id.toString(),
      city: city.name,
      country: 'Unknown', // You might want to get this from your cities.json
      date: new Date().toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, month: 'short', day: 'numeric' }),
      temperature: Math.round(city.temp as number),
      condition: city.description.charAt(0).toUpperCase() + city.description.slice(1),
      icon: getIconType(city.description),
      tempMin: Math.round((city.temp as number) - 2), // Mock min temp
      tempMax: Math.round((city.temp as number) + 2), // Mock max temp
      pressure: 1013, // Mock data
      humidity: city.humidity as number,
      visibility: 8.0, // Mock data
      windSpeed: city.windSpeed as number,
      windDegree: 120, // Mock data
      sunrise: '6:05am', // Mock data
      sunset: '6:05pm', // Mock data
      color: colors[index % colors.length]
    };
  });
};

export default function App() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<WeatherData | null>(null);
  const [newCity, setNewCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch real weather data from backend
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      console.log('🌤️ Fetching fresh weather data from backend...');
      
      const response = await fetch('http://localhost:5000/api/weather');
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const apiData = await response.json();
      console.log('✅ Real data received from backend:', apiData);
      
      const convertedData = convertWeatherData(apiData);
      setWeatherData(convertedData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('❌ Error fetching weather data:', error);
      // Fallback to mock data if backend fails
      console.log('🔄 Using mock data as fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWeatherData();
    }
  }, [isAuthenticated]);

  const handleAddCity = () => {
    if (newCity.trim()) {
      alert(`Adding city: ${newCity}`);
      setNewCity('');
    }
  };

  const handleCityClick = (weather: WeatherData) => {
    setSelectedCity(weather);
  };

  const handleBack = () => {
    setSelectedCity(null);
  };

  const handleRefresh = () => {
    fetchWeatherData();
  };

  // Show loading during Auth0 initialization
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2d4a7c] via-[#3d6491] to-[#5a8fb8]">
        <div className="text-white text-xl">Loading authentication...</div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2d4a7c] via-[#3d6491] to-[#5a8fb8]">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CloudSun className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-2">Weather App</h1>
            <p className="text-white/80 mb-6">Please log in to view weather data</p>
            <button 
              onClick={() => loginWithRedirect()} 
              className="w-full bg-[#7c5dcf] hover:bg-[#6b4db8] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show weather detail if city is selected
  if (selectedCity) {
    return <WeatherDetail weather={selectedCity} onBack={handleBack} />;
  }

  // Show main weather dashboard
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-b from-[#2d4a7c] via-[#3d6491] to-[#5a8fb8]">
      {/* Dark cloud shadows from bottom to mid */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#1a1a2e] via-[#2d3a4d]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#0f1419]/70 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-5%] left-[20%] w-[50%] h-[45%] bg-[#1a1a2e]/60 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-8%] right-[-5%] w-[45%] h-[55%] bg-[#0f1419]/80 rounded-full blur-[130px]" />
      <div className="absolute bottom-[5%] right-[30%] w-[35%] h-[40%] bg-[#1a1a2e]/50 rounded-full blur-[90px]" />
      
      {/* Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with User Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <CloudSun className="w-8 h-8 text-white mr-3" />
            <div>
              <h1 className="text-white text-2xl">Weather App</h1>
              {lastUpdated && (
                <p className="text-white/60 text-sm">
                  Last updated: {lastUpdated.toLocaleTimeString()} 
                  <span className="ml-2 text-green-400">✅ 5-min cache</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm">Welcome, {user?.name || user?.email}</span>
            <button 
              onClick={() => logout({ returnTo: window.location.origin })} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={handleRefresh}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>🔄</span>
            Refresh Weather Data
          </button>
        </div>

        {/* Add City Input */}
        <div className="flex gap-2 max-w-md mx-auto mb-12">
          <Input
            type="text"
            placeholder="Enter a city"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCity()}
            className="bg-[#1e2936] border-none text-white placeholder:text-gray-400 h-11"
          />
          <Button 
            onClick={handleAddCity}
            className="bg-[#7c5dcf] hover:bg-[#6b4db8] text-white h-11 px-6"
          >
            Add City
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-white text-lg">Loading real weather data from API...</div>
          </div>
        )}

        {/* Weather Cards Grid */}
        {!loading && weatherData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {weatherData.map((weather) => (
              <WeatherCard
                key={weather.id}
                weather={weather}
                onClick={() => handleCityClick(weather)}
              />
            ))}
          </div>
        )}

        {/* No Data State */}
        {!loading && weatherData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/80 text-lg">No weather data available</div>
            <button 
              onClick={fetchWeatherData}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Load Weather Data
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-[#2a2a2a] py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">2021 Fidenz Technologies</p>
        </div>
      </footer>
    </div>
  );
}