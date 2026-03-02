// LandingPage.jsx
import React, { useState, useRef, useEffect } from 'react';

import doosan from '../assets/logos/doosan.webp';
import hanwha from '../assets/logos/hanwha.png';
import kia from '../assets/logos/kia.jpg';
import kiwoom from '../assets/logos/kiwoom.png';
import kt from '../assets/logos/kt.jpeg';
import lg from '../assets/logos/lg.jpeg';
import lotte from '../assets/logos/lotte.png';
import nc from '../assets/logos/nc.png';
import samsung from '../assets/logos/samsung.png';
import ssg from '../assets/logos/ssg.png';

const teams = [
  { id: 'lotte', name: '롯데 자이언츠', eng: 'Lotte Giants', logo: lotte, stadium: '사직야구장', lat: 35.1940, lon: 129.0614 },
  { id: 'lg', name: 'LG 트윈스', eng: 'LG Twins', logo: lg, stadium: '잠실야구장', lat: 37.5122, lon: 127.0719 },
  { id: 'kia', name: '기아 타이거즈', eng: 'KIA Tigers', logo: kia, stadium: '광주-기아 챔피언스 필드', lat: 35.1682, lon: 126.8891 },
  { id: 'samsung', name: '삼성 라이온즈', eng: 'Samsung Lions', logo: samsung, stadium: '대구 삼성 라이온즈 파크', lat: 35.8411, lon: 128.6816 },
  { id: 'hanwha', name: '한화 이글스', eng: 'Hanwha Eagles', logo: hanwha, stadium: '한화생명 이글스 파크', lat: 36.3172, lon: 127.4291 },
  { id: 'doosan', name: '두산 베어스', eng: 'Doosan Bears', logo: doosan, stadium: '잠실야구장', lat: 37.5122, lon: 127.0719 },
  { id: 'kiwoom', name: '키움 히어로즈', eng: 'Kiwoom Heroes', logo: kiwoom, stadium: '고척스카이돔', lat: 37.4982, lon: 126.8671 },
  { id: 'ssg', name: 'SSG 랜더스', eng: 'SSG Landers', logo: ssg, stadium: '인천 SSG 랜더스 필드', lat: 37.4370, lon: 126.6933 },
  { id: 'nc', name: 'NC 다이노스', eng: 'NC Dinos', logo: nc, stadium: '창원 NC 파크', lat: 35.2227, lon: 128.5802 },
  { id: 'kt', name: 'KT 위즈', eng: 'KT Wiz', logo: kt, stadium: '수원 KT 위즈 파크', lat: 37.2997, lon: 127.0097 },
];

export default function LandingPage({ onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.7 }
    );
    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleWheel = (e) => {
    if (scrollRef.current) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="flex flex-col h-full py-10">
      <div className="text-center mb-8 px-6">
        <h1 className="text-[28px] font-black tracking-tight text-black">응원팀 선택하기</h1>
        <p className="text-gray-400 text-sm font-medium mt-1">스크롤 해 나의 팀을 고르세요!</p>
      </div>

      <div 
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex-1 flex items-center overflow-x-auto gap-4 px-[75px] no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {teams.map((team, idx) => (
          <div key={team.id} ref={(el) => (cardsRef.current[idx] = el)} data-index={idx} className="snap-center shrink-0">
            <div className={`w-[280px] h-[420px] rounded-[45px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-8 border-2 transition-all duration-500 ${activeIndex === idx ? 'border-gray-100 bg-white scale-105' : 'border-transparent bg-gray-50 scale-90 opacity-20'}`}>
              <img src={team.logo} alt={team.name} className={`w-44 h-44 object-contain mb-10 transition-transform duration-500 ${activeIndex === idx ? 'scale-110' : 'scale-100'}`} />
              <h2 className="text-2xl font-black text-black">{team.name}</h2>
              <p className="text-[11px] text-gray-400 mt-2 font-bold tracking-widest uppercase">{team.eng}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-10 py-6">
        <button onClick={() => onSelect(teams[activeIndex])} className="w-full bg-black text-white py-5 rounded-[22px] font-black text-lg shadow-xl active:scale-95 transition-all">
          시작하기
        </button>
      </div>
    </div>
  );
}