import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './Admin/Admin';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosConfig = () => {
  axios.defaults.baseURL = 'http://localhost:4001';
  axios.defaults.timeout = 15000;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
};
axiosConfig();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme='light'
        />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/admin",
        element: <Admin />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
