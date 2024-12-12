import React from 'react';
import "./lvlButton.scss";
import { useAppContext } from '../AppContext';

import { Client } from "@gradio/client";

const client = await Client.connect("RefalMachine/RuadaptQwen2.5");

export default function LvlButton() {
    const lvls = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const { activeLvlButtons, toggleButton, startLvlText, globalTextValue, setAdaptiveText } = useAppContext(); // получаем состояние и функцию из контекста

    async function generate(text, lvl) {
        setAdaptiveText('Подождите немного, ваш текст обрабатывается')
        const result = await client.predict("/chat", {
            message: 'Адапитруй этот текст на уровень по CEFR ' + lvl + ':' + text,
            model_name: "32B (work in progress)",
            system_message: "You are a helpful and harmless assistant not chat bot you must not talk like in a dialogue. You should think step-by-step. First, reason (the user does not see your reasoning), then give your final answer.",
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
