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
        <div className="p-8 max-w-md h-screen mx-auto shadow-md bg-white relative">
            <div className="font-semibold text-2xl text-center">우리 팀 {team}의 승률은</div>
            <div className="font-semibold text-2xl text-center mb-8">{rate}%</div>

            {diaryList.length === 0 ? (
              <div className="flex items-center justify-center h-[70%] text-gray-400 text-lg text-center">
              아직 작성된 일기가 없어요!
              </div>
              ) : (
              <DiaryList diaryList={diaryList} />
              )}

            <div className="absolute bottom-10 left-35 w-40">
                <button className="w-full h-12 rounded-xl bg-gray-200 py-2" onClick={() => navigate("/write")}>
                새 일기 작성하기
                </button>
            </div>
        </div>
      );
}

export default MainPage;