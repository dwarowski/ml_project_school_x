import "./RightPanel.scss";
import LvlButton from "./lvlButton";
import { useAppContext } from "../AppContext";
import { useState, useEffect } from "react";

export default function RightPanel() {
    const { activeLvlButtons, isButtonPressed, setIsButtonPressed} = useAppContext();
    const hasActiveButtonLvl = activeLvlButtons.some(button => button === true);
    const [showAdaptText,setShowAdaptText] = useState(false)
    const [shake, setShake] = useState(false); // состояние анимации
  

    useEffect(() => {
      if (isButtonPressed){
        setShowAdaptText(true)
      }
      if (!hasActiveButtonLvl && isButtonPressed) { // не выбран желаемый уровень, кнопки трясутся
          setShake(true);
          setTimeout(() => {
              setShake(false);
              setIsButtonPressed(false);
          }, 700);
      }
  }, [hasActiveButtonLvl, isButtonPressed]);
  

    return (
        <div className='panel_part'>
            <div className='fake_area'>

                    <div className="basic-text"style={{display: `${showAdaptText? "none": ""}`}}>Выберите уровень<br />для адаптации</div>
                    <div className='title' style={{display: `${showAdaptText? "": "none"}`}}>АДАПТИРОВАННЫЙ ТЕКСТ</div>
                    <div className='line' style={{display: `${showAdaptText? "": "none"}`}}></div>
                    <div className="read-only" style={{height: `${showAdaptText? "70%": "33.5%"}`}}></div>
                    <div className={`buttons_block ${shake ? "shake" : ""}`}>
                        <LvlButton />
                    </div>

            </div>
        </div>
    );
}
