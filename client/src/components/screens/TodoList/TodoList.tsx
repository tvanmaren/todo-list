import AddIcon from '@mui/icons-material/Add'
import { Box, Drawer, Fab, FormGroup } from '@mui/material'
import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { type Todo } from 'types'

import TodoItemForm from 'components/molecules/TodoItemForm'
import TodoItem from 'components/organisms/TodoItem/TodoItem'
import { useTodoContext } from 'components/providers/TodoContext'

const fixedBottomRight = {
  position: 'fixed',
  bottom: '2vh',
  right: '2vh',
}

export default function TodoList(): JSX.Element {
  const { todoList, getTodoList, setTodoList, createTodoItem } = useTodoContext()
  const [currentTodoList, setCurrentTodoList] = useState<Todo[]>(todoList)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      setIsDrawerOpen(false)
      const newTodo = await createTodoItem({ title: inputRef.current?.value, completed: false })
      setTodoList([...todoList, newTodo])
    },
    [createTodoItem, setTodoList, todoList],
  )

  useEffect(() => {
    void getTodoList()
  }, [getTodoList])

  useEffect(() => {
    setCurrentTodoList(todoList)
  }, [todoList])

  return (
    <Box display='flex' justifyContent='center' width='100%'>
      <FormGroup>
        {currentTodoList.map(({ id, completed, title }) => (
          <TodoItem key={id} todo={{ id, completed, title }} />
        ))}
      </FormGroup>
      <Drawer
        anchor='bottom'
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
        }}
      >
        <TodoItemForm handleSubmit={handleSubmit} ref={inputRef} />
      </Drawer>
      <Fab
        className='Add-icon'
        color='primary'
        aria-label='add'
        onClick={() => {
          setIsDrawerOpen(true)
        }}
        sx={fixedBottomRight}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
