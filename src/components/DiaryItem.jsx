import ResultBadge from "./ResultBadge";

function DiaryItem({ id, title, result }) {

  const handleClick = () => {
    
  };

  return (
    <div
      className="flex flex-row items-center justify-between cursor-pointer"
      onClick={handleClick}
    >
      <ResultBadge isWin={result === "win"} isLose={result === "lose"} />
      <div className="rounded-xl bg-gray-200 p-2 w-80 h-10">
        <div className="ml-3">{title}</div>
      </div>
    </div>
  );
}

export default DiaryItem;
