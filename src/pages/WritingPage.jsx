import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WritingPage() {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [title, setTitle] = useState("");
  const [opponent, setOpponent] = useState("");
  const [result, setResult] = useState("win"); // 기본값: 승
  const [content, setContent] = useState("");

  // 승무패 버튼 클릭 시 순환
  const toggleResult = () => {
    if (result === "win") setResult("lose");
    else if (result === "lose") setResult("draw");
    else setResult("win");
  };

  const handleSave = () => {
    if (!title || !opponent || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const newDiary = {
    id: date, 
    opponent,
    result,
    title,
    content,
    };

  const storedList = JSON.parse(localStorage.getItem("diaryList")) || [];
  const updatedList = [...storedList, newDiary];

  localStorage.setItem("diaryList", JSON.stringify(updatedList));

  alert("일기 등록 완료");

    navigate("/main");
  };

  // 한글 표기
  const resultLabel = result === "win" ? "승" : result === "lose" ? "패" : "무";

  return (
    <div className="p-8 max-w-md h-screen mx-auto shadow-md bg-white relative">

      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="text-2xl font-semibold">오늘의 경기는?</div>
        <button
            onClick={toggleResult}
            className={`w-16 rounded-full p-5 text-center ${
              result === "win"
                ? "bg-green-500 text-white"
                : result === "lose"
                ? "bg-red-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {resultLabel}
          </button>
      </div>
      

      {/* 날짜 + 상대팀 + 승무패 버튼 한 줄 */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          placeholder="상대팀"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="w-full rounded-xl border border-gray-300 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="본문을 입력하세요"
        className="w-full h-40 rounded-xl border border-gray-300 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-40">
        <button
          className="w-full h-12 rounded-xl bg-gray-200 py-2"
          onClick={handleSave}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}

export default WritingPage;
