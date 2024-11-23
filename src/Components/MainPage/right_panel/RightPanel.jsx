import "./RightPanel.scss";
import LvlButton from "./lvlButton";
import { useAppContext } from "../AppContext";
import { useState, useEffect } from "react";

export default function RightPanel() {
    const { activeLvlButtons, isButtonPressed, setIsButtonPressed} = useAppContext();
    const hasActiveButtonLvl = activeLvlButtons.some(button => button === true);
    const [shake, setShake] = useState(false); // состояние анимации 

    useEffect(() => {
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
                <div className="read-container">
                    <div className="basic-text">Выберите уровень<br />для адаптации</div>
                    <div className="read-only"></div>
                    <div className={`buttons_block ${shake ? "shake" : ""}`}>
                        <LvlButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
