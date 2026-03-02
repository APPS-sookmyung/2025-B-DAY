import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DiaryCard({ diary, myTeam, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="absolute -left-[39px] top-8 w-4 h-4 bg-black rounded-full border-4 border-white z-10" />
      <div 
        className="bg-[#F5F5F5] rounded-[40px] px-7 py-5 flex items-center gap-4 cursor-pointer shadow-sm active:scale-[0.98] transition-all" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold text-white ${diary.result === '승리' ? 'bg-[#5B96F6]' : 'bg-[#FF5C5C]'}`}>
          {diary.result}
        </div>
        <div className="flex-1 overflow-hidden">
          <span className="text-[11px] font-bold text-gray-400 mb-0.5 uppercase tracking-tight">{myTeam.name}</span>
          <h3 className="text-[17px] font-black text-black truncate tracking-tight">{diary.title}</h3>
        </div>
        <div className="text-gray-400">{isExpanded ? <ChevronUp size={24} strokeWidth={2.5} /> : <ChevronDown size={24} strokeWidth={2.5} />}</div>
      </div>
      <div className="mt-2 ml-6 text-[12px] font-bold text-gray-300">{diary.date}</div>
      {isExpanded && (
        <div className="mx-4 mt-3 p-7 bg-white border border-gray-100 rounded-[35px] animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap mb-6">{diary.content}</p>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-50">
            <button onClick={(e) => { e.stopPropagation(); onEdit(diary); }} className="px-5 py-2.5 bg-gray-50 text-gray-600 rounded-2xl text-[12px] font-black active:scale-95 transition-all">수정</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(diary.id); }} className="px-5 py-2.5 bg-red-50 text-red-500 rounded-2xl text-[12px] font-black active:scale-95 transition-all">삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}