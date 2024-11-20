import "./header.scss"

import logo from "../../../assets/logo.svg";
import acc from "../../../assets/acc.svg";
import history from "../../../assets/history.svg";




export default function Header(){
    return(

        <div className='header'>
        <img src={logo} alt="" className='icon' />

        <div className='func_block'>
          <img src={acc} alt="" className='icon' />
          <img src={history} alt="" className='icon'/>

          <div className='contacts'>Связаться с нами</div>
        </div>

      </div>

    )
}