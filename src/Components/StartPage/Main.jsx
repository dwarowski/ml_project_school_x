import logo from './img/Vector.svg'
import contact from './img/contact.png'
import './Main.css';

function App() {
  return (
    <div className="main-container">
      <div className="main-elements-container">
        <div className="upper-container">
          <div className="logo-box">
            <img src={logo} className="logo" alt="logo"/>
          </div>
          <div className="contact-us-button">
            <img src={contact} className="contact-us-icon" alt='contact-us'></img>
            <p className='contact-us-text'>Связаться с нами</p>
          </div>
        </div>
        <div className="header-info-container">
          <p className="main-text">Адаптация текстов</p>
          <p className="info-text">Сервис для адаптации текстов под уровни CEFR. Быстро и легко преобразуйте тексты для нужного уровня сложности</p>
          <div className="start-button">
            <p className="start-button-text">Начать работу</p>
          </div>
        </div>
      </div>   
    </div>
    
  );
}

export default App;
