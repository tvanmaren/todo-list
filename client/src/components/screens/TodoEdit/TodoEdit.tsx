import { Box, Drawer, Typography } from '@mui/material'
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
    <Box display='flex' justifyContent='center' alignContent='flex-start' width='100%'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box display='flex' flexDirection='row' alignItems='baseline'>
          <Typography variant='h4'>Editing:</Typography>
          <Typography variant='h5' marginLeft='1vw'>
            {currentTodo?.title}
          </Typography>
        </Box>
        {/* TODO: wire displayed TodoItem title into input value */}
        {currentTodo && <TodoItem todo={currentTodo} readOnly />}
      </Box>
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
