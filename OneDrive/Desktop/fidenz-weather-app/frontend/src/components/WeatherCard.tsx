import { Cloud, CloudRain, CloudSnow, CloudDrizzle, Navigation, X } from 'lucide-react';
import type { WeatherData } from '../App';

interface WeatherCardProps {
  weather: WeatherData;
  onClick: () => void;
}

const colorClasses = {
  blue: 'from-[#5dade2] to-[#3498db]',
  purple: 'from-[#9b7fd6] to-[#7c5dcf]',
  green: 'from-[#58d4a3] to-[#3db88a]',
  orange: 'from-[#f5a962] to-[#e89347]',
  red: 'from-[#c66b6b] to-[#b55555]'
};

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case 'few-clouds':
      return <Cloud className="w-8 h-8" />;
    case 'broken-clouds':
      return <Cloud className="w-8 h-8" />;
    case 'clear-sky':
      return <CloudSnow className="w-8 h-8" />;
    case 'light-rain':
      return <CloudDrizzle className="w-8 h-8" />;
    case 'mist':
      return <CloudRain className="w-8 h-8" />;
    default:
      return <Cloud className="w-8 h-8" />;
  }
};

export function WeatherCard({ weather, onClick }: WeatherCardProps) {
  return (
    <div className="relative">
      {/* Card Container */}
      <div 
        className="bg-gradient-to-br rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 relative"
        style={{
          background: `linear-gradient(135deg, ${
            weather.color === 'blue' ? '#5dade2, #3498db' :
            weather.color === 'purple' ? '#9b7fd6, #7c5dcf' :
            weather.color === 'green' ? '#58d4a3, #3db88a' :
            weather.color === 'orange' ? '#f5a962, #e89347' :
            '#c66b6b, #b55555'
          })`
        }}
        onClick={onClick}
      >
        {/* Transparent cloud shadows overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[-5%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-[30%] left-[-10%] w-40 h-40 bg-white/8 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-36 h-36 bg-black/15 rounded-full blur-2xl" />
          <div className="absolute bottom-[5%] left-[5%] w-28 h-28 bg-black/10 rounded-full blur-xl" />
        </div>

        {/* Top Section with City and Temperature */}
        <div className="relative p-6 pb-4 z-10">
          <button className="absolute top-4 right-4 text-white hover:bg-white/20 rounded p-1">
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-white mb-1">{weather.city}, {weather.country}</h2>
          <p className="text-white/80 text-xs mb-4">{weather.date}</p>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-white/90">
                {getWeatherIcon(weather.icon)}
              </div>
              <span className="text-white text-sm">{weather.condition}</span>
            </div>
            
            <div className="text-right">
              <div className="text-white text-5xl">{weather.temperature}°c</div>
              <div className="text-white/80 text-xs mt-1">
                Temp Min: {weather.tempMin}°c
              </div>
              <div className="text-white/80 text-xs">
                Temp Max: {weather.tempMax}°c
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Details */}
        <div className="bg-[#2a3544] px-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white text-xs mb-1">
                <span className="text-white/60">Pressure:</span> {weather.pressure}Pa
              </p>
              <p className="text-white text-xs mb-1">
                <span className="text-white/60">Humidity:</span> {weather.humidity}%
              </p>
              <p className="text-white text-xs">
                <span className="text-white/60">Visibility:</span> {weather.visibility}km
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-5 h-5 text-white mb-1 mx-auto" style={{ transform: `rotate(${weather.windDegree}deg)` }} />
                <p className="text-white text-xs">{weather.windSpeed}m/s {weather.windDegree} Degree</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white text-xs mb-1">
                <span className="text-white/60">Sunrise:</span> {weather.sunrise}
              </p>
              <p className="text-white text-xs">
                <span className="text-white/60">Sunset:</span> {weather.sunset}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}