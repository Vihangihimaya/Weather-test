import { Cloud, CloudRain, CloudSnow, CloudDrizzle, Navigation, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import type { WeatherData } from '../App';

interface WeatherDetailProps {
  weather: WeatherData;
  onBack: () => void;
}

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case 'few-clouds':
      return <Cloud className="w-16 h-16" />;
    case 'broken-clouds':
      return <Cloud className="w-16 h-16" />;
    case 'clear-sky':
      return <CloudSnow className="w-16 h-16" />;
    case 'light-rain':
      return <CloudDrizzle className="w-16 h-16" />;
    case 'mist':
      return <CloudRain className="w-16 h-16" />;
    default:
      return <Cloud className="w-16 h-16" />;
  }
};

export function WeatherDetail({ weather, onBack }: WeatherDetailProps) {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-b from-[#2d4a7c] via-[#3d6491] to-[#5a8fb8]">
      {/* Dark cloud shadows from bottom to mid */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#1a1a2e] via-[#2d3a4d]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#0f1419]/70 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-5%] left-[20%] w-[50%] h-[45%] bg-[#1a1a2e]/60 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-8%] right-[-5%] w-[45%] h-[55%] bg-[#0f1419]/80 rounded-full blur-[130px]" />
      <div className="absolute bottom-[5%] right-[30%] w-[35%] h-[40%] bg-[#1a1a2e]/50 rounded-full blur-[90px]" />
      
      {/* Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-8 h-8 mr-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-white text-2xl">Weather App</h1>
        </div>

        {/* Weather Detail Card */}
        <div className="rounded-lg overflow-hidden shadow-2xl relative mb-16">
          {/* Transparent cloud shadows overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[15%] right-[-5%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-[35%] left-[-10%] w-48 h-48 bg-white/8 rounded-full blur-[80px]" />
            <div className="absolute bottom-[25%] right-[15%] w-44 h-44 bg-black/15 rounded-full blur-3xl" />
            <div className="absolute bottom-[10%] left-[10%] w-36 h-36 bg-black/12 rounded-full blur-2xl" />
          </div>

          {/* Top Section */}
          <div 
            className="relative p-8 md:p-12 z-10"
            style={{
              background: `linear-gradient(135deg, ${
                weather.color === 'blue' ? '#5dade2, #3498db' :
                weather.color === 'purple' ? '#9b7fd6, #7c5dcf' :
                weather.color === 'green' ? '#58d4a3, #3db88a' :
                weather.color === 'orange' ? '#f5a962, #e89347' :
                '#c66b6b, #b55555'
              })`
            }}
          >
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>

            <div className="text-center">
              <h2 className="text-white text-3xl mb-2">{weather.city}, {weather.country}</h2>
              <p className="text-white/90 text-sm mb-8">{weather.date}</p>

              <div className="flex items-center justify-center gap-12 mb-6">
                <div className="text-white/90">
                  {getWeatherIcon(weather.icon)}
                </div>
                
                <div className="h-24 w-px bg-white/30" />
                
                <div className="text-left">
                  <div className="text-white text-6xl mb-2">{weather.temperature}°c</div>
                  <div className="text-white/90 text-sm">
                    Temp Min: {weather.tempMin}°c
                  </div>
                  <div className="text-white/90 text-sm">
                    Temp Max: {weather.tempMax}°c
                  </div>
                </div>
              </div>

              <p className="text-white text-lg">{weather.condition}</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-[#2a3544] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-white/60">Pressure:</span> {weather.pressure}hPa
                </p>
                <p className="text-sm">
                  <span className="text-white/60">Humidity:</span> {weather.humidity}%
                </p>
                <p className="text-sm">
                  <span className="text-white/60">Visibility:</span> {weather.visibility}km
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Navigation 
                    className="w-8 h-8 text-white mb-2 mx-auto" 
                    style={{ transform: `rotate(${weather.windDegree}deg)` }} 
                  />
                  <p className="text-sm">{weather.windSpeed}m/s {weather.windDegree} Degree</p>
                </div>
              </div>
              
              <div className="space-y-2 md:text-right">
                <p className="text-sm">
                  <span className="text-white/60">Sunrise:</span> {weather.sunrise}
                </p>
                <p className="text-sm">
                  <span className="text-white/60">Sunset:</span> {weather.sunset}
                </p>
              </div>
            </div>
          </div>
        </div>
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