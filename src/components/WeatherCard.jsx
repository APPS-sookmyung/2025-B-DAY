import React from 'react';

export default function WeatherCard({ weather, stadium }) {
  if (!weather) return null;
  return (
    <div className="bg-gray-50 px-4 py-2.5 rounded-[22px] flex items-center gap-2 shadow-sm border border-gray-50">
      {weather.status.icon}
      <div className="flex flex-col items-start leading-none">
        <span className="text-[9px] font-black text-gray-400 mb-1">{stadium}</span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-black text-black">{weather.temp}°</span>
          <span className="text-[10px] font-bold text-gray-500">{weather.status.text}</span>
        </div>
      </div>
    </div>
  );
}