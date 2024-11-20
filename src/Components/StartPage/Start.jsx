import logo from "../../assets/img/icon.svg"
import contact from '../../assets/img/contact.png'
import { Link } from 'react-router-dom'
import './Start.css';



function App() {
  return (
    <div className="main-container">
      <div className="main-elements-container">
        <div className="upper-container">
          <div className="logo-box">
            <img src={logo} className="logo" alt="logo"/>
          </div>
          <Link to="https://t.me/JapnaeseMadeThings" className='text-link'>
            <div className="button contact-us-button">
              <img src={contact} className="contact-us-icon" alt='contact-us'></img>
              <p className='text contact-us-text'>Связаться с нами</p>
            </div>
          </Link>
        </div>
        <div className="header-info-container">
          <p className="text main-text">Адаптация текстов</p>
          <p className="text info-text">Сервис для адаптации текстов под уровни CEFR. Быстро и легко преобразуйте тексты для нужного уровня сложности</p>
          <Link to='mainpage'  className='text-link'>
            <div className="button start-button">
              <p className="text start-button-text">Начать работу</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
