import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import MainPage from './components/MainPage.jsx';
import DiaryForm from './components/DiaryForm.jsx';

function App() {
  const [myTeam, setMyTeam] = useState(null);
  const [currentPage, setCurrentPage] = useState('main'); 
  const [editingDiary, setEditingDiary] = useState(null); // 수정할 일기 데이터
  const [predefinedDate, setPredefinedDate] = useState(null); // 캘린더에서 선택된 날짜

  useEffect(() => {
    const savedTeam = localStorage.getItem('myTeam');
    if (savedTeam) setMyTeam(JSON.parse(savedTeam));
  }, []);

  const handleSelectTeam = (team) => {
    setMyTeam(team);
    localStorage.setItem('myTeam', JSON.stringify(team));
  };

  // 작성 버튼 클릭 시 날짜 정보를 받아 처리
  const handleCreateClick = (date = null) => {
    setPredefinedDate(date); 
    setEditingDiary(null);
    setCurrentPage('create');
  };

  const handleEdit = (diary) => {
    setEditingDiary(diary);
    setCurrentPage('create');
  };

  const handleBack = () => {
    setCurrentPage('main');
    setEditingDiary(null);
    setPredefinedDate(null); // 메인으로 돌아올 때 날짜 초기화
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <main className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl relative overflow-x-hidden font-sans">
        {!myTeam ? (
          <LandingPage onSelect={handleSelectTeam} />
        ) : currentPage === 'main' ? (
          <MainPage 
            myTeam={myTeam} 
            onCreateClick={handleCreateClick} 
            onEdit={handleEdit} 
          />
        ) : (
          <DiaryForm 
            initialData={editingDiary} 
            predefinedDate={predefinedDate} 
            onBack={handleBack} 
          />
        )}
      </main>
    </div>
  );
}

export default App;