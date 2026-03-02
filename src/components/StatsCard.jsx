import React from 'react';

export default function StatsCard({ total, wins, losses, winRate }) {
  return (
    <section className="mb-8 bg-gray-50 rounded-[35px] p-6 flex items-center justify-around shadow-sm animate-in fade-in">
      <div className="text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Total</p>
        <p className="text-xl font-black">{total}경기</p>
      </div>
      <div className="w-[1px] h-8 bg-gray-200" />
      <div className="text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Win-Loss</p>
        <p className="text-xl font-black"><span className="text-blue-500">{wins}승</span> <span className="text-red-500">{losses}패</span></p>
      </div>
      <div className="w-[1px] h-8 bg-gray-200" />
      <div className="text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Win Rate</p>
        <p className="text-2xl font-black">{winRate}%</p>
      </div>
    </section>
  );
}