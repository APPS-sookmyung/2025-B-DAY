import { useNavigate } from "react-router-dom";
import DiaryList from "../components/DiaryList";

function MainPage() {
  const navigate = useNavigate();
  const team = localStorage.getItem("team");
  const diaryList = JSON.parse(localStorage.getItem("diaryList")) || [];
  let rate = 0;
  if (diaryList.length > 0) {
    const winCount = diaryList.filter(diary => diary.result === "win").length;
    rate = Math.round((winCount / diaryList.length) * 100); 
  }

    return (
        <div className="p-8 h-screen flex flex-col relative">
            <div className="mb-8 mt-6">
                <div className="text-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-xl">
                    <div className="text-white text-lg mb-1">우리 팀 <span className="font-bold text-xl">{team}</span>의 승률은</div>
                    <div className="text-white font-extrabold text-5xl mt-2">{rate}%</div>
                </div>
            </div>

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