import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import { Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Todo } from 'types'

import TitleText from 'components/atoms/TitleText'
import { useTodoContext } from 'components/providers/TodoContext'

import './TodoItem.css'

export default function TodoItem({
  todo,
  readOnly,
}: {
  todo: Todo
  readOnly?: boolean
}): JSX.Element {
  const { id, title, completed } = todo
  const { deleteTodoItem, updateTodoItem } = useTodoContext()
  const navigate = useNavigate()

  const handleUpdate = useCallback(() => {
    void updateTodoItem({ id, title, completed: !completed })
  }, [updateTodoItem, id, title, completed])
  const handleDelete = useCallback(() => {
    void deleteTodoItem(id)
  }, [deleteTodoItem, id])
  const handleEdit = useCallback(() => {
    navigate(`/edit/${id}`)
  }, [navigate, id])

  return (
    <FormControlLabel
      control={<Checkbox checked={completed} onChange={handleUpdate} />}
      label={
        <span className='Label-container'>
          <Tooltip title={title}>
            <TitleText>{title}</TitleText>
          </Tooltip>
          {readOnly === true ? null : (
            <>
              <IconButton name='edit' aria-label='edit' size='small' onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton name='delete' aria-label='delete' size='small' onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </span>
      }
    />
  )
}
