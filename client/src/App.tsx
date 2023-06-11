import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, Fab, FormControlLabel, FormGroup } from '@mui/material';
import logo from './logo.svg';
import './App.css';
import { Todo } from 'types';
import { useGetTodoList } from 'hooks/useGetTodoList';

const fixedBottomRight = {
  position: 'fixed',
  bottom: '2vh',
  right: '2vh'
};

export function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const getTodoList = useGetTodoList()

  useEffect(() => {
    getTodoList().then((todoList) => {
      setTodoList(todoList);
    });
  }, [getTodoList]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Todo List w/ Typescript & Express
        </p>
      </header>
      <div>
        <FormGroup>
          {todoList.map((todo) => (
            <FormControlLabel
              key={todo.id}
              control={
                <Checkbox checked={todo.completed}
                  onChange={() => console.log('clicked')}
                />
              }
              label={todo.title}
            />
          ))}
        </FormGroup>
        <Fab className="Add-icon" color="primary" aria-label="add" href="/new" sx={fixedBottomRight}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}
