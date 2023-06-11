import express from 'assets/express.svg'
import logo from 'assets/logo.svg'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { TodoProvider } from 'components/providers/TodoContext'
import TodoEdit from 'components/screens/TodoEdit/TodoEdit'
import TodoList from 'components/screens/TodoList/TodoList'

import './index.css'
import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoList />,
  },
  {
    path: '/edit/:id',
    element: <TodoEdit />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <div className='App'>
      <header className='App-header'>
        <div className='Logo-container'>
          <img src={logo} className='App-logo' alt='logo' />
          <img src={express} className='Express-logo' alt='logo' />
        </div>
        <p>React Todo List w/ Typescript & Express</p>
      </header>
      <TodoProvider>
        <RouterProvider router={router} />
      </TodoProvider>
    </div>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(undefined)
