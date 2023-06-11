import { type FormEvent, useCallback, useRef, useState, useContext, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box, Drawer, Fab, FormGroup } from '@mui/material'
import TodoItem from 'components/TodoItem/TodoItem'
import TodoItemForm from 'components/molecules/TodoItemForm'
import { TodoContext } from 'components/providers/TodoContext'
import { type Todo } from 'types'

const fixedBottomRight = {
  position: 'fixed',
  bottom: '2vh',
  right: '2vh'
}

export default function TodoList (): JSX.Element {
  const { todoList, getTodoList, setTodoList, createTodoItem } = useContext(TodoContext)
  const [currentTodoList, setCurrentTodoList] = useState<Todo[]>(todoList)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddClick = useCallback(() => { setIsDrawerOpen(true); inputRef.current?.focus() }, [inputRef])
  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setIsDrawerOpen(false)
    const newTodo = await createTodoItem({ title: inputRef.current?.value, completed: false })
    setTodoList([...todoList, newTodo])
  }, [])

  useEffect(() => {
    void getTodoList()
  }, [getTodoList])

  useEffect(() => {
    setCurrentTodoList(todoList)
  }, [todoList])

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <FormGroup>
        {currentTodoList.map(({ id, completed, title }) => <TodoItem key={id} id={id} completed={completed} title={title} />)}
      </FormGroup>
      <Drawer anchor="bottom" open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false) }}>
        <TodoItemForm handleSubmit={handleSubmit} inputRef={inputRef} />
      </Drawer>
      <Fab className="Add-icon" color="primary" aria-label="add" onClick={handleAddClick} sx={fixedBottomRight}>
        <AddIcon />
      </Fab>
    </Box>
  )
}
