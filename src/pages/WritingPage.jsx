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
  const [result, setResult] = useState("win"); 
  const [content, setContent] = useState("");
  const [isEditMode, setIsEditMode] = useState(!diaryId);

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

  const toggleResult = () => {
    if (!isEditMode) return;
    if (result === "win") setResult("lose");
    else if (result === "lose") setResult("draw");
    else setResult("win");
  };

  // 삭제 처리 함수
  const handleDelete = () => {
    if (window.confirm("정말 이 일기를 삭제하시겠습니까?")) {
      const storedList = JSON.parse(localStorage.getItem("diaryList")) || [];
      const updatedList = storedList.filter(diary => diary.id !== diaryId);
      localStorage.setItem("diaryList", JSON.stringify(updatedList));
      alert("삭제되었습니다.");
      navigate("/main");
    }
  };

  const handleSave = () => {
    if (!title || !opponent || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const storedList = JSON.parse(localStorage.getItem("diaryList")) || [];

    if (diaryId) {
      const updatedList = storedList.map(diary =>
        diary.id === diaryId
          ? { id: diaryId, opponent, result, title, content }
          : diary
      );
      localStorage.setItem("diaryList", JSON.stringify(updatedList));
      alert("수정 완료");
    } else {
      const newDiary = { id: date, opponent, result, title, content };
      const updatedList = [...storedList, newDiary];
      localStorage.setItem("diaryList", JSON.stringify(updatedList));
      alert("등록 완료");
    }
    navigate("/main");
  };

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

      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={!isEditMode || diaryId}
          className="w-full rounded-2xl border-2 border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2 font-medium">상대팀 선택</div>
        <div className="grid grid-cols-5 gap-2">
          {teams.map((team, index) => (
            <button
              key={index}
              type="button"
              disabled={!isEditMode}
              className={`rounded-xl p-2 h-16 transition-all duration-300 flex items-center justify-center ${
                opponent === team.name
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg ring-2 ring-blue-300"
                  : "bg-white border-2 border-gray-200"
              }`}
              onClick={() => isEditMode && setOpponent(team.name)}
            >
              <img src={team.logo} alt={team.name} className="h-10 w-10 object-contain" />
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="w-full rounded-2xl border-2 border-gray-200 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={!isEditMode}
      />

      <textarea
        placeholder="본문을 입력하세요"
        className="w-full flex-grow rounded-2xl border-2 border-gray-200 p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none disabled:bg-gray-100"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!isEditMode}
      />

      {/* 하단 버튼 영역 */}
      <div className="pb-4 flex gap-3">
        {diaryId && (
          <button
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all"
            onClick={handleDelete}
          >
            삭제
          </button>
        )}
        
        {!isEditMode ? (
          <button
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all"
            onClick={() => setIsEditMode(true)}
          >
            편집
          </button>
        ) : (
          <button
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all"
            onClick={handleSave}
          >
            {diaryId ? "수정 완료" : "등록"}
          </button>
        )}
      </div>
    </div>
  );
}

export default WritingPage;