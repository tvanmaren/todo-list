import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, FormGroup } from '@mui/material';
import { Todo } from 'types';
import useGetTodoList from 'hooks/useGetTodoList';
import TodoItem from 'components/TodoItem/TodoItem';


const fixedBottomRight = {
  position: 'fixed',
  bottom: '2vh',
  right: '2vh'
};

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const getTodoList = useGetTodoList()

  useEffect(() => {
    getTodoList().then((todoList) => {
      setTodoList(todoList);
    });
  }, [getTodoList]);

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <FormGroup>
        {todoList.map(({ id, completed, title }) => <TodoItem key={id} id={id} completed={completed} title={title} />)}
      </FormGroup>
      <Fab className="Add-icon" color="primary" aria-label="add" href="/new" sx={fixedBottomRight}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

