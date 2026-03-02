import React from 'react';
import baseballIcon from '../assets/baseball_icon.png';

export default function FolderView({ opponents, diaries, onFolderClick }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 animate-in fade-in">
      {opponents.map((teamName) => {
        const teamDiaries = diaries.filter(d => d.opponent === teamName);
        const count = teamDiaries.length;
        return (
          <div key={teamName} className="flex flex-col items-center cursor-pointer group" onClick={() => onFolderClick(teamName)}>
            <div className="w-full aspect-square bg-[#F8F8F8] rounded-[45px] flex items-center justify-center relative shadow-sm active:scale-95 transition-transform">
              <div className="absolute top-4 right-4 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-black z-10">{count}</div>
              <div className="relative w-20 h-20">
                {count > 0 ? (
                  Array.from({ length: Math.min(count, 4) }).map((_, i) => (
                    <img key={i} src={baseballIcon} alt="ball" className="absolute w-14 h-14" style={{ top: `${i * 3}px`, left: `${i * 5}px`, zIndex: 5 - i, transform: `rotate(${i * 15}deg)`, opacity: 1 - (i * 0.1) }} />
                  ))
                ) : (
                  <div className="w-full h-full rounded-full border-2 border-dashed border-gray-100 opacity-30" />
                )}
              </div>
            </div>
            <span className="text-[13px] mt-4 font-black text-gray-800 tracking-tight">{teamName}</span>
          </div>
        );
      })}
    </div>
  );
}