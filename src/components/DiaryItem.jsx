import { useNavigate } from "react-router-dom";
import ResultBadge from "./ResultBadge";

function DiaryItem({ id, title, result }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/write", { state: { diaryId: id } });
  };

  return (
    <div
      className="flex flex-row items-center gap-3 cursor-pointer"
      onClick={handleClick}
    >
      <ResultBadge isWin={result === "win"} isLose={result === "lose"} />
      <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex-1 h-14 flex items-center shadow-sm">
        <div className="ml-2 font-medium text-gray-800">{title}</div>
      </div>
    </div>
  );
}

export default DiaryItem;
