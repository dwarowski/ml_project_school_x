import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from "./Components/ErrorPage/ErrorPage.jsx";
import Start from './Components/StartPage/Start.jsx';
import MainPage from './Components/MainPage/MainPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/mainpage",
    element: <MainPage/>,
    errorElement: <ErrorPage/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
