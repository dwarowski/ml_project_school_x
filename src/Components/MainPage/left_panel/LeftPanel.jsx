import "./LeftPanel.scss";
import arrow from "../../../assets/arrow.svg";
import close from "../../../assets/close.svg";
import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../AppContext";

export default function LeftPanel() {
  // описываю все состояния
  const [textAreaValue, setTextAreaValue] = useState("");
  const [buttonText, setButtonText] = useState("Определить уровень текста"); // состояние текста внутри кнопки
  const [showSvg, setShowSvg] = useState(true); // показывать стрелочку или нет 
  const [textHidden, setTextHidden] = useState(false); // состояние текста для анимации 
  const [shake, setShake] = useState(false); // состояние анимации
  const [fullSizePanel, setFullSizePanel] = useState(false);

  const { activeLvlButtons, setIsButtonPressed } = useAppContext(); // получаю из контекста 
  const hasActiveButtonLvl = activeLvlButtons.some(button => button === true);

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
    }, 500);
  }, []);

  // слушатель textAreaValue
  useEffect(() => {
    if (textAreaValue.trim() === "" && buttonText !== "Определить уровень текста") {
      resetButtonText();
    }
  }, [textAreaValue, buttonText, resetButtonText]);

  const handleButtonClick = () => {
    setFullSizePanel(true);
    setIsButtonPressed(true);

    if (textAreaValue.trim() === "") {
      setShake(true);
      setTimeout(() => setShake(false), 700);
      return;
    }
    if (hasActiveButtonLvl === false) { // не выбран уровень
      setIsButtonPressed(true);
      // возможна ошибка, быть аккуратнее
    } else if (buttonText !== `Исходный уровень: ${"lvl"}` && hasActiveButtonLvl) {
      // логика отправки текста на back
      // анимация изменения текста в кнопке
      setTextHidden(true);
      setShowSvg(false);
      setTimeout(() => {
        setButtonText(`Исходный уровень: ${"lvl"}`);
        setTextHidden(false);
      }, 500);
    }
  };

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
            <button className="close-button" onClick={() => setTextAreaValue("")}>
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
