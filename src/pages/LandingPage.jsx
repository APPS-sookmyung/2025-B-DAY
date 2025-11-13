import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

function LandingPage() {
    const navigate = useNavigate();
    const [ selectedTeam, setSelectedTeam ] = useState(null);

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

    const handleConfirm = () => {
    if (selectedTeam) {
        localStorage.setItem("team", selectedTeam)
        navigate("/main");
    } else {
        alert("팀을 선택해주세요!");
    }
    };

    return (
        <div className="p-8 h-screen flex flex-col">
            <div className="flex flex-col mb-10 mt-8">
                <div className="text-center font-extrabold text-3xl mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    응원팀 선택하기
                </div>
                <div className="text-center text-gray-500 text-sm">나의 팀을 고르세요!</div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-grow">
                {teams.map((team, index) => (
                <button
                    key={index}
                    className={`rounded-2xl p-3 h-24 transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                        selectedTeam === team.name
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg ring-4 ring-blue-300"
                            : "bg-white hover:bg-gray-50 shadow-md"
                    }`}
                    onClick={() => setSelectedTeam(team.name)}
                >
                    <img
                        src={team.logo}
                        alt={team.name}
                        className="h-16 w-16 object-contain"
                    />
                </button>
                ))}
            </div>

            <div className="flex justify-center mt-8 mb-8">
                <button
                    className={`w-full h-14 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                        selectedTeam
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleConfirm}
                >
                    시작하기
                </button>
            </div>

        </div>
      );
}

export default LandingPage;