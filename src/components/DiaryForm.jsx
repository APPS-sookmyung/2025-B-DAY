import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const opponents = [
  '기아 타이거즈', '삼성 라이온즈', 'LG 트윈스', '두산 베어스', 
  'KT 위즈', 'SSG 랜더스', '롯데 자이언츠', '한화 이글스', 'NC 다이노스', '키움 히어로즈'
];

export default function DiaryForm({ onBack, initialData, predefinedDate }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [opponent, setOpponent] = useState(initialData?.opponent || opponents[0]);
  const [result, setResult] = useState(initialData?.result || '승리'); 
  const [content, setContent] = useState(initialData?.content || '');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return alert('제목과 내용을 입력해주세요!');

    const savedDiaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    
    if (initialData) {
      const updated = savedDiaries.map(d => d.id === initialData.id ? { ...d, title, opponent, result, content } : d);
      localStorage.setItem('diaries', JSON.stringify(updated));
    } else {
      // 캘린더에서 선택된 날짜가 있으면 그 날짜로, 없으면 오늘 날짜로 저장
      const targetDate = predefinedDate || new Date().toLocaleDateString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit'
      }).replace(/\. /g, '.').replace(/\.$/, '');

      const newDiary = { id: Date.now(), title, opponent, result, content, date: targetDate };
      localStorage.setItem('diaries', JSON.stringify([newDiary, ...savedDiaries]));
    }
    onBack(); 
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <header className="flex items-center justify-between px-4 py-6 border-b border-gray-50">
        <button onClick={onBack} className="p-2 active:scale-90 transition-transform"><ChevronLeft size={28} /></button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">{initialData ? '일기 수정' : '일기 쓰기'}</h1>
          {!initialData && (
            <span className="text-[10px] font-bold text-blue-500">
              {predefinedDate ? `${predefinedDate} 기록 중` : '오늘의 기록'}
            </span>
          )}
        </div>
        <button onClick={handleSave} className="px-4 py-2 font-black text-black active:opacity-50">완료</button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar">
        <div>
          <label className="block text-[11px] font-black text-gray-300 mb-3 uppercase tracking-wider">오늘의 제목</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="어떤 하루였나요?" className="w-full text-2xl font-black outline-none placeholder:text-gray-100" />
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-300 mb-4 uppercase tracking-wider">상대팀</label>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {opponents.map((team) => (
              <button key={team} onClick={() => setOpponent(team)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${opponent === team ? 'bg-black text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>{team}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-300 mb-4 uppercase tracking-wider">경기 결과</label>
          <div className="flex gap-2">
            {['승리', '패배'].map((res) => (
              <button key={res} onClick={() => setResult(res)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${result === res ? 'bg-black text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>{res}</button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-[11px] font-black text-gray-300 mb-3 uppercase tracking-wider">내용</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="오늘 경기는 어땠나요?" className="w-full h-64 resize-none outline-none text-gray-700 leading-relaxed placeholder:text-gray-100" />
        </div>
      </div>
    </div>
  );
}