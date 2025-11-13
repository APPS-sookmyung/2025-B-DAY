function ResultBadge({ isWin, isLose }) {
  let label;
  let bg;

  if (isWin) {
    label = "승";
    bg = "bg-gradient-to-br from-green-400 to-green-600 shadow-md";
  } else if (isLose) {
    label = "패";
    bg = "bg-gradient-to-br from-red-400 to-red-600 shadow-md";
  }
  else {
    label = "무";
    bg = "bg-gradient-to-br from-gray-400 to-gray-600 shadow-md";
  }

  return (
    <div className={`rounded-full w-12 h-12 text-white font-bold flex items-center justify-center ${bg}`}>
      {label}
    </div>
  );
}

export default ResultBadge;
