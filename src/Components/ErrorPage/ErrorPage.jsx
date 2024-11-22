import { useRouteError } from "react-router-dom";
import "./ErrorPage.css"
import { Link } from 'react-router-dom'


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error">
      <h1 className="oops">Упс!</h1>
      <p className="fail">Что-то пошло не так</p>
      <Link to="https://t.me/JapnaeseMadeThings" className='text-link contact-us-link'>
        <div className="error-contact-us-button">
          <p className="error-contact-us-text">Связаться с нами</p>
        </div>
      </Link>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
