function ResultBadge({ isWin, isLose }) {
  let label;
  let bg;

  if (isWin) {
    label = "승";
    bg = "bg-blue-400";
  } else if (isLose) {
    label = "패";
    bg = "bg-red-400";
  }
  else {
    label = "무";
    bg = bg = "bg-gray-400"
  }

  return (
    <div className={`rounded-full w-10 h-10 text-white flex items-center justify-center ${bg}`}>
      {label}
    </div>
  );
}

export default ResultBadge;
