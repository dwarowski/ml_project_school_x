import "./header.scss"
import { Link } from 'react-router-dom'
import logo from "../../../assets/logo.svg";
import acc from "../../../assets/acc.svg";
import history from "../../../assets/history.svg";
import contact from '../../../assets/img/contact.png'



export default function Header(){
    return(

        <div className='header'>
          <img src={logo} alt="" className='icon' />

          <div className='func_block'>
            <img src={acc} alt="" className='icon' />
            <img src={history} alt="" className='icon' />
            
            
            <a className='contacts' href="https://telegram.me/GRIN_L" target="_blank" rel="noopener noreferrer" >Связаться с нами</a>
            <Link to="https://telegram.me/GRIN_L">
            <img src={contact} className="icon contacts-us-icon" alt='contact-us' href="https://telegram.me/GRIN_L"/>
            </Link>
          </div>

      </div>

    )
}