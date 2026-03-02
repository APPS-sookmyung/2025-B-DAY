import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryList from "../components/DiaryList";

const STADIUM_LOCATIONS = {
  "두산": { lat: 37.5122, lon: 127.0719, name: "잠실 야구장" },
  "LG": { lat: 37.5122, lon: 127.0719, name: "잠실 야구장" },
  "SSG": { lat: 37.4370, lon: 126.6933, name: "인천 SSG 랜더스필드" },
  "키움": { lat: 37.4982, lon: 126.8671, name: "고척 스카이돔" },
  "한화": { lat: 36.3172, lon: 127.4291, name: "대전 한화생명이글스파크" },
  "삼성": { lat: 35.8411, lon: 128.6816, name: "대구 삼성라이온즈파크" }, // '삼성 라이온즈' -> '삼성'으로 수정
  "롯데": { lat: 35.1940, lon: 129.0615, name: "부산 사직 야구장" },
  "기아": { lat: 35.1681, lon: 126.8891, name: "광주 기아챔피언스필드" },
  "KT": { lat: 37.2997, lon: 127.0097, name: "수원 kt위즈파크" },
  "NC": { lat: 35.2225, lon: 128.5826, name: "창원 NC파크" },
};

function MainPage() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  
  // 로컬스토리지 데이터 불러오기
  const team = localStorage.getItem("team") || "팀 미설정";
  const diaryList = JSON.parse(localStorage.getItem("diaryList")) || [];

  // 승률 계산 로직
  let rate = 0;
  if (diaryList.length > 0) {
    const winCount = diaryList.filter(diary => diary.result === "win").length;
    rate = Math.round((winCount / diaryList.length) * 100); 
  }

  // 2. 날씨 데이터 페칭 (Vite 환경 변수 사용)
  useEffect(() => {
    const fetchWeather = async () => {
      const location = STADIUM_LOCATIONS[team];
      // 설정된 팀이 구장 좌표 데이터에 있는 경우에만 실행
      if (!location) return;

      const API_KEY = import.meta.env.VITE_WEATHER_KEY; 
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=kr`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("날씨 정보를 가져오지 못했습니다.");
        
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          stadium: location.name
        });
      } catch (error) {
        console.error("Weather Fetch Error:", error);
      }
    };

    fetchWeather();
  }, [team]);

  return (
    <div className="p-8 h-screen flex flex-col relative bg-gray-50">
      {/* 3. 날씨 정보 위젯 UI */}
      {weather && (
        <div className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm mb-6 border border-gray-100">
          <div>
            <div className="text-xs text-blue-600 font-bold mb-1">CURRENT WEATHER</div>
            <div className="text-gray-800 font-extrabold text-lg">
              {weather.stadium} {weather.temp}°C
            </div>
            <div className="text-gray-500 text-sm italic">{weather.description}</div>
          </div>
          <div className="bg-blue-50 rounded-full p-1">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt="날씨 아이콘" 
              className="w-14 h-14"
            />
          </div>
        </div>
      )}

      {/* 승률 카드 */}
      <div className="mb-8">
        <div className="text-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-xl">
          <div className="text-white text-lg mb-1">우리 팀 <span className="font-bold text-xl">{team}</span>의 승률은</div>
          <div className="text-white font-extrabold text-5xl mt-2">{rate}%</div>
        </div>
      </div>

      {/* 일기 리스트 영역 */}
      <div className="flex-grow overflow-y-auto pb-24">
        {diaryList.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚾</div>
              <div className="text-gray-400 text-lg">아직 작성된 일기가 없어요!</div>
              <div className="text-gray-300 text-sm mt-2">첫 경기 일기를 작성해보세요</div>
            </div>
          </div>
        ) : (
          <DiaryList diaryList={diaryList} />
        )}
      </div>

      {/* 새 일기 작성 버튼 */}
      <div className="absolute bottom-8 left-8 right-8">
        <button
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate("/write")}
        >
          새 일기 작성하기
        </button>
      </div>
    </div>
  );
}

export default MainPage;