import React, { useState, useEffect } from 'react';
import { Home, User, Plus, Sun, Cloud, CloudRain, ArrowLeft } from 'lucide-react';

// 새로 만든 컴포넌트 임포트
import DiaryCard from './DiaryCard';
import WeatherCard from './WeatherCard';
import StatsCard from './StatsCard';
import EmptyState from './EmptyState';
import CalendarView from './CalendarView';
import FolderView from './FolderView';

const opponents = [
  '기아 타이거즈', '삼성 라이온즈', 'LG 트윈스', '두산 베어스', 
  'KT 위즈', 'SSG 랜더스', '롯데 자이언츠', '한화 이글스', 'NC 다이노스', '키움 히어로즈'
];

const weatherConfig = {
  Clear: { text: '맑음', icon: <Sun size={18} className="text-orange-400" /> },
  Clouds: { text: '흐림', icon: <Cloud size={18} className="text-gray-400" /> },
  Rain: { text: '비', icon: <CloudRain size={18} className="text-blue-400" /> },
  Drizzle: { text: '비', icon: <CloudRain size={18} className="text-blue-400" /> },
  Thunderstorm: { text: '비', icon: <CloudRain size={18} className="text-blue-400" /> },
};

export default function MainPage({ myTeam, onCreateClick, onEdit }) {
  const [viewType, setViewType] = useState('list');
  const [diaries, setDiaries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_WEATHER_KEY;
    const { lat, lon } = myTeam; 
    if (lat && lon && API_KEY) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(res => res.json()).then(data => {
          const status = data.weather[0].main;
          setWeather({ temp: Math.round(data.main.temp), status: weatherConfig[status] || weatherConfig['Clouds'] });
        }).catch(err => console.error(err));
    }
  }, [myTeam]);

  useEffect(() => {
    setDiaries(JSON.parse(localStorage.getItem('diaries') || '[]'));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제할까요?')) {
      const filtered = diaries.filter(d => d.id !== id);
      localStorage.setItem('diaries', JSON.stringify(filtered));
      setDiaries(filtered);
    }
  };

  const wins = diaries.filter(d => d.result === '승리').length;
  const losses = diaries.filter(d => d.result === '패배').length;
  const winRate = diaries.length > 0 ? Math.round((wins / diaries.length) * 100) : 0;

  return (
    <div className="pb-32 pt-12 px-6 bg-white min-h-screen flex flex-col">
      <header className="mb-8 shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black mb-5 tracking-tight">일기 모아보기</h1>
          <div className="flex gap-2">
            {['목록형', '캘린더형', '폴더형'].map((label, idx) => {
              const types = ['list', 'calendar', 'folder'];
              return (
                <button 
                  key={label} 
                  onClick={() => { setViewType(types[idx]); setSelectedOpponent(null); setSelectedCalendarDate(null); }} 
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${viewType === types[idx] ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <WeatherCard weather={weather} stadium={myTeam.stadium} />
      </header>

      {!selectedOpponent && viewType !== 'calendar' && diaries.length > 0 && (
        <StatsCard total={diaries.length} wins={wins} losses={losses} winRate={winRate} />
      )}

      {selectedOpponent && (
        <div className="mb-6 flex items-center gap-3 animate-in slide-in-from-left duration-300">
          <button onClick={() => setSelectedOpponent(null)} className="p-2 bg-gray-100 rounded-full active:scale-90 transition-transform"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-black">{selectedOpponent}와의 기록</h2>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {diaries.length > 0 ? (
          <>
            {viewType === 'calendar' && (
              <CalendarView 
                currentMonth={currentMonth} 
                setCurrentMonth={setCurrentMonth} 
                diaries={diaries} 
                onDateClick={setSelectedCalendarDate}
                selectedDate={selectedCalendarDate}
              />
            )}
            
            {(viewType === 'list' || selectedOpponent) && (
              <div className="relative border-l-2 border-black ml-2 pl-8 space-y-4 py-4">
                {(selectedOpponent ? diaries.filter(d => d.opponent === selectedOpponent) : diaries).map((diary) => (
                  <DiaryCard key={diary.id} diary={diary} myTeam={myTeam} onEdit={onEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}

            {viewType === 'folder' && !selectedOpponent && (
              <FolderView opponents={opponents} diaries={diaries} onFolderClick={setSelectedOpponent} />
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* 캘린더 날짜 팝업 모달 */}
      {selectedCalendarDate && viewType === 'calendar' && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-24 bg-black/30 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedCalendarDate(null)}>
          <div className="w-full max-w-[400px] bg-white rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black">{selectedCalendarDate.split('.')[2]}일의 기록</h3>
              <button onClick={() => setSelectedCalendarDate(null)} className="text-gray-400 font-bold">닫기</button>
            </div>
            <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-4">
              {diaries.filter(d => d.date === selectedCalendarDate).length > 0 ? (
                diaries.filter(d => d.date === selectedCalendarDate).map(diary => (
                  <DiaryCard key={diary.id} diary={diary} myTeam={myTeam} onEdit={onEdit} onDelete={handleDelete} />
                ))
              ) : <p className="text-center py-10 text-gray-300 font-bold">작성된 일기가 없습니다.</p>}
            </div>
          </div>
        </div>
      )}

      <button onClick={() => onCreateClick(viewType === 'calendar' ? selectedCalendarDate : null)} className="fixed bottom-24 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all z-50">
        <Plus color="white" size={32} strokeWidth={3} />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/95 backdrop-blur-sm h-24 flex justify-around items-center border-t border-gray-50 px-20 z-40">
        <div className="flex flex-col items-center gap-1.5 text-black"><Home size={22} /><span className="text-[10px] font-bold">홈</span></div>
        <div className="flex flex-col items-center gap-1.5 text-gray-300"><User size={22} /><span className="text-[10px] font-bold">프로필</span></div>
      </nav>
    </div>
  );
}