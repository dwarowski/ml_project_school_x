import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Провайдер контекста
export const AppProvider = ({ children }) => { 
    const [globalTextValue, setGlobalTextValue] = useState(""); // Исправлено имя переменной
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [activeLvlButtons, setActiveLvlButtons] = useState(Array(6).fill(false));

    // Глобальная функция переключения активной кнопки
    const toggleButton = (index) => { 
        setActiveLvlButtons((prev) => {
            const newActiveButtons = Array(6).fill(false); // создаю новый массив, заполняю его false
            newActiveButtons[index] = true; // устанавливаю true для кнопки с переданным индексом
            return newActiveButtons;
        });
    };

    return (
        <AppContext.Provider value={{ // функции и состояния, к которым смогут обращаться дочерние компоненты
          globalTextValue, 
          setGlobalTextValue,
          isButtonPressed,
          setIsButtonPressed,
          activeLvlButtons,
          toggleButton
        }}>
          {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
