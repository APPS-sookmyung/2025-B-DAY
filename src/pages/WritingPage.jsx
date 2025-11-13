import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import doosanLogo from "../assets/logos/doosan.webp";
import lgLogo from "../assets/logos/lg.jpeg";
import kiaLogo from "../assets/logos/kia.jpg";
import samsungLogo from "../assets/logos/samsung.png";
import lotteLogo from "../assets/logos/lotte.png";
import hanwhaLogo from "../assets/logos/hanwha.png";
import ssgLogo from "../assets/logos/ssg.png";
import ncLogo from "../assets/logos/nc.png";
import ktLogo from "../assets/logos/kt.jpeg";
import kiwoomLogo from "../assets/logos/kiwoom.png";

function WritingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const diaryId = location.state?.diaryId;

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [title, setTitle] = useState("");
  const [opponent, setOpponent] = useState("");
  const [result, setResult] = useState("win"); // 기본값: 승
  const [content, setContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(!diaryId); // 새 일기는 편집 모드, 기존 일기는 읽기 모드

  const teams = [
    { name: "두산", logo: doosanLogo },
    { name: "LG", logo: lgLogo },
    { name: "기아", logo: kiaLogo },
    { name: "삼성", logo: samsungLogo },
    { name: "롯데", logo: lotteLogo },
    { name: "한화", logo: hanwhaLogo },
    { name: "SSG", logo: ssgLogo },
    { name: "NC", logo: ncLogo },
    { name: "KT", logo: ktLogo },
    { name: "키움", logo: kiwoomLogo }
  ];

  // 기존 일기 데이터 로드
  useEffect(() => {
    if (diaryId) {
      const storedList = JSON.parse(localStorage.getItem("diaryList")) || [];
      const diary = storedList.find(d => d.id === diaryId);
      if (diary) {
        setDate(diary.id);
        setTitle(diary.title);
        setOpponent(diary.opponent);
        setResult(diary.result);
        setContent(diary.content);
      }
    }
  }, [diaryId]);

  // 승무패 버튼 클릭 시 순환
  const toggleResult = () => {
    if (!isEditMode) return; // 읽기 모드에서는 변경 불가
    if (result === "win") setResult("lose");
    else if (result === "lose") setResult("draw");
    else setResult("win");
  };

  const handleSave = () => {
    if (!title || !opponent || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const storedList = JSON.parse(localStorage.getItem("diaryList")) || [];

    if (diaryId) {
      // 기존 일기 수정
      const updatedList = storedList.map(diary =>
        diary.id === diaryId
          ? { id: diaryId, opponent, result, title, content }
          : diary
      );
      localStorage.setItem("diaryList", JSON.stringify(updatedList));
      alert("일기 수정 완료");
    } else {
      // 새 일기 등록
      const newDiary = {
        id: date,
        opponent,
        result,
        title,
        content,
      };
      const updatedList = [...storedList, newDiary];
      localStorage.setItem("diaryList", JSON.stringify(updatedList));
      alert("일기 등록 완료");
    }

    navigate("/main");
  };

  // 한글 표기
  const resultLabel = result === "win" ? "승" : result === "lose" ? "패" : "무";

  return (
    <div className="p-8 h-screen flex flex-col relative">

      <div className="flex items-center justify-between gap-2 mb-6 mt-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          오늘의 경기는?
        </div>
        <button
            onClick={toggleResult}
            disabled={!isEditMode}
            className={`w-12 h-12 rounded-xl text-center font-bold text-base transition-all duration-300 transform shadow-lg ${
              isEditMode ? "hover:scale-110 cursor-pointer" : "cursor-not-allowed opacity-60"
            } ${
              result === "win"
                ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                : result === "lose"
                ? "bg-gradient-to-br from-red-400 to-red-600 text-white"
                : "bg-gradient-to-br from-gray-400 to-gray-600 text-white"
            }`}
          >
            {resultLabel}
          </button>
      </div>

      {/* 날짜 */}
      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={!isEditMode || diaryId} // 편집 모드가 아니거나 기존 일기면 날짜 변경 불가
          className="w-full rounded-2xl border-2 border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* 상대팀 선택 */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2 font-medium">상대팀을 선택하세요</div>
        <div className="grid grid-cols-5 gap-2">
          {teams.map((team, index) => (
            <button
              key={index}
              type="button"
              disabled={!isEditMode}
              className={`rounded-xl p-2 h-16 transition-all duration-300 transform flex items-center justify-center ${
                isEditMode ? "hover:scale-105" : "cursor-not-allowed"
              } ${
                opponent === team.name
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg ring-2 ring-blue-300"
                  : isEditMode
                  ? "bg-white hover:bg-gray-50 shadow-sm border-2 border-gray-200"
                  : "bg-gray-100 shadow-sm border-2 border-gray-200"
              }`}
              onClick={() => isEditMode && setOpponent(team.name)}
            >
              <img
                src={team.logo}
                alt={team.name}
                className={`h-10 w-10 object-contain ${!isEditMode ? "opacity-50" : ""}`}
              />
            </button>
          ))}
        </div>
        {opponent && (
          <div className="mt-2 text-center text-sm text-blue-600 font-medium">
            선택된 팀: {opponent}
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="w-full rounded-2xl border-2 border-gray-200 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={!isEditMode}
      />

      <textarea
        placeholder="본문을 입력하세요"
        className="w-full flex-grow rounded-2xl border-2 border-gray-200 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!isEditMode}
      />

      <div className="pb-4 flex gap-3">
        {!isEditMode && (
          <button
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsEditMode(true)}
          >
            편집
          </button>
        )}
        {isEditMode && (
          <button
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={handleSave}
          >
            {diaryId ? "수정" : "등록"}
          </button>
        )}
      </div>
    </div>
  );
}

export default WritingPage;
