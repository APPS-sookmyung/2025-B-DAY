import React from 'react';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';

export default function CalendarView({ currentMonth, setCurrentMonth, diaries, onDateClick, selectedDate }) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + offset)));
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-14"></div>);
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}.${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
    const dayDiaries = diaries.filter(d => d.date === dateStr);
    const isSelected = selectedDate === dateStr;

    days.push(
      <div 
        key={day} 
        onClick={() => onDateClick(dateStr)} 
        className={`h-14 flex flex-col items-center justify-center relative cursor-pointer rounded-2xl transition-all ${isSelected ? 'bg-gray-100' : ''}`}
      >
        <span className={`text-sm font-bold ${dayDiaries.length > 0 ? 'text-black' : 'text-gray-300'}`}>{day}</span>
        <div className="flex gap-0.5 mt-1">
          {dayDiaries.map((d, idx) => <div key={idx} className={`w-1.5 h-1.5 rounded-full ${d.result === '승리' ? 'bg-[#5B96F6]' : 'bg-[#FF5C5C]'}`} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-black">{year}년 {month + 1}월</h2>
        <div className="flex gap-1">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeftIcon size={20} /></button>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRightIcon size={20} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d} className="text-center text-[10px] font-black text-gray-400">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-2">{days}</div>
    </div>
  );
}