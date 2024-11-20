import React, { useState } from 'react'; 
import "./lvlButton.scss"

export default function LvlButton() {
    const lvls = ["A1", "A2", "B1", "B2", "C1", "C2"];

    const [activeLvl, setActiveLvl] = useState(null)

    const handleClickLvl = (lvl) =>{
        setActiveLvl(lvl)
        console.log(lvl)

    }
    
    return (
        <>
            {lvls.map((lvl, index) => (
                <button 
                key={index}
                className={`lvl-button ${activeLvl === lvl ? 'active' : ''}`}
                onClick={() => handleClickLvl(lvl)}>
                    {lvl}
                </button>
            ))}
        </>
    );
}

