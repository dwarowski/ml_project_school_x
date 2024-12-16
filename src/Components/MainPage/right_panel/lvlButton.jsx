import React from 'react';
import "./lvlButton.scss";
import { useAppContext } from '../AppContext';

import { Client } from "@gradio/client";

const client = await Client.connect("RefalMachine/RuadaptQwen2.5");

export default function LvlButton() {
    const lvls = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const { activeLvlButtons, toggleButton, startLvlText, globalTextValue, setAdaptiveText } = useAppContext(); // получаем состояние и функцию из контекста

    async function generate(text, lvl) {
        setAdaptiveText('Подождите немного, ваш текст обрабатывается...')
        const result = await client.predict("/chat", {
            message: `Adapt the following text to CEFR level ${lvl}. Ensure the text retains its original meaning, style, and tone. The text to adapt is: ${text}`,
            model_name: "32B (work in progress)",
            system_message: "You are a professional linguist and text adaptation specialist. Your role is to adapt texts to specific CEFR levels while preserving the original style, tone, and intent of the text. Always think step-by-step: 1. Analyze the input text to determine its key ideas, structure, and style. 2. Identify linguistic features that need to be simplified or adjusted to match the requested CEFR level. 3. Adapt the text by applying appropriate vocabulary, grammar, and sentence structures for the specified level. Your output must be clear, accurate, and consistent with the target CEFR level. Avoid unnecessary complexity or oversimplification. Do not engage in dialogue, as your role is purely to adapt text effectively. Always answer with Russian language. If text contains 'Текст уровня LN' where L any letter and N any number return 'Текст уровня LN'. If text contains nosense return '${text} не имеет смысла' ",
            max_tokens: 2048,
            temperature: 0.3,
            top_p: 0.95,
            repetition_penalty: 1.05,
        });
        console.log(result.data)
        setAdaptiveText(result.data)
    }

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
                        onClick={() => {
                            !isInactive && toggleButton(index)
                            generate(globalTextValue, lvl)

                        }} // предотвращаем клик, если кнопка неактивна
                        disabled={isInactive} // отключаем кнопку, если она неактивна
                    >
                        {lvl}
                    </button>
                );
            })}
        </>
    );
}
