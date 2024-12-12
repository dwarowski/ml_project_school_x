import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

// Провайдер контекста
export const AppProvider = ({ children }) => {
    const [globalTextValue, setGlobalTextValue] = useState(""); // Исправлено имя переменной
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [startLvlText, setStartLvlText] = useState(null) // начальный уровень текста
    const [activeLvlButtons, setActiveLvlButtons] = useState(Array(6).fill(false));// массив из 6 положений кнопок
    const [adaptiveText, setAdaptiveText] = useState("");
    const [hasActiveButtonLvl, setHasActiveButtonLvl] = useState(false); //выбрана ли кнопка уровня?


    // Глобальная функция переключения активной кнопки
    const toggleButton = (index) => {
        setActiveLvlButtons((prev) => {
            const newActiveButtons = Array(6).fill(false); // создаю новый массив, заполняю его false
            newActiveButtons[index] = true; // устанавливаю true для кнопки с переданным индексом
            return newActiveButtons;
        });
    };

    useEffect(() => { // проверяю, есть ли активная кнопка
        const hasActiveButton = activeLvlButtons.some(button => button === true);
        setHasActiveButtonLvl(hasActiveButton); // обновляем состояние
    }, [activeLvlButtons]); // зависимость от activeLvlButtons

    return (
        <AppContext.Provider value={{ // функции и состояния, к которым смогут обращаться дочерние компоненты
            globalTextValue,
            setGlobalTextValue,
            isButtonPressed,
            setIsButtonPressed,
            activeLvlButtons,
            setActiveLvlButtons,
            toggleButton,
            startLvlText,
            setStartLvlText,
            hasActiveButtonLvl,
            setHasActiveButtonLvl,
            adaptiveText,
            setAdaptiveText
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
