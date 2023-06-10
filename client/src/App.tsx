import { useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

export function App() {
  const getTodoList = useCallback(async () => {
    const response = await fetch(`todos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    const body = await response.json();
    console.log(body);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {JSON.stringify(getTodoList())}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
