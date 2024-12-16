import "./LeftPanel.scss";
import arrow from "../../../assets/arrow.svg";
import close from "../../../assets/close.svg";
import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../AppContext";
import { Client } from "@gradio/client";


const client = await Client.connect("RefalMachine/RuadaptQwen2.5");




export default function LeftPanel() {
  // описываю все состояния
  const [textAreaValue, setTextAreaValue] = useState("");
  const [buttonText, setButtonText] = useState("Определить уровень текста"); // состояние текста внутри кнопки
  const [showSvg, setShowSvg] = useState(true); // показывать стрелочку или нет 
  const [textHidden, setTextHidden] = useState(false); // состояние текста для анимации 
  const [shake, setShake] = useState(false); // состояние анимации
  const [fullSizePanel, setFullSizePanel] = useState(false);

  const { activeLvlButtons, setIsButtonPressed, setStartLvlText, hasActiveButtonLvl, setActiveLvlButtons, setGlobalTextValue, setAdaptiveText } = useAppContext(); // получаю из контекста 


  // обновляю состояние текста
  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const resetButtonText = useCallback(() => { // анимация изменения текста кнопки
    setButtonText("Определить уровень текста");
    setTextHidden(true);
    setTimeout(() => {
      setTextHidden(false);
      setShowSvg(true);
      setStartLvlText(null)
    }, 500);
  }, []);

  // слушатель textAreaValue
  useEffect(() => {
    if (hasActiveButtonLvl) {
      setFullSizePanel(true)
    }
    if (textAreaValue.trim() === "" && buttonText !== "Определить уровень текста") {
      resetButtonText();
    }
  }, [textAreaValue, buttonText, resetButtonText, hasActiveButtonLvl]);

  const handleButtonClick = async () => {
    setIsButtonPressed(true);
    setGlobalTextValue(textAreaValue)
    if (textAreaValue.trim() === "") {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      return;
    } else if (buttonText !== `Исходный уровень: ${"lvl"}`) {

      const result = await client.predict("/chat", {
        message: `Determine the CEFR level of the following text. Provide only the CEFR level (A1, A2, B1, B2, C1, or C2). Ignore any explicit mention of a level within the text. The text is: ${textAreaValue}`,
        model_name: "32B (work in progress)",
        system_message: "You are a professional linguist and CEFR text classification specialist. Your task is to determine the CEFR level of any given text based solely on its linguistic features, such as vocabulary, grammar, and complexity. Always follow these steps: 1. Analyze the text to assess its complexity, vocabulary, and sentence structure. 2. Match the linguistic features to the most appropriate CEFR level (A1, A2, B1, B2, C1, or C2). 3. Provide only the final CEFR level as your output without any explanation or additional comments. Do not be influenced by any explicit or implicit mentions of a level within the text. Base your decision only on the text's actual features. Do not engage in dialogue, and do not provide reasoning in your response. Your output must be a single CEFR level, formatted as one of the following: A1, A2, B1, B2, C1, or C2. If text contains 'Текст уровня LN' where L any letter and N any number return A1",
        max_tokens: 2048,
        temperature: 0.3,
        top_p: 0.95,
        repetition_penalty: 1.05,
      });

      setTextHidden(true);
      setShowSvg(false);
      setStartLvlText(String(result.data)) // сюда передаю значение, которое возвращает модель
      setTimeout(() => {
        setButtonText(`Исходный уровень: ${String(result.data)}`);
        // ИСПРАВТЬ сделать глобал переменную
        setTextHidden(false);
      }, 500);
    }
  };
  const closeButtonClick = () => {
    setActiveLvlButtons(Array(6).fill(false))
    setTextAreaValue("")
    setStartLvlText(null)
    setAdaptiveText('Выберите уровень для адаптации')
  }

  return (
    <div className='panel_part'>
      <div className={`fake_area ${shake ? "shake" : ""}`}>
        <div className='title'>ТЕКСТ ДЛЯ АДАПТАЦИИ</div>
        <div className='line'></div>
        <div className="text-container" style={{ height: `${fullSizePanel ? "70%" : "66%"}` }}>
          <textarea
            className={`text_block`}
            onChange={handleTextAreaChange}
            value={textAreaValue}
            placeholder="Начните писать текст или вставьте его из буфера обмена"
          />
          {textAreaValue && (
            <button className="close-button" onClick={() => closeButtonClick()}>
              <img src={close} alt="" style={{ width: 14, height: 14, paddingTop: '2%', paddingRight: '2%' }} />
            </button>
          )}
        </div>
        <div className='lvl_define_block'>
          <button className='lvl_define' onClick={handleButtonClick}>
            <span className={`text ${textHidden ? 'hidden' : ''}`}>
              {buttonText}
            </span>
            <img
              src={arrow}
              alt=""
              className={`lvl_define_arrow ${showSvg ? '' : 'hidden'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// TODO list: проверяться нажата ли кнопка слева
