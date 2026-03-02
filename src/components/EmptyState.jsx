import React from 'react';
import baseballIcon from '../assets/baseball_icon.png';

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in">
      <img src={baseballIcon} alt="Empty" className="w-32 h-32 mb-8 opacity-60" />
      <h2 className="text-xl font-black text-gray-800 mb-2">아직 작성된 일기가 없어요!</h2>
      <p className="text-gray-300 text-sm font-bold">첫 경기 일기를 작성해보세요</p>
    </div>
  );
}