import "./RightPanel.scss";
import LvlButton from "./lvlButton";
import { useAppContext } from "../AppContext";
import { useState, useEffect } from "react";

import copy from "../../../assets/copy.svg";

export default function RightPanel() {
  const { activeLvlButtons, startLvlText, adaptiveText } = useAppContext();

  const [showAdaptText, setShowAdaptText] = useState(false);
  const [shake, setShake] = useState(false); // состояние анимации

  useEffect(() => {
    const hasActiveButtonLvl = activeLvlButtons.some((button) => button === true);
    if (hasActiveButtonLvl) {
      setShowAdaptText(true);
    }
  }, [activeLvlButtons, adaptiveText]);

  const handleCopyText = () => {
    if (adaptiveText) {
      navigator.clipboard
        .writeText(adaptiveText)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <div className="panel_part">
      <div className="fake_area">
        <div
          className="basic-text"
          style={{
            display: `${showAdaptText ? "none" : ""}`,
            color: `${startLvlText ? "#0F2450" : "#717171;"}`,
          }}
        >
          Выберите уровень
          <br />
          для адаптации
        </div>
        <div className="title" style={{ display: `${showAdaptText ? "" : "none"}` }}>
          АДАПТИРОВАННЫЙ ТЕКСТ
        </div>
        <div className="line" style={{ display: `${showAdaptText ? "" : "none"}` }}></div>
        <div
          className="read-container"
          style={{ height: `${showAdaptText ? "70%" : "33.5%"}` }}
        >
          <div className="read-only">{adaptiveText}</div>
          <button
            className="copy-button"
            onClick={handleCopyText} // Обработчик клика
          >
            <img
              src={copy}
              alt=""
              style={{ display: `${showAdaptText ? "block" : "none"}` }}
            />
          </button>
        </div>
        <div className={`buttons_block ${shake ? "shake" : ""}`}>
          <LvlButton />
        </div>
      </div>
    </div>
  );
}
