import { useRouteError } from "react-router-dom";
import "./ErrorPage.css"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="error">
      <h1>Упс!</h1>
      <p>Что-то пошло не так</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
