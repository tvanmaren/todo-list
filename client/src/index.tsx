import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import logo from 'assets/logo.svg';
import express from 'assets/express.svg';
import TodoList from 'components/TodoList/TodoList';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: '/new',
    element: <div>New</div>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <div className="Logo-container">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={express} className="Express-logo" alt="logo" />
        </div>
        <p>
          React Todo List w/ Typescript & Express
        </p>
      </header>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(undefined);
