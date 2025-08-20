import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LandingPage() {
    const navigate = useNavigate();
    const [ selectedTeam, setSelectedTeam ] = useState(null);

    const teams = [
    "두산", "LG", "기아", "삼성", "롯데",
    "한화", "SSG", "NC", "KT", "키움"
    ];

    const handleConfirm = () => {
    if (selectedTeam) {
        localStorage.setItem("team", selectedTeam)
        navigate("/main");
    } else {
        alert("팀을 선택해주세요!");
    }
    };

    return (
        <div className="p-8 max-w-md h-screen mx-auto shadow-md bg-white">
            <div className="flex flex-col mb-8">
                <div className="text-center font-extrabold text-2xl">응원팀 선택하기</div>
                <div className="text-center text-gray-400">나의 팀을 고르세요!</div>
            </div>

            <div className="grid grid-cols-2 gap-5 flex-grow">
                {teams.map((team, index) => (
                <button key={index} className={`rounded-xl p-3 h-25
                    ${selectedTeam === team ? "bg-gray-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setSelectedTeam(team)}
                >
                {team}
                </button>
                ))}
            </div>
            
            <div className="flex justify-center mt-6">
                <button className="mt-6 w-full h-12 rounded-xl bg-gray-200 py-2" onClick={handleConfirm}>
                시작하기
                </button>
            </div>
            
        </div>
      );
}

export default LandingPage;