import React from 'react'; 
import "./lvlButton.scss";
import { useAppContext } from '../AppContext';

export default function LvlButton() {
    const lvls = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const { activeLvlButtons, toggleButton, startLvlText } = useAppContext(); // получаем состояние и функцию из контекста

    if (!activeLvlButtons) {
        return null; 
    }

    return (
        <>
            {lvls.map((lvl, index) => {
                const isInactive = startLvlText === null || lvl === startLvlText; //является ли кнопка неактивной
                return (
                    <button 
                        key={index}
                        className={`lvl-button ${activeLvlButtons[index] ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                        onClick={() => !isInactive && toggleButton(index)} // предотвращаем клик, если кнопка неактивна
                        disabled={isInactive} // отключаем кнопку, если она неактивна
                    >
                        {lvl}
                    </button>
                );
            })}
        </>
    );
}
