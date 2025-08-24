import { useEffect, useState } from "react";
import DiaryItem from "./DiaryItem";

function DiaryList() {

    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("diaryList");
        if (stored) {
            setDiaries(JSON.parse(stored));
        }
    }, []);

    return (
        <div className="space-y-4">
            {diaries.map((entry) => (
            <DiaryItem 
            key={entry.id}
            title={entry.title}
            result={entry.result}
        />
        ))}
        </div>
    );
}

export default DiaryList;