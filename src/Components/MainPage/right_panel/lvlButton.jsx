import React from 'react'; 
import "./lvlButton.scss";
import { useAppContext } from '../AppContext';

export default function LvlButton() {
    const lvls = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const { activeLvlButtons, toggleButton } = useAppContext(); // получаем состояние и функцию из контекста

    if (!activeLvlButtons) {
        return null; 
    }

    return (
        <>
            {lvls.map((lvl, index) => (
                <button 
                    key={index}
                    className={`lvl-button ${activeLvlButtons[index] ? 'active' : ''}`}
                    onClick={() => toggleButton(index)}
                >
                    {lvl}
                </button>
            ))}
        </>
    );
}
