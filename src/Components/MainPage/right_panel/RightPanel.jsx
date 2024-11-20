import "./RightPanel.scss"

import LvlButton from "./lvlButton"

export default function RightPanel(){

 
    return(

        <div className='panel_part'>
          <div className='fake_area'>
            <div className="read-container">
              <div className="basic-text">Выберите уровень<br />для адаптации</div>
              <div className="read-only"></div>
              <div className="buttons_block"><LvlButton/></div>

            </div>

          </div>
        </div>

    )
}