import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChipDelete } from '@mui/joy'
import { Checkbox, FormControlLabel, IconButton, Tooltip } from '@mui/material'
import './TodoItem.css'
import { type Todo } from 'types'
import TitleText from 'components/atoms/TitleText'
import { useTodoContext } from 'components/providers/TodoContext'

const actionIcon = {
  width: '1rem',
  height: '1rem',
  marginLeft: '0.5rem'
}

export default function TodoItem ({ id, completed, title }: Todo): JSX.Element {
  const { deleteTodoItem, updateTodoItem } = useTodoContext()
  const navigate = useNavigate()

  const handleUpdate = useCallback(() => { void updateTodoItem({ id, title, completed: !completed }) }, [updateTodoItem, id, title, completed])
  const handleDelete = useCallback(() => { void deleteTodoItem(id) }, [deleteTodoItem, id])
  const handleEdit = useCallback(() => { navigate(`/edit/${id}`) }, [navigate, id])

  return (
  <FormControlLabel
    control={<Checkbox checked={completed} onChange={handleUpdate} />}
    label={
      <span className="Label-container">
        <Tooltip title={title}>
          <TitleText>{title}</TitleText>
        </Tooltip>
        <IconButton aria-label="edit" size="small" sx={actionIcon} onClick={handleEdit} />
        <ChipDelete variant="soft" color="danger" sx={actionIcon} onDelete={handleDelete} />
      </span>
    }
  />)
}
