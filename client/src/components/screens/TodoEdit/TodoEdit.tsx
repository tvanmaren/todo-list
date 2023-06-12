import { Box, Drawer } from '@mui/material'
import { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type Todo } from 'types'

import TodoItemForm from 'components/molecules/TodoItemForm'
import TodoItem from 'components/organisms/TodoItem/TodoItem'
import { useTodoContext } from 'components/providers/TodoContext'

export default function TodoEdit(): JSX.Element {
  const { getTodoItem, updateTodoItem } = useTodoContext()
  const { id } = useParams()
  const navigate = useNavigate()
  const currentTodo = getTodoItem(id)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      if (
        inputRef.current === null ||
        currentTodo === undefined ||
        inputRef.current?.value === currentTodo?.title
      )
        return
      const updatedTodo: Todo = { ...currentTodo, title: inputRef.current.value }
      await updateTodoItem(updatedTodo)
      setIsDrawerOpen(false)
      navigate('/')
    },
    [currentTodo, navigate, updateTodoItem],
  )

  useEffect(() => {
    setIsDrawerOpen(true)
  }, [])

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignContent='flex-start'
      width='100%'
    >
      {currentTodo === undefined ? null : <TodoItem todo={currentTodo} readOnly />}
      <Drawer
        anchor='bottom'
        sx={{ height: '80vh' }}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
          navigate('/')
        }}
      >
        <TodoItemForm
          handleSubmit={handleSubmit}
          ref={inputRef}
          defaultValue={currentTodo?.title}
        />
      </Drawer>
    </Box>
  )
}
